import {
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import React, { useCallback } from "react";
import { styled } from "styled-components";
import { PrimaryButton } from "../UIKit";
import { useNavigate } from "react-router";

const StyledListItem = styled(ListItem)`
  background-color: #fff;
  height: auto;
`;

const Image = styled.img`
  object-fit: cover;
  margin: 8px 16px 8px 0;
  height: 96px;
  width: 96px;
`;

const Text = styled.div`
  width: 100%;
`;

const OrderdProducts = ({ products }) => {
  const navigate = useNavigate();

  const gotoProductDetail = useCallback((id) => {
    navigate("/product/" + id);
  }, []);

  return (
    <List>
      {products.map((product, idx) => (
        <React.Fragment key={idx}>
          <StyledListItem>
            <ListItemAvatar>
              <Image src={product.images[0].path} alt="商品画像" />
            </ListItemAvatar>
            <Text>
              <ListItemText
                primary={product.name}
                secondary={"サイズ: " + product.size}
              />
              <ListItemText
                primary={product.name}
                secondary={"¥" + product.price.toLocaleString()}
              />
            </Text>
            <PrimaryButton
              label={"商品詳細を見る"}
              onClick={() => gotoProductDetail(product.id)}
            />
          </StyledListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
};

export default OrderdProducts;
