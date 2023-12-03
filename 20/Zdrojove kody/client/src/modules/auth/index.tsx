import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import styles from "./index.module.css";

interface Props {
  method: "login" | "register";
}

const Auth = (props: Props) => {
  return (
    <div className={styles.wrapper}>
      {props.method === "login" ? <LoginForm /> : <RegisterForm />}
    </div>
  );
};

export default Auth;
