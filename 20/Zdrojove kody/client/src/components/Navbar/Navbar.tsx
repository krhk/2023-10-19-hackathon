import { useNavigate } from "react-router-dom";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import styles from "./Navbar.module.css";
import { is_user_logged_in, set_user } from "../../utils";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.navbar}>
      <div className={styles.logoContainer} onClick={() => navigate("/")}>
        <img src="./assets/BiDonateHeart.svg" role="none" alt="" />
        hk-donates
      </div>
      <div style={{ display: "flex", gap: "15px" }}>
        <Menu>
          <MenuButton
            as={Button}
            background={"#C4001F"}
            _active={{ background: "#A3001A" }}
            _hover={{ background: "#A3001A" }}
            color={"white"}
            className={styles.donateButton}
            rightIcon={<img src="./assets/BsHeartFill.svg" role="none" alt="" />}
            onClick={() => {
              if (is_user_logged_in()) {
                navigate("/donate");
              }
            }}
          >
            Přispět
          </MenuButton>
          {!is_user_logged_in() ? (
            <MenuList>
              <MenuItem _hover={{ background: "#C4001F", color: "#fff" }} onClick={() => navigate("/login")}>
                Login
              </MenuItem>
              <MenuItem _hover={{ background: "#C4001F", color: "#fff" }} onClick={() => navigate("/register")}>
                Register
              </MenuItem>
            </MenuList>
          ) : (
            <></>
          )}
        </Menu>
        {is_user_logged_in() ? (
          <Button
            onClick={() => {
              set_user(null as any);
              document.location = "/";
            }}
          >
            Odhlásit se
          </Button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Navbar;
