import { useState } from "react";
import { ChangeEvent, Dispatch, ReactNode, SetStateAction } from "react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

import styles from "./LoginForm.module.css";

interface Props {
  placeholder: string;
  type?: string;
  value: string;
  setValue: (value: string) => void;
}

const TextField = (props: Props) => {
  const isInvalid = props.value === "";
  const [active, setActive] = useState<boolean>(false);

  return (
    <FormControl
      className={styles.TextFieldContainer}
      isInvalid={isInvalid && active}
      isRequired
    >
      <Input
        placeholder={props.placeholder}
        type={props.type ? props.type : "text"}
        value={props.value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          props.setValue(e.target.value);
          setActive(true);
        }}
      />
    </FormControl>
  );
};

export default TextField;
