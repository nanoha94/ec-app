import React from "react";
import { Routes, Route } from "react-router";
import { SignUp, SignIn, ProductEdit, ProductList, ProductDetail, CartList, OrderConfirm, OrderHistory } from "./templates";
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
      <Route
        exact
        path="/product/:id"
        element={
          <Auth>
            <ProductDetail />
          </Auth>
        }
      ></Route>
      <Route
        exact
        path="/cart"
        element={
          <Auth>
            <CartList />
          </Auth>
        }
      ></Route>
      <Route
        exact
        path="/order/confirm"
        element={
          <Auth>
            <OrderConfirm />
          </Auth>
        }
      ></Route>
      <Route
        exact
        path="/order/history"
        element={
          <Auth>
            <OrderHistory />
          </Auth>
        }
      ></Route>
    </Routes>
  );
};
export default Router;
