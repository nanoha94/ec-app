import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import * as History from "history";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import createStore from "./reducs/store/store";
import { MuiThemeProvider } from "@material-ui/core";
import {theme} from "./assets/theme";

export const history = History.createBrowserHistory();
export const store = createStore(history);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter history={history}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
