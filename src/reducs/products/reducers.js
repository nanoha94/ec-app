import { createSlice } from "@reduxjs/toolkit";
import initialState from "../store/initialState";

const products = createSlice({
  name: "products",
  initialState: initialState.products,
  reducers: {
    fetchProductsAction(state, { type, payload }) {
      return {
        ...state,
        list: [...payload],
      };
    },
    deleteProductsAction(state, { type, payload }) {
      return {
        ...state,
        list: [...payload],
      };
    },
  },
});

const { fetchProductsAction, deleteProductsAction } = products.actions;
export { fetchProductsAction, deleteProductsAction };
export default products.reducer;
