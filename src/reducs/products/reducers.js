import { createSlice } from "@reduxjs/toolkit";
import initialState from "../store/initialState";

const products = createSlice({
  name: "products",
  initialState: initialState.products,
  reducers: {
    
  },
});

export default products.reducer;
