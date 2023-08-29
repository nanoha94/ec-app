import { configureStore } from "@reduxjs/toolkit";
import { connectRouter, routerMiddleware } from "connected-react-router";
import reducer  from "../users/reducers";

export default function createStore(history) {
  return configureStore({
    reducer: { router: connectRouter(history), users: reducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware(history))
  });
}
