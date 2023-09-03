import { createSlice } from "@reduxjs/toolkit";
import initialState from "../store/initialState";

const users = createSlice({
  name: "users",
  initialState: initialState.users,
  reducers: {
    fetchOrdersHistoryAction(state, {type, payload}){
      return{
        ...state,
        orders: [...payload],
      }
    },
    fetchProductsInCartAction(state, { type, payload }) {
      return {
        ...state,
        cart: [...payload],
      };
    },
    signInAction(state, { type, payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    signOutAction(state, { type, payload }) {
      return {
        ...payload,
      };
    },
  },
});

const { fetchOrdersHistoryAction, fetchProductsInCartAction, signInAction, signOutAction } = users.actions;
export { fetchOrdersHistoryAction, fetchProductsInCartAction, signInAction, signOutAction };
export default users.reducer;
