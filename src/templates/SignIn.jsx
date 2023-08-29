import React, { useCallback, useState } from "react";
import { PrimaryButton, TextInput } from "../components/UIKit";
import { signIn } from "../reducs/users/operations";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );

  const inputPassword = useCallback(
    (event) => {
      setPassword(event.target.value);
    },
    [setPassword]
  );

  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">サインイン</h2>
      <div className="module-spacer--medium"></div>
      <TextInput
        fullWidth={true}
        label={"メールアドレス"}
        required={true}
        value={email}
        type={"email"}
        onChange={inputEmail}
      />
      <TextInput
        fullWidth={true}
        label={"パスワード"}
        required={true}
        value={password}
        type={"password"}
        onChange={inputPassword}
      />
      <div className="module-spacer--medium"></div>
      <div className="center">
        <PrimaryButton
          label={"Sign in"}
          onClick={() => {
            dispatch(signIn(email, password, navigate));
          }}
        />
        <div className="module-spacer--medium"></div>
        <p onClick={() => navigate('/signup')}>アカウントをお持ちでない方はこちら</p>
        <p onClick={() => navigate('/signin/reset')}>パスワードを忘れた方はこちら</p>
      </div>
    </div>
  );
};
export default SignIn;
