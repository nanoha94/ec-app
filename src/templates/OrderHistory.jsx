import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { fetchOrdersHistory } from "../reducs/users/operations";
import OrderHistoryItem from "../components/products/OrderHistoryItem";
import { List } from "@material-ui/core";

const OrderList = styled(List)`
  background-color: #f5f5f5;
  margin: 0 auto;
  padding: 32px;
  width: 768px;

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

const OrderHistory = () => {
    const dispatch = useDispatch();
    const usersSelector = useSelector((state) => state.users);
    const orders = usersSelector.orders;

    useEffect(() => {
        dispatch(fetchOrdersHistory());
    }, []);

  return (
    <section className="c-section-wrapin">
      <OrderList>
        {orders.length > 0 && 
        orders.map((order) => <OrderHistoryItem key={order.id} order={order}/>)
        }
      </OrderList>
    </section>
  );
};

export default OrderHistory;
