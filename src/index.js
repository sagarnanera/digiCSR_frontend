import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
// import { SelectedOptionContextProvider } from "./components/chooseUserComponent";

// Material-UI theme

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <ChakraProvider>
          <CSSReset />
          <App />
        </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
