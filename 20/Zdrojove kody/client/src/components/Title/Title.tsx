import { ReactNode } from "react";
import { Heading } from "@chakra-ui/react";

interface Props {
  children: ReactNode;
}

const Title = (props: Props) => {
  return <Heading size="2xl">{props.children}</Heading>;
};

export default Title;
