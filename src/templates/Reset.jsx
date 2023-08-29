import React, { useCallback, useState } from "react";
import { PrimaryButton, TextInput } from "../components/UIKit";
import { resetPassword } from "../reducs/users/operations";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

const Reset = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");


  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );


  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">パスワードのリセット</h2>
      <div className="module-spacer--medium"></div>
      <TextInput
        fullWidth={true}
        label={"メールアドレス"}
        required={true}
        value={email}
        type={"email"}
        onChange={inputEmail}
      />
      <div className="module-spacer--medium"></div>
      <div className="center">
        <PrimaryButton
          label={"Reset Password"}
          onClick={() => {
            dispatch(resetPassword(email, navigate));
            console.log("click");
          }}
        />
        <div className="module-spacer--medium"></div>
        <p onClick={() => navigate('/signin')}>ログインはこちら</p>
      </div>
    </div>
  );
};
export default Reset;
