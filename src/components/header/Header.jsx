import React, { useCallback, useState } from "react";
import { styled } from "styled-components";
import { AppBar, Toolbar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { getIsSignIn } from "../../reducs/users/selectors";
import logo from "../../assets/img/icons/logo.png";
import { useNavigate } from "react-router";
import HeaderMenus from "./HeaderMenus";
import ClosableDrawer from "./ClosableDrawer";

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

  const [open, setOpen] = useState(false);

  const handleDrawerToggle = useCallback((event) => {
    if(event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')){
      return;
    }
    setOpen((open) =>!open);
  }, [setOpen]);

  return (
  <Root>
    <MenuBar position="fixed">
      <ToolBar>
        <img src={logo} alt="Torahack Logo" width="128px" onClick={() => navigate('/')}/>
        {isSignedIn && <IconButtons><HeaderMenus handleDrawerToggle={handleDrawerToggle}/></IconButtons>}
      </ToolBar>
    </MenuBar>
    <ClosableDrawer open={open} onClose={handleDrawerToggle} />
  </Root>
  );
};

export default Header;
