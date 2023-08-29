import React from "react";
import { Routes, Route, useNavigate } from "react-router";
import { Home, SignUp, SignIn } from "./templates";
import Reset from "./templates/Reset";
import Auth from "./Auth";

const Router = () => {
  return (
    <Routes>
      <Route exact path="/signup" element={<SignUp />} />
      <Route exact path="/signin" element={<SignIn />} />
      <Route exact path="/signin/reset" element={<Reset />} />
      <Route
        exact
        path="/"
        element={
          <Auth>
            <Home />
          </Auth>
        }
      />
    </Routes>
  );
};
export default Router;
