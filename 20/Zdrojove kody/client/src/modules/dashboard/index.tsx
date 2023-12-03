import styles from "./index.module.css";
import OurGoal from "./OurGoal/OurGoal";
import ActiveDonations from "./ActiveDonations/ActiveDonations";

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <OurGoal />
      <ActiveDonations />
    </div>
  );
};

export default Dashboard;
