import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Button,
  Drawer,
  ListItemIcon,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import MailIcon from "@mui/icons-material/Mail";
import { useState, Fragment } from "react";
import {
  adminOrBusinessLinks,
  alwaysLinks,
  loggedInLinks,
  loggedOutLinks,
} from "../../myLinks";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LeftDrawerComponent = ({ isOpen, onCloseDrawer }) => {
  const navigate = useNavigate();
  const { loggedIn } = useSelector((bigPie) => bigPie.authSlice);
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);

  const list = () => (
    <Box
      sx={{ width: { auto: 250 } }}
      role="presentation"
      onClick={onCloseDrawer}
      onKeyDown={onCloseDrawer}
    >
      <List>
        {alwaysLinks.map((text, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => navigate(text.to)}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text.children} />
            </ListItemButton>
          </ListItem>
        ))}
        {loggedIn &&
          loggedInLinks.map((text, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => navigate(text.to)}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text.children} />
              </ListItemButton>
            </ListItem>
          ))}
        {userData?.isAdmin || userData?.isBusiness
          ? adminOrBusinessLinks.map((text, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton onClick={() => navigate(text.to)}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text.children} />
                </ListItemButton>
              </ListItem>
            ))
          : null}
        {!loggedIn &&
          loggedOutLinks.map((text, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => navigate(text.to)}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text.children} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Box>
  );
  return (
    <Drawer anchor="left" open={isOpen} onClose={onCloseDrawer}>
      {list()}
    </Drawer>
  );
};

export default LeftDrawerComponent;
