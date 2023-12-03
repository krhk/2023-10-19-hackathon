import { useState } from "react";
import { Button } from "@chakra-ui/react";
import TextField from "./TextField";
import { LoginProps } from "./types";
import { useNavigate } from "react-router-dom";

import styles from "./LoginForm.module.css";
import { set_user } from "../../../utils";

const LoginForm = () => {
  const [formData, setFormData] = useState<LoginProps>({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    if (!formData) return;

    const res = await fetch("/api/v1/public/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });

    if (res.ok) {
      set_user(await res.json());
      navigate("/");
    } else {
      alert("Login failed.");
    }
  };

  const updateField = (fieldName: keyof LoginProps, value: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Login</h1>
      <div className={styles.content}>
        <form>
          <TextField placeholder="Email" value={formData.email} setValue={(value) => updateField("email", value)} />
          <TextField
            placeholder="Heslo"
            type="password"
            value={formData.password}
            setValue={(value) => updateField("password", value)}
          />
          <p style={{ fontSize: "12px", padding: "10px", textAlign: "center" }}>
            Nemáte účet?{" "}
            <span className={styles.fakeLink} onClick={() => navigate("/register")}>
              Zaregistrujte se.
            </span>
          </p>
          <div className={styles.formFooter}>
            <Button onClick={() => navigate("/")} variant="outline">
              Zpět
            </Button>
            <Button className={styles.actionButton} background="#0A2F83" color="white" onClick={handleSubmit}>
              Přihlásit se
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
