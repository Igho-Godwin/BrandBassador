import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { ApolloProvider } from "@apollo/client";
import { I18nextProvider } from "react-i18next";

import i18next from "./translation";
import client from "./apollo-client";

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
