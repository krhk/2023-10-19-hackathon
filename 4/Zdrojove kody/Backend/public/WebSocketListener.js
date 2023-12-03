import WebSocket, { WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 15156 });
import crypto from "crypto";

import * as G from "../global.js";
import parse from "wellknown";
import {Config, DBCon, Mail} from "../global.js";

function SendMessage(ws, message, checkAlive = false)
{
    if (checkAlive)
        if (ws.readyState === WebSocket.CLOSED || ws.readyState === WebSocket.CLOSING)
            return false;

    ws.send(message);

    return true;
}

export function SetUp()
{
    wss.on("connection", function connection(ws, req)
    {
        ws.on("error", console.error);

        ws.on("message", function message(data)
        {
            if (data.toString().startsWith("Stavy"))
            {
                if (data.toString() === "Stavy/GetRoads")
                {
                    let shouldIgnore = false;
                    G.DBCon.query("SELECT OBJECTID, stav_sil, ST_AsWKT(geometry) as geo FROM geo WHERE 1").stream().on("data", (row) =>
                    {
                        if (shouldIgnore)
                            return;
                        const result = {
                            "databaseid": row.OBJECTID,
                            "stav": row.stav_sil,
                            "geo": parse(row.geo),
                        };
                        if (!SendMessage(ws, JSON.stringify(result), true))
                        {
                            ws.terminate();
                            shouldIgnore = true;
                        }
                    });
                }
                else if (data.toString() === "Stavy/GetRoadCount")
                {
                    G.DBCon.query("SHOW TABLE STATUS LIKE 'geo'", function(err, results, fields)
                    {
                        SendMessage(ws, JSON.stringify("{ 'count': " + results[0].Rows + " }"), true);
                    });
                }
                else if (data.toString().startsWith("Stavy/RoadInfo:"))
                {
                    let data_split = data.toString().split("Stavy/RoadInfo:");
                    if (data_split.length === 2 && data_split[1] != null && typeof(data_split[1] === "number"))
                    {
                        G.DBCon.query("SELECT stav_sil, stav_rok, ozn_sil, ozn_usek, delka_usek, ozn_trida, ozn_kat, typ_povrch, nazev_vusc, dp_id, SHAPE_Length FROM geo WHERE OBJECTID = ?", [ data_split[1] ]).stream().on("data", (row) =>
                        {
                            SendMessage(ws, JSON.stringify(row), true);
                        });
                    }
                }
                else if (data.toString().startsWith("Stavy/ZpetnaVazba:"))
                {
                    let data_split = data.toString().split("Stavy/ZpetnaVazba:");
                    if (data_split.length === 2 && data_split[1] != null && typeof(data_split[1] === "number"))
                    {
                        DBCon.query("SELECT stav_rok, ozn_sil, ozn_usek FROM geo WHERE OBJECTID = ?", [ data_split[1] ], async function(err, results, fields)
                        {
                            if (!err)
                            {
                                if (results[0] == undefined)
                                {
                                    SendMessage(ws, "usek_neexistuje", true);
                                    return;
                                }

                                let stav_rok = results[0].stav_rok;
                                let ozn_sil = results[0].ozn_sil;
                                let ozn_usek = results[0].ozn_usek;

                                let msg =
                                    "Anonymní uživatel zaslal požadavek na kontrolu silnice " + ozn_sil + " úsek " + ozn_usek + "\nPoslední změna stavu v databázi: " + stav_rok;

                                let message = {
                                    from: '"CheckMyRoute" <zpetnavazba@checkmyroute.cz>',
                                    to: Config[0].zpetnaVazbaEmail,
                                    subject: "Zpětná vazba na stav silnice",
                                    text: msg,
                                    html: msg
                                };

                                /*let info = */await Mail.sendMail(message);
                            }
                        });
                    }
                }
            }
            else if (data.toString().startsWith("Uzivatele"))
            {
                if (data.toString().startsWith("Uzivatele/LogIn:"))
                {
                    let data_split = data.toString().split("Uzivatele/LogIn:")[1].split(":");
                    console.log(data_split);
                    if (data_split.length === 2 && data_split[1] != null)
                    {
                        G.DBCon.query("SELECT id, name, pwd FROM uzivatele WHERE email = ?", [ data_split[0] ]).stream().on("data", (row) =>
                        {
                            const hash = crypto.pbkdf2Sync(data_split[1], row.name, 10000, 512, "sha512").toString("hex");

                            if (hash === row.pwd)
                                SendMessage(ws, "ok", true);
                            else
                                SendMessage(ws, "wrong_pwd_or_username", true);
                        });
                    }
                }
                else if (data.toString().startsWith("Uzivatele/Register:"))
                {
                    let data_split = data.toString().split("Uzivatele/Register:")[1].split(":");
                    if (data_split.length === 3 && data_split[1] != null)
                    {
                        let email = data_split[0];
                        let heslo = data_split[1];
                        let jmeno = data_split[2];
                        if (!email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
                        {
                            SendMessage(ws, "spatny_email", true);
                            return;
                        }
                        else if (!jmeno.match(/^[abcdefghijklmnopqrstuvxyzABCDEFGHIJKLMNOUQRSTUVWXYZáčďéěíňóřšťúůýžÁČĎÉĚÍŇÓŘŠŤÚÝŽ ]+$/))
                        {
                            {
                                SendMessage(ws, "spatne_jmeno", true);
                                return;
                            }
                        }

                        heslo = crypto.pbkdf2Sync(heslo, jmeno, 10000, 512, "sha512").toString("hex");

                        G.DBCon.query("SELECT COUNT(id) as pocet FROM uzivatele WHERE email = ?", [ email ]).stream().on("data", (row) =>
                        {
                            if (row.pocet > 0)
                            {
                                SendMessage(ws, "zaregistrovany_email", true);
                                return;
                            }

                            G.DBCon.query("INSERT INTO uzivatele (email, pwd, name) VALUES (?, ?, ?)", [ email, heslo, jmeno ]);

                            SendMessage(ws, "ok", true);
                        });
                    }
                }
            }
            else if (data.toString().startsWith("Komentare"))
            {
                if (data.toString().startsWith("Komentare/Get:"))
                {
                    let data_split = data.toString().split("Komentare/Get:");
                    if (data_split.length === 2 && data_split[1] != null && typeof(data_split[1] === "number"))
                    {
                        let shouldIgnore = false;
                        let sent;
                        G.DBCon.query("SELECT text FROM komentare WHERE id_useku = ?", [ data_split[1] ]).stream().on("data", (row) =>
                        {
                            sent = true;
                            if (shouldIgnore)
                                return;

                            if (!SendMessage(ws, JSON.stringify(row), true))
                            {
                                ws.terminate();
                                shouldIgnore = true;
                            }
                        }).on("end", function()
                        {
                            if (!sent)
                            {
                                SendMessage(ws, "neplatny_usek", true);
                                return;
                            }
                        });;
                    }
                }
                else if (data.toString().startsWith("Komentare/Post:"))
                {
                    let data_split = data.toString().split("Komentare/Post:")[1].split(":");
                    if (data_split.length === 2 && data_split[1] != null)
                    {
                        let usek = Number(data_split[0]);
                        let text = data_split[1];

                        let sent = false;
                        G.DBCon.query("SELECT OBJECTID as pocet FROM geo WHERE OBJECTID = ?", [ usek ]).stream().on("data", (row) =>
                        {
                            sent = true;
                            if (!row || row.pocet == undefined || Number(row.pocet) < 0)
                            {
                                SendMessage(ws, "neplatny_usek", true);
                                return;
                            }

                            G.DBCon.query("INSERT INTO komentare (text, id_useku) VALUES (?, ?)", [ text, usek ]);

                            SendMessage(ws, "ok", true);
                        }).on("end", function()
                        {
                            if (!sent)
                            {
                                SendMessage(ws, "neplatny_usek", true);
                                return;
                            }
                        });
                    }
                }
            }
        });
    });
}