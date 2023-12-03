import express from "express";
import {z} from "zod";
import {validate_req_schema, z_string_required_non_empty} from "../utils/validation";
import {get_db_conn} from "../utils/db";

const router = express.Router();

const login_req_schema = z.object({
  body: z
    .object({
      email: z_string_required_non_empty("email").email({
        message: "email field must be formatted as an email address.",
      }),
      password: z_string_required_non_empty("password"),
    })
    .required(),
});
router.post("/auth/login", validate_req_schema(login_req_schema), async (req, res) => {
  const {email, password} = req.body;

  const db = await get_db_conn();
  const user = await db.get("SELECT * FROM users WHERE email = $email AND password = $password", {
    $email: email,
    $password: password,
  });
  db.close();

  if (!user) {
    return res.status(400).send({
      msg: "user not found",
    });
  }

  delete user["password"];
  return res.status(200).send(user);
});

router.post("/auth/register", validate_req_schema(login_req_schema), async (req, res) => {
  const {
    email,
    password,
    is_company,
    individual_title_before_name,
    individual_name,
    individual_surname,
    individual_title_after_name,
    company_name,
    company_ico,
  } = req.body;

  if (is_company && (company_name == null || company_ico == null)) {
    return res.status(400).send({
      msg: "company name and ico must be filled in",
    });
  }
  if (!is_company && (individual_name == null || individual_surname == null)) {
    return res.status(400).send({
      msg: "all individual info must be filled in",
    });
  }

  const db = await get_db_conn();
  const user_exists = await db.get("SELECT 1 FROM users WHERE email = $email", {
    $email: email,
  });
  if (user_exists) {
    return res.status(409).send({
      msg: "user email already exists",
    });
  }

  let success = false;
  if (is_company) {
    const answ = await db.run(
      "insert into users (email, password, is_company, company_name, company_ico) values ($email, $password, $is_company, $company_name, $company_ico)",
      {
        $email: email,
        $password: password,
        $is_company: is_company,
        $company_name: company_name,
        $company_ico: company_ico,
      }
    );
    success = answ.lastID != null;
  } else {
    const answ = await db.run(
      "insert into users (email, password, is_company, individual_title_before_name, individual_name, individual_surname, individual_title_after_name) values ($email, $password, $is_company, $individual_title_before_name, $individual_name, $individual_surname, $individual_title_after_name)",
      {
        $email: email,
        $password: password,
        $is_company: is_company,
        $individual_title_before_name: individual_title_before_name ?? "",
        $individual_name: individual_name,
        $individual_surname: individual_surname,
        $individual_title_after_name: individual_title_after_name ?? "",
      }
    );
    success = answ.lastID != null;
  }
  db.close();

  if (success) {
    return res.status(201).send({});
  } else {
    return res.status(500).send({msg: "server error, unable to register a user."});
  }
});

export {router as AuthRouter};
