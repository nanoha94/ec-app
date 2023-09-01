import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { listenAuthState } from "./reducs/users/operations";

const Auth = ({children}) => {
  const dispatch = useDispatch();  
  const navigate = useNavigate();
  const usersSelector = useSelector((state) => state.users);
  const isSignedIn = usersSelector.isSignIn;

  // 認証
  useEffect(() => {
    if (!isSignedIn) {
      dispatch(listenAuthState(navigate));
    }
  }, [dispatch, isSignedIn, navigate]);

  return isSignedIn ? children : <></>;
};
export default Auth;
