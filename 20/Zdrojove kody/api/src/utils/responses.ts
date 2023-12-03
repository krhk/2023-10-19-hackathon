import {Response} from "express";

type Res = Response<any, Record<string, any>>;
export const unable_to_find_id = (res: Res) =>
  res.status(404).send({
    msg: "Unable to find specified id.",
  });
