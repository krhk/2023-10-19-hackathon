import styles from "./ActiveDonations.module.css";
import DonationCard from "./DonationCard";
import { donation } from "./types";

const ActiveDonations = () => {
  const mockedDonationData: donation[] = [
    {
      name: "Nadační fond psí duše",
      raised: 15845,
      raisedToday: 2020,
    },
    {
      name: "Charita pro kočky",
      raised: 5000,
      raisedToday: 1000,
    },
    {
      name: "Dětský domov",
      raised: 25000,
      raisedToday: 5000,
    },
    {
      name: "Domov pro seniory",
      raised: 10000,
      raisedToday: 1500,
    },
    {
      name: "Nadační fond pro zvířata",
      raised: 7500,
      raisedToday: 800,
    },
    {
      name: "Nadační fond pro nemocné děti",
      raised: 30000,
      raisedToday: 2000,
    },
  ];

  const donationCards = [];
  for (let i = 0; i < mockedDonationData.length; i++) {
    donationCards.push(<DonationCard data={mockedDonationData[i]} />);
  }

  return (
    <div className={styles.overFlow}>
      <h2 className={styles.header}>Aktivní sbírky:</h2>
      <div className={styles.flexCards}>{donationCards}</div>
    </div>
  );
};

export default ActiveDonations;
