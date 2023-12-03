import {Request, Response, NextFunction} from "express";
import {AnyZodObject, z} from "zod";

// Request validation helpers
export const validate_req_schema =
  (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      return res.status(400).json(error);
    }
  };

export const z_string_required_non_empty = (field_name: string) =>
  z
    .string({
      required_error: `${field_name} field is required.`,
    })
    .nonempty(`${field_name} field cannot be empty.`);

// Auth helpers
// import bcrypt from "bcrypt";
// import {RecruiterDbModel} from "../models/RecruiterModel";
// export async function insert_new_recruiter_into_mongo(
//   email: string,
//   password: string,
//   first_name: string,
//   last_name: string
// ) {
//   let password_hash = await bcrypt.hash(password, 10);
//   let new_recruiter = new RecruiterDbModel({
//     email,
//     password: password_hash,
//     first_name,
//     last_name,
//   });
//
//   await new_recruiter.save();
//
//   return new_recruiter;
// }
// export async function validate_password(plain_text: string, hash: string) {
//   return await bcrypt.compare(plain_text, hash);
// }
//
// import jwt from "jsonwebtoken";
// import {IS_PRODUCTION, JWT_TOKEN_SECRET} from "..";
// import JWTUserInfo from "../models/JWTUserInfo";
//
// export function generate_access_token(user_info: JWTUserInfo) {
//   return jwt.sign(user_info, JWT_TOKEN_SECRET, {expiresIn: "7d", issuer: "PwC Slovakia"});
// }
//
// export function authenticate_token(req: Request, res: Response, next: NextFunction) {
//   const auth_header = req.headers["authorization"];
//   const token = auth_header && auth_header.split(" ")[1];
//
//   if (token == null) return res.sendStatus(401);
//
//   jwt.verify(token, JWT_TOKEN_SECRET, (err: any, user: any) => {
//     if (err) return res.sendStatus(403);
//
//     // TODO: Validate that the object is in fact correct as per TS definitions (with zod)
//     req.user = user as JWTUserInfo;
//
//     next();
//   });
// }
