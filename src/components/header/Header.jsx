import React from "react";
import { styled } from "styled-components";
import { AppBar, Toolbar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { getIsSignIn } from "../../reducs/users/selectors";
import logo from "../../assets/img/icons/logo.png";
import { useNavigate } from "react-router";
import HeaderMenus from "./HeaderMenus";

const Root = styled.div`
  flex-grow: 1;
`;

const MenuBar = styled(AppBar)`
  background-color: #fff !important;
  color: #444 !important;
`;

const ToolBar = styled(Toolbar)`
  margin: 0 auto;
  max-width: 1024px;
  width: 100%;
`;

const IconButtons = styled.div`
  margin: 0 0 0 auto;
`;

const Header = () => {
  const navigate = useNavigate();
  const selector = useSelector((state) => state);
  const isSignedIn = getIsSignIn(selector);

  return (
  <Root>
    <MenuBar position="fixed">
      <ToolBar>
        <img src={logo} alt="Trahack Logo" width="128px" onClick={() => navigate('/')}/>
        {isSignedIn && <IconButtons><HeaderMenus /></IconButtons>}
      </ToolBar>
    </MenuBar>
  </Root>
  );
};

export default Header;
