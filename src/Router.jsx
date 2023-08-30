import React from "react";
import { Routes, Route } from "react-router";
import { SignUp, SignIn, ProductEdit, ProductList } from "./templates";
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
            <ProductList />
          </Auth>
        }
      />
      <Route
        exact
        path="/product/edit"
        element={
          <Auth>
            <ProductEdit />
          </Auth>
        }
      >
        <Route
          exact
          path="/product/edit/:id"
          element={
            <Auth>
              <ProductEdit />
            </Auth>
          }
        />
      </Route>
    </Routes>
  );
};
export default Router;
