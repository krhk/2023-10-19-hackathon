import { useState } from "react";
import { Button, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import TextField from "./TextField";
import { RegisterProps } from "./types";
import { useNavigate } from "react-router-dom";

import styles from "./LoginForm.module.css";
import { set_user } from "../../../utils";

const RegisterForm = () => {
  const [formData, setFormData] = useState<RegisterProps>({
    email: "",
    password: "",
    passwordCheck: "",
    individualTitle: "",
    individualFirstName: "",
    individualSurname: "",
    individualTitleAfterName: "",
    companyName: "",
    companyIco: "",
  });
  const [radioValue, setRadioValue] = useState<string>("1");

  const handleSubmit = async () => {
    if (!formData) return;

    let reg_res;
    if (radioValue === "1") {
      reg_res = await fetch("/api/v1/public/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          individual_title_before_name: formData.individualTitle,
          individual_name: formData.individualFirstName,
          individual_surname: formData.individualSurname,
          individual_title_after_name: formData.individualTitleAfterName,
          email: formData.email,
          password: formData.password,
          is_company: false,
        }),
      });
    } else {
      reg_res = await fetch("/api/v1/public/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company_name: formData.companyName,
          company_ico: formData.companyIco,
          email: formData.email,
          password: formData.password,
          is_company: true,
        }),
      });
    }
    if (reg_res.status !== 201) {
      console.log(reg_res);
      alert("Uživatel již existuje (nebo došlo k jiné chybě lol)");
      return;
    }

    const login_res = await fetch("/api/v1/public/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });
    if (login_res.ok) {
      set_user(await login_res.json());
      navigate("/donate");
    } else {
      alert("Login failed.");
    }
  };

  const updateField = (fieldName: keyof RegisterProps, value: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Registrace</h1>
      <div className={styles.content}>
        <div className={styles.radioItems}>
          <RadioGroup onChange={setRadioValue} value={radioValue}>
            <Stack direction="row" justify="center" gap={120}>
              <Radio value="1">Jednotlivec</Radio>
              <Radio value="2">Firma</Radio>
            </Stack>
          </RadioGroup>
        </div>
        <form>
          {radioValue === "1" ? (
            <>
              <div className={styles.horizontalFormItem}>
                <TextField
                  placeholder="Titul"
                  value={formData.individualTitle}
                  setValue={(value) => updateField("individualTitle", value)}
                />
                <TextField
                  placeholder="Jméno"
                  value={formData.individualFirstName}
                  setValue={(value) => updateField("individualFirstName", value)}
                />
              </div>
              <div className={styles.horizontalFormItem}>
                <TextField
                  placeholder="Příjmení"
                  value={formData.individualSurname}
                  setValue={(value) => updateField("individualSurname", value)}
                />
                <TextField
                  placeholder="Titul"
                  value={formData.individualTitleAfterName}
                  setValue={(value) => updateField("individualTitleAfterName", value)}
                />
              </div>
            </>
          ) : (
            <>
              <div className={styles.horizontalFormItem}>
                <TextField
                  placeholder="Název firmy"
                  value={formData.companyName}
                  setValue={(value) => updateField("companyName", value)}
                />
                <TextField
                  placeholder="IČO firmy"
                  value={formData.companyIco}
                  setValue={(value) => updateField("companyIco", value)}
                />
              </div>
            </>
          )}
          <TextField placeholder="Email" value={formData.email} setValue={(value) => updateField("email", value)} />
          <TextField
            placeholder="Heslo"
            type="password"
            value={formData.password}
            setValue={(value) => updateField("password", value)}
          />
          <TextField
            placeholder="Heslo znovu"
            type="password"
            value={formData.passwordCheck}
            setValue={(value) => updateField("passwordCheck", value)}
          />
          <p style={{ fontSize: "12px", padding: "10px", textAlign: "center" }}>
            Již máte účet?{" "}
            <span className={styles.fakeLink} onClick={() => navigate("/login")}>
              Přihlašte se.
            </span>
          </p>
          <div className={styles.formFooter}>
            <Button onClick={() => navigate("/")} variant="outline">
              Zpět
            </Button>
            <Button className={styles.actionButton} background="#0A2F83" color="white" onClick={handleSubmit}>
              Registrovat
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
