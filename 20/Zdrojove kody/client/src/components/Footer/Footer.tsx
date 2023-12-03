import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer>
      <div className={styles.footerContent}>
        <div className={styles.textContainer}>
          <h2 className={styles.boldText}>Ve spolupráci</h2>
          <div className={styles.imageContainer}>
            <img
              src="http://localhost:3000/assets/datakhklogo.svg"
              role="none"
              alt=""
            />
            <img
              src="http://localhost:3000/assets/khlogo.svg"
              role="none"
              alt=""
            />
          </div>
        </div>
        <div className={styles.contactInfo}>
          <h2 className={styles.boldText}>Kontakt</h2>
          <p>Some address</p>
          <p>+420 999 999 999</p>
          <p>example@example.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
