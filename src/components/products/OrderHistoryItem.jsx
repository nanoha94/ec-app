import React from "react";
import { TextDetail } from "../UIKit";
import { Divider } from "@material-ui/core";
import { OrderedProducts } from ".";

const OrderHistoryItem = ({ order }) => {
  const price = "¥" + order.amount.toLocaleString();
  return (
    <div>
      <div className="module-spacer--small" />
      <TextDetail label={"注文ID"} value={order.id} />
      <TextDetail label={"注文日時"} value={order.updated_at} />
      <TextDetail label={"発送予定日"} value={order.shipping_date} />
      <TextDetail label={"注文金額"} value={price} />
      {order.products.length > 0 && <OrderedProducts products={order.products} />}
      <div className="module-spacer--extra-extra-small" />
      <Divider />
    </div>
  );
};

export default OrderHistoryItem;
