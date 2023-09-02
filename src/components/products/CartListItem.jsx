import {
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import { db } from "../../firebase";
import DeleteIcon from "@material-ui/icons/Delete";

const StyledList = styled(ListItem)`
  height: 128px;
`;

const StyledImage = styled.img`
  object-fit: cover;
  margin: 16px;
  height: 96px;
  width: 96px;
`;

const StyledText = styled.div`
  width: 100%;
`;

const CartListItem = ({ product }) => {
  const usersSelector = useSelector((state) => state.users);

  const image = product.images[0].path;
  const name = product.name;
  const size = product.size;
  const price = product.price.toLocaleString();

  const removeProductFromCart = (id) => {
    return db
      .collection("users")
      .doc(usersSelector.uid)
      .collection("cart")
      .doc(id)
      .delete();
  };

  return (
    <>
      <StyledList>
        <ListItemAvatar>
          <StyledImage src={image} alt="商品画像" />
        </ListItemAvatar>
        <StyledText>
          <ListItemText primary={name} secondary={"サイズ:" + size} />
          <ListItemText primary={"¥" + price} />
        </StyledText>
        <IconButton onClick={() => removeProductFromCart(product.cartId)}>
          <DeleteIcon />
        </IconButton>
      </StyledList>
      <Divider />
    </>
  );
};

export default CartListItem;
