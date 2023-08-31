import React, { useCallback, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import HistoryIcon from "@material-ui/icons/History";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { styled } from "styled-components";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { TextInput } from "../UIKit";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { signOut } from "../../reducs/users/operations";

const DrawerContainer = styled.nav`
  @media screen and (max-width: 600px) {
    width: 256px;
    flex-shrink: 0;
  }
`;

const DrawerPaper = styled(Drawer)`
  width: 256px;
`;

const SearchField = styled.div`
  align-items: center;
  display: flex;
  margin-left: 32px;
`;

const ClosableDrawer = ({ container, open, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");

  const inputKeyword = useCallback(
    (event) => {
      setKeyword(event.target.value);
    },
    [setKeyword]
  );

  const selectMenu = (event, path) => {
    navigate(path);
    onClose(event);
  };

  const menus = [
    {
      func: selectMenu,
      label: "商品登録",
      icon: <AddCircleIcon />,
      id: "register",
      value: "/product/edit",
    },
    {
      func: selectMenu,
      label: "注文履歴",
      icon: <HistoryIcon />,
      id: "history",
      value: "/order/history",
    },
    {
      func: selectMenu,
      label: "プロフィール",
      icon: <PersonIcon />,
      id: "profile",
      value: "user/mypage",
    },
  ];

  return (
    <DrawerContainer>
      <DrawerPaper
        container={container}
        variant="temporary"
        anchor="right"
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
      >
        <div>
          <SearchField>
            <TextInput
              fullWidth={false}
              label={"キーワードを入力"}
              onChange={inputKeyword}
              value={keyword}
              type={"text"}
            />
            <IconButton>
              <SearchIcon />
            </IconButton>
          </SearchField>
          <Divider />
          <List>
            {menus.map((menu) => (
              <ListItem
                button
                key={menu.id}
                onClick={(e) => menu.func(e, menu.value)}
              >
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <ListItemText>{menu.label}</ListItemText>
              </ListItem>
            ))}
            <ListItem
              button
              key="logout"
              onClick={(event) => {
                dispatch(signOut(navigate));
              }}
            >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItem>
          </List>
        </div>
      </DrawerPaper>
    </DrawerContainer>
  );
};

export default ClosableDrawer;
