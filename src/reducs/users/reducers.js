import { createSlice } from "@reduxjs/toolkit";
import initialState from "../store/initialState";

const user = createSlice({
  name: "user",
  initialState: initialState.users,
  reducers: {
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

const { signInAction } = user.actions;
export { signInAction };
export default user.reducer;
