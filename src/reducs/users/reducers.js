import { createSlice } from "@reduxjs/toolkit";
import initialState from "../store/initialState";

const users = createSlice({
  name: "users",
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

const { signInAction } = users.actions;
export { signInAction };
export default users.reducer;
