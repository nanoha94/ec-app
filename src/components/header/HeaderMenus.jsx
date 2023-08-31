import React from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MenuIcon from "@material-ui/icons/Menu";
import { Badge, IconButton } from "@material-ui/core";

const HeaderMenus = ({handleDrawerToggle}) => {
  return (
    <>
      <IconButton>
        <Badge badgeContent={3} color="secondary" overlap="rectangular" >
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <IconButton>
        <FavoriteBorderIcon />
      </IconButton>
      <IconButton onClick={handleDrawerToggle}>
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default HeaderMenus;
