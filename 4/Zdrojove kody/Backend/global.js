let cfg = JSON.parse(JSON.stringify([{
    "zpetnaVazbaEmail": "admin@krypt0n.eu",
}]));


import * as mysql from "mysql2";
import * as nodemailer from "nodemailer";

var connection = mysql.createConnection({
    host: "netkonia.space",
    user: "testuziv",
    password: "qEy5@ohH#Qo&tk9~nqX&",
    database : "silnice"
});



let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'jayme.paucek@ethereal.email',
        pass: '155u2hpjFSqnDZuk9s'
    }
});

transporter.verify(async function (error, success)
{
    if (error)
        console.error(error.message);
});


export const DBCon = connection;
export const Mail = transporter;
export const Config = cfg;