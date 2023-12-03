import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import FileDonation from "./components/FileDonation/FileDonation";

import styles from "./Donate.module.css";

const Donate = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.header}>Nový Příspěvek</h1>
        <img src="./assets/Progress.svg" role="none" alt="" />
        <FileDonation />
      </div>
      <Button
        background={"#C4001F"}
        _hover={{ background: "#A3001A" }}
        color={"white"}
        className={styles.confirmButton}
        onClick={() => navigate("/")}
      >
        Potvrdit
      </Button>
    </div>
  );
};

export default Donate;
