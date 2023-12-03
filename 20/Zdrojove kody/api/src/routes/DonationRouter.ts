import express from "express";
import {get_db_conn} from "../utils/db";

const router = express.Router();

router.get("/donations", async (req, res) => {
  const {user_id, amount, kategories} = req.body;

  const db = await get_db_conn();
  const answ = await db.all("select * from donations");
  db.close();

  return res.status(200).send(answ);
});

router.post("/donate", async (req, res) => {
  const {user_id, kategories, money_sent} = req.body;

  const db = await get_db_conn();
  const answ = await db.run(
    "insert into donations (donator_id, kategories, money_sent, sent_at) values ($donator_id, $kategories, $money_sent, DATETIME('now'))",
    {
      $donator_id: user_id,
      $kategories: kategories,
      $money_sent: money_sent,
    }
  );
  db.close();

  return res.status(200).send({});
});

export {router as DonationRouter};
