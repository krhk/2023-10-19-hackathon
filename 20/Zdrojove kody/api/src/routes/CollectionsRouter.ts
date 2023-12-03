import express from "express";
import {get_db_conn} from "../utils/db";

const router = express.Router();

router.get("/kategorie", async (req, res) => {
  const db = await get_db_conn();
  const types = await db.all("select * from collection_type");
  db.close();
  return res.status(200).send(types);
});

router.get("/collections", async (req, res) => {
  const collection_type = (req.query as any).type!;

  let command = "select * from collections";
  if (collection_type) {
    command += ` where kategorie = ${collection_type}`;
  }

  const db = await get_db_conn();
  const collections = await db.all(command);
  db.close();
  return res.status(200).send(collections);
});

export {router as CollectionsRouter};
