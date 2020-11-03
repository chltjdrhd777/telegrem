import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createGlobalStyle } from "styled-components";
import { Provider } from "react-redux";
import { createStore } from "redux/store";

const store = createStore();

const GlobalCSS = createGlobalStyle`
    *{
    margin:0;
    padding:0;
    font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    text-decoration:none;
    font-size:30px;
  }

   body{
    background-color: #29416b;

    & .AVATAR {
    width: 65px;
    height: 65px;
    margin-right: 30px;
  }
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalCSS />
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
