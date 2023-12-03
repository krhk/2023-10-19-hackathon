import { ReactNode } from "react";

import styles from "./Layout.module.css";
import { Navbar } from "../Navbar";
import Footer from "../Footer/Footer";

interface Props {
  children: ReactNode;
}
const Layout = (props: Props) => {
  return (
    <div>
      <Navbar />
      <div className={styles.wrapper}>{props.children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
