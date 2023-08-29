import { createSelector } from "reselect";

const usersSelector = (state) => state.users;

export const getIsSignIn = createSelector([usersSelector], (state) => state.isSignIn);
export const getUserId = createSelector([usersSelector], (state) => state.uid);
export const getUsername = createSelector([usersSelector], (state) => state.username);
