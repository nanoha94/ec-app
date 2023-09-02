import React, { useEffect } from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MenuIcon from "@material-ui/icons/Menu";
import { Badge, IconButton } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase";
import { fetchProductsInCart } from "../../reducs/users/operations";
import { useNavigate } from "react-router";

const HeaderMenus = ({ handleDrawerToggle }) => {
  const usersSelector = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const uid = usersSelector.uid;
  const productsInCart = usersSelector.cart;

  useEffect(() => {
    const updatedProductsInCart = [...productsInCart];
    const unsubscribe = db
      .collection("users")
      .doc(uid)
      .collection("cart")
      .onSnapshot((snapshots) => {        
        snapshots.docChanges().forEach((change) => {
          const product = change.doc.data();

          switch (change.type) {
            case "added":
              updatedProductsInCart.push(product);
              break;
            case "modified":
              const index = updatedProductsInCart.findIndex(
                (product) => product.cartId === change.doc.id
              );
              updatedProductsInCart[index] = product;
              break;
            case "removed":
              updatedProductsInCart = updatedProductsInCart.filter(
                (product) => product.cartId !== change.doc.id
              );
              break;
            default:
              break;
          }
        });
        dispatch(fetchProductsInCart(updatedProductsInCart));
      });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <IconButton>
        <Badge
          badgeContent={productsInCart.length}
          color="secondary"
          overlap="rectangular"
        >
          <ShoppingCartIcon onClick={() => navigate('/cart')}/>
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
