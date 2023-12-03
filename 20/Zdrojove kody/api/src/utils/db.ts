const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db.sqlite");
import {open} from "sqlite";
import fs from "fs";

export const get_db_conn = async () =>
  await open({
    filename: "./db.sqlite",
    driver: sqlite3.Database,
  });

export async function db_init() {
  const db = await get_db_conn();
  db.on("error", (err) => console.log(err));

  await db.exec("PRAGMA foreign_keys = ON;");

  await db.exec(`drop table if exists donations;`);
  await db.exec(`drop table if exists users;`);
  await db.exec(`drop table if exists collections;`);
  await db.exec(`drop table if exists collection_type;`);

  await db.exec(`
        CREATE TABLE users (
           id INTEGER PRIMARY KEY,
           email TEXT NOT NULL,
           password TEXT NOT NULL,
           is_company BOOLEAN NOT NULL,
           individual_title_before_name TEXT,
           individual_name TEXT,
           individual_surname TEXT,
           individual_title_after_name TEXT,
           company_name TEXT,
           company_ico TEXT
        );`);
  await db.exec(`
        insert into users (email, password, is_company, company_name, company_ico) 
        values ('firma@email.cz', 'heslo', true, 'Legit firma', '12134')
        `);
  await db.exec(`
        insert into users (email, password, is_company, individual_title_before_name, individual_name, individual_surname, individual_title_after_name) 
        values ('individual@email.cz', 'heslo', false, 'Ing.', 'František', 'Zelený', '')
        `);

  await db.exec(`
        CREATE TABLE collection_type (
            id INTEGER PRIMARY KEY,
            linker_name TEXT NOT NULL UNIQUE,
            name TEXT NOT NULL UNIQUE
        );`);
  await db.exec(`insert into collection_type (name, linker_name) values ('Charita', 'charita');`);
  await db.exec(`insert into collection_type (name, linker_name) values ('Sociální zařízení', 'socialni_zarizeni');`);
  await db.exec(`insert into collection_type (name, linker_name) values ('Příroda', 'priroda');`);
  await db.exec(`insert into collection_type (name, linker_name) values ('Zvířata', 'zvirata');`);
  await db.exec(`insert into collection_type (name, linker_name) values ('Kultura', 'kultura');`);
  await db.exec(`insert into collection_type (name, linker_name) values ('Životní prostředí', 'zivotni_prostredi');`);

  await db.exec(`
        CREATE TABLE collections (
            id INTEGER PRIMARY KEY,
            nazev TEXT,
            ico TEXT,
            pravni_forma TEXT,
            misto_konani TEXT,
            zahajeni TEXT,
            ukonceni TEXT,
            ucel TEXT,
            cislo_bankovniho_uctu TEXT,
            nazev_vusc TEXT,
            kod_vusc TEXT,
            nazev_okresu TEXT,
            kod_okresu TEXT,
            nazev_orp TEXT,
            kod_orp TEXT,
            nazev_obce TEXT,
            kod_obce TEXT,
            nazev_ulice TEXT,
            cislo_domovni TEXT,
            typ_cisla_domovniho TEXT,
            cislo_orientacni TEXT,
            psc TEXT,
            www TEXT,
            wkt TEXT,
            x REAL,
            y REAL,
            dp_id TEXT,
            kategorie INTEGER,
            FOREIGN KEY (kategorie) REFERENCES collection_type (id)
        );`);
  const collections = JSON.parse(fs.readFileSync("./connections_base.json", "utf8"));
  for (const collection of collections.features) {
    let command =
      "insert into collections (nazev, ico, pravni_forma, misto_konani, zahajeni, ukonceni, ucel, cislo_bankovniho_uctu, nazev_vusc, kod_vusc, nazev_okresu, kod_okresu, nazev_orp, kod_orp, nazev_obce, kod_obce, nazev_ulice, cislo_domovni, typ_cisla_domovniho, cislo_orientacni, psc, www, wkt, x, y, dp_id, kategorie) values (";

    const prp = collection.properties;
    command += `'${prp.nazev}', '${prp.ico}', '${prp.pravni_forma}', '${prp.místo_konani}', '${prp.zahajeni}', '${prp.ukonceni}', '${prp.ucel}', '${prp.cislo_bankovniho_uctu}', '${prp.nazev_vusc}', '${prp.kod_vusc}', '${prp.nazev_okresu}', '${prp.kod_okresu}', '${prp.nazev_orp}', '${prp.kod_orp}', '${prp.nazev_obce}', '${prp.kod_obce}', '${prp.nazev_ulice}', '${prp.cislo_domovni}', '${prp.typ_cisla_domovniho}', '${prp.cislo_orientacni}', '${prp.psc}', '${prp.www}', '${prp.wkt}', '${prp.x}', '${prp.y}', '${prp.dp_id}', (select id from collection_type where linker_name like '${prp.kategorie}')`;
    command += ")";
    await db.exec(command);
  }

  await db.exec(`
    CREATE TABLE donations (
        id INTEGER PRIMARY KEY,
        donator_id INTEGER,
        kategories TEXT,
        money_sent REAL,
        sent_at DATETIME NOT NULL,
        FOREIGN KEY (donator_id) REFERENCES users(id)
    );`);
  await db.exec(
    `insert into donations (donator_id, kategories, money_sent, sent_at) values (1, '3,4,5', 50000, DATETIME('2023-10-10 00:00:00'))`
  );
  await db.exec(
    `insert into donations (donator_id, kategories, money_sent, sent_at) values (1, '3,4,5', 750000, DATETIME('2023-11-10 00:00:00'))`
  );
}
