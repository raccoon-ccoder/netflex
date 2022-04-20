import React from "react";
import ReactDOM from "react-dom/client";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import reset from "styled-reset";
import App from "./App";
import { theme } from "./theme";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";

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
      :focus{
        outline: none;
      }
  }
  body {
    color: ${(props) => props.theme.white.lighter};
    background-color: ${(props) => props.theme.black.darker};
    line-height: 1.2;
    font-weight: 300;
    font-family: 'Source Sans Pro', sans-serif;
    overflow-x: hidden;
  }
`;

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>
);
