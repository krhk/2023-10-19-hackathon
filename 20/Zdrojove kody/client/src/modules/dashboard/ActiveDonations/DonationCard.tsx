import styles from "./ActiveDonations.module.css";
import { donation } from "./types";

interface Props {
  data: donation;
}

const DonationCard = (props: Props) => {
  return (
    <div className={styles.card}>
      <p className={styles.cardName}>{props.data.name}</p>
      <img src="./assets/horizontalLine.svg" role="none" alt="" />
      <div className={styles.bottomContainer}>
        <p className={styles.cardGhost}>Vybráno</p>
        <p className={styles.raisedText}>{props.data.raised} Kč</p>
        <div className={styles.raisedTodayContainer}>
          <img src="./assets/StatArrow.svg" role="none" alt="" />
          <p className={styles.raisedTodayText}>{props.data.raisedToday}</p>
        </div>
      </div>
    </div>
  );
};

export default DonationCard;
