import { Divider, List } from "@material-ui/core";
import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { CartListItem } from "../components/products";
import { PrimaryButton, TextDetail } from "../components/UIKit";
import { useNavigate } from "react-router";
import { orderProduct } from "../reducs/products/operations";

const DetailBox = styled.div`
  margin: 0 auto;
  width: 512px;

  @media (min-width: 600px) {
    width: 320px;
  }
`;

const OrderBox = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  box-shadow: 0 4px 2px 2px rgba(0, 0, 0, 0.2);
  height: 256px;
  margin: 24px auto 16px auto;
  padding: 16px;
  width: 288px;
`;

const OrderConfirm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usersSelector = useSelector((state) => state.users);
  const productsInCart = usersSelector.cart;

  const subtotal = useMemo(() => {
    return productsInCart.reduce((sum, product) => (sum += product.price), 0);
  }, [productsInCart]);

  const shippingFee = subtotal >= 10000 ? 0 : 210;
  const tax = subtotal * 0.1;
  const total = subtotal + shippingFee + tax;

  const order = useCallback(() => {
    dispatch(orderProduct(productsInCart, total, navigate));
  }, [productsInCart, total]);

  return (
    <section className="c-section-wrapin">
      <h2 className="u-text__headline">注文の確認</h2>
      <div className="p-grid__row">
        <DetailBox>
          <List>
            {productsInCart.length > 0 &&
              productsInCart.map((product) => (
                <CartListItem key={product.cartId} product={product} />
              ))}
          </List>
        </DetailBox>
        <OrderBox>
          <TextDetail
            label={"商品合計"}
            value={"¥" + subtotal.toLocaleString()}
          />
          <TextDetail label={"消費税"} value={"¥" + tax.toLocaleString()} />
          <TextDetail
            label={"送料"}
            value={"¥" + shippingFee.toLocaleString()}
          />
          <Divider />
          <TextDetail
            label={"合計（税込み）"}
            value={"¥" + total.toLocaleString()}
          />
          <PrimaryButton label={"注文する"} onClick={order} />
        </OrderBox>
      </div>
    </section>
  );
};

export default OrderConfirm;
