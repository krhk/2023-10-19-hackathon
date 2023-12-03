import { useEffect, useState } from "react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import DonationType from "../DonationType/DonationType";
import CategorySelect from "../CategorySelect/CategorySelect";
import { category } from "../../types";

import styles from "./FileDonation.module.css";

const FillDonation = () => {
  const [donationAmount, setDonationAmount] = useState<number>(0);
  const [donationType, setDonationType] = useState<string>("1");
  const [categories, setCategories] = useState<category[]>([]);

  const donations = [];

  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch("/api/v1/public/kategorie");
      setCategories(await res.json());
    };

    getCategories();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.numberInputContainer}>
        <p>Výše příspěvku</p>
        <NumberInput
          min={0}
          value={isNaN(donationAmount) ? 0 : donationAmount}
          onChange={(string, number) => setDonationAmount(number)}
        >
          <NumberInputField background={"white"} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </div>
      <DonationType
        donationType={donationType}
        setDonationType={setDonationType}
      />
      <CategorySelect categories={categories} />
    </div>
  );
};

export default FillDonation;
