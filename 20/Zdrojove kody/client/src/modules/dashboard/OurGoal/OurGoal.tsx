import { Button } from "@chakra-ui/react";
import styles from "./OurGoal.module.css";
import { is_user_logged_in } from "../../../utils";
import { useNavigate } from "react-router-dom";

const OurGoal = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.headerContainer}>
      <h1 className={styles.heading}>Náš cíl</h1>
      <div className={styles.headerWrapper}>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam dui sem, fermentum vitae, sagittis id,
          malesuada in, quam. Nulla pulvinar eleifend sem. Vivamus porttitor turpis ac leo. Lorem ipsum dolor sit amet,
          consectetuer adipiscing elit. Duis condimentum augue id magna semper rutrum. In dapibus augue non sapien.
          Integer vulputate sem a nibh rutrum consequat. Proin mattis lacinia justo. Fusce aliquam vestibulum ipsum.
          Mauris dictum facilisis augue.
        </p>
        <div className={styles.headerButtonWrapper}>
          <Button
            background={"#C4001F"}
            _hover={{ background: "#A3001A" }}
            color={"white"}
            className={styles.button}
            onClick={() => {
              if (is_user_logged_in()) {
                navigate("/donate");
              } else {
                navigate("/register");
              }
            }}
          >
            Podpořte některé ze sbírek
            <img src="./assets/BiBookHeart.svg" role="none" alt="" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OurGoal;
