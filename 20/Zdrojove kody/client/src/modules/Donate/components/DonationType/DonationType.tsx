import { Dispatch, SetStateAction } from "react";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";

import styles from "./DonationType.module.css";

interface Props {
  setDonationType: Dispatch<SetStateAction<string>>;
  donationType: string;
}

const DonationType = (props: Props) => {
  return (
    <div className={styles.donationTypeContainer}>
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>Typ příspěkvu</h1>
      </div>
      <img
        className={styles.line}
        src="./assets/horizontalLineGray.svg"
        role="none"
        alt=""
      />
      <RadioGroup
        onChange={props.setDonationType}
        value={props.donationType}
        className={styles.radioGroup}
      >
        <Stack direction="row" className={styles.radioGroup}>
          <Radio value="1">Jednorázově</Radio>
          <Radio value="2">Měsíčně</Radio>
        </Stack>
      </RadioGroup>
    </div>
  );
};

export default DonationType;
