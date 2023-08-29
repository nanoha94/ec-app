import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getIsSignIn } from "./reducs/users/selectors";
import { listenAuthState } from "./reducs/users/operations";

const Auth = ({children}) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const navigate = useNavigate();
  const isSignedIn = getIsSignIn(selector);

  // 認証
  useEffect(() => {
    if (!isSignedIn) {
      dispatch(listenAuthState(navigate));
    }
  }, [dispatch, isSignedIn, navigate]);

  return isSignedIn ? children : <></>;
};
export default Auth;
