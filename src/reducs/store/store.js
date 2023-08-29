import { configureStore } from "@reduxjs/toolkit";
import { connectRouter, routerMiddleware } from "connected-react-router";
import usersReducer from "../users/reducers";
import productsReducer from "../products/reducers";

export default function createStore(history) {
  return configureStore({
    reducer: { router: connectRouter(history), users: usersReducer, products: productsReducer},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware(history))
  });
}
