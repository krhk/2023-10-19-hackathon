import { StrictMode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import RouteHandler from "./RouteHandler";
import theme from "./theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <RouteHandler />
    </ChakraProvider>
  </StrictMode>
);
