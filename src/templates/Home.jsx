import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIsSignIn, getUserId, getUsername } from "../reducs/users/selectors";
import { signOut } from "../reducs/users/operations";
import { useNavigate } from "react-router";

const Home = () => {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const navigate = useNavigate();
    const uid = getUserId(selector);
    const isSignedIn = getIsSignIn(selector);
    const username = getUsername(selector);

    return(
        <div>
            <div>
            <h2>Home</h2>
            <p>{uid}</p>
            <p>{username}</p>
            <p>{isSignedIn ? 'ログインしました' : '失敗しました'}</p>
            <button onClick={() => dispatch(signOut(navigate))}>SIGN OUT</button>
            </div>
        </div>
    )
}

export default Home;