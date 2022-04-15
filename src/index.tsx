import React from "react";
import ReactDOM from "react-dom/client";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import reset from "styled-reset";
import App from "./App";
import { theme } from "./theme";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const GlobalStyle = createGlobalStyle`
  ${reset}
  a {
      text-decoration: none;
      color: inherit;
    }
  * {
      box-sizing: border-box;
    }
  input {
      border: none;
  }
  body {
    color:black;
    line-height: 1.2;
    font-weight: 300;
    font-family: 'Source Sans Pro', sans-serif;
  }
`;

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>
);
