import * as React from "react";
// import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Switch } from "@mui/material";
import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import ROUTES from "../../routes/ROUTES";
// import NavLinkComponent from "./NavLinkComponent";
// import nextKey from "generate-my-key";
// import myLinks, {
//   alwaysLinks,
//   loggedInLinks,
//   loggedOutLinks,
// } from "../myLinks";

import Links from "./ui/Links";
import LeftDrawerComponent from "./ui/LeftDrawerComponent";
import { useState } from "react";
import FilterComponent from "./ui/FilterComponent";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import ROUTES from "../../routes/ROUTES";

const HeaderComponent = ({ isDarkTheme, onThemeChange }) => {
  const [myUser, setMyUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const { loggedIn } = useSelector((bigPie) => bigPie.authSlice);
  React.useEffect(() => {
    if (userData) {
      axios
        .get(`/users/${userData._id}`)
        .then(({ data }) => {
          setMyUser(data);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }, [userData]);
  console.log(userData);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    setTimeout(() => {
      navigate(ROUTES.HOME);
      window.location.reload();
    }, 500);
    toast.success("You logged out successfully");
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleThemeChange = (event) => {
    onThemeChange(event.target.checked);
  };

  const handleOpenDrawerClick = () => {
    setIsOpen(true);
  };
  const handleCloseDrawerClick = () => {
    setIsOpen(false);
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => navigate("/Profile")}>Profile</MenuItem>
      {userData?.isAdmin && (
        <MenuItem onClick={() => navigate("/userspage")}>Users</MenuItem>
      )}

      {userData ? (
        <MenuItem onClick={handleLogout}>logout</MenuItem>
      ) : (
        <MenuItem onClick={() => navigate("/login")}>login</MenuItem>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages!!</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1, mb: 2 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleOpenDrawerClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: { xs: "none", sm: "block" },
              maxWidth: "50px",
              maxHeight: "50px",
              overflow: "hidden",
            }}
          >
            <img
              src="logo.jpg"
              alt="Logo"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </Typography>
          <Links />
          <FilterComponent />
          <Box
            sx={{
              my: 2,
              p: 1,
            }}
          >
            <IconButton color="inherit" onClick={handleThemeChange}>
              <Typography sx={{ display: { xs: "none", md: "inline" } }}>
                {isDarkTheme ? <DarkModeIcon /> : <LightModeIcon />}
              </Typography>
            </IconButton>
          </Box>

          <p>
            Hello, {myUser?.name?.first} {myUser?.name?.last}
          </p>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {loggedIn && renderMenu}
      <LeftDrawerComponent
        isOpen={isOpen}
        onCloseDrawer={handleCloseDrawerClick}
      />
    </Box>
  );
};
export default HeaderComponent;
