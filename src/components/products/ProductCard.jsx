import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { styled } from "styled-components";
import NoImage from "../../assets/img/src/no_image.png";
import { useNavigate } from "react-router";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../reducs/products/operations";

const StyledCard = styled(Card)`
  margin: 16px;
  width: calc(33.3333% - 32px);

  @media screen and (max-width: 600px) {
    margin: 8px;
    width: calc(50% - 16px);
  }
`;

const StyledContent = styled(CardContent)`
  display: flex;
  padding: 16px 8px;
  text-align: left;
  &:last-child {
    padding-bottom: 16px;
  }
`;

const StyledMedia = styled(CardMedia)`
  height: 0;
  padding-top: 100%;
`;

const ProductName = styled(Typography)`
  height: 18px;
  box-orient: vertical;
  display: -webkit-box;
  font-size: 14px;
  line-height: 18;
  overflow: hidden;
  line-clamp: 1;

  @media screen and (max-width: 600px) {
    height: 36px;
    line-clamp: 2;
  }
`;

const Price = styled(Typography)`
  color: #01579b;
  font-style: 16px;
`;

const ProductCard = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const image = props.images.length > 0 ? props.images[0].path : NoImage;
  const price = props.price.toLocaleString();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledCard>
      <StyledMedia
        image={image}
        onClick={() => navigate("/product/" + props.id)}
      />
      <StyledContent>
        <div onClick={() => navigate("/product/" + props.id)}>
          <ProductName color={"textSecondary"} component={"p"}>
            {props.name}
          </ProductName>
          <Price component={"p"}>¥{price}</Price>
        </div>
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              navigate("/product/edit/" + props.id);
              handleClose();
            }}
          >
            編集する
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(deleteProduct(props.id));
            }}
          >
            削除する
          </MenuItem>
        </Menu>
      </StyledContent>
    </StyledCard>
  );
};

export default ProductCard;
