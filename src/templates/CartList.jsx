import { List } from "@material-ui/core";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartListItem } from "../components/products";
import { GrayButton, PrimaryButton } from "../components/UIKit";
import { useNavigate } from "react-router";

const CartList = () => {
  const navigate = useNavigate();
  const usersSelector = useSelector((state) => state.users);
  const ProductsInCart = usersSelector.cart;

  const goToOrder = useCallback(() => {
    navigate("/order/confirtm");
  }, []);

  const backToHome = useCallback(() => {
    navigate("/");
  }, []);

  return (
    <section className="c-section-wrapin">
      <h2 className="u-text__headline">ショッピングカート</h2>
      <List>
        {ProductsInCart.length > 0 &&
          ProductsInCart.map((product) => (
            <CartListItem key={product.cartId} product={product} />
          ))}
      </List>
      <div className="module-spacer--medium" />
      <div className="p-grid__column">
        <PrimaryButton label={"レジへ進む"} onClick={goToOrder} />
        <div className="module-spacer--extra-extra-small" />
        <GrayButton label={"ショッピングを続ける"} onClick={backToHome} />
      </div>
    </section>
  );
};

export default CartList;
