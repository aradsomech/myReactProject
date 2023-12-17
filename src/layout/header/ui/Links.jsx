import { Box } from "@mui/material";
import nextKey from "generate-my-key";
import myLinks, {
  adminOrBusinessLinks,
  alwaysLinks,
  loggedInLinks,
  loggedOutLinks,
} from "../../myLinks";
import NavLinkComponent from "../NavLinkComponent";
import { useSelector } from "react-redux";

const Links = () => {
  const { loggedIn } = useSelector((bigPie) => bigPie.authSlice);
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);

  return (
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
      {alwaysLinks.map((myItem) => (
        <NavLinkComponent to={myItem.to} key={nextKey()}>
          {myItem.children}
        </NavLinkComponent>
      ))}
      {loggedIn &&
        adminOrBusinessLinks.map((myItem) => (
          <NavLinkComponent to={myItem.to} key={nextKey()}>
            {myItem.children}
          </NavLinkComponent>
        ))}
      {userData?.isAdmin || userData?.isBusiness
        ? loggedInLinks.map((myItem) => (
            <NavLinkComponent to={myItem.to} key={nextKey()}>
              {myItem.children}
            </NavLinkComponent>
          ))
        : null}
      {!loggedIn &&
        loggedOutLinks.map((myItem) => (
          <NavLinkComponent to={myItem.to} key={nextKey()}>
            {myItem.children}
          </NavLinkComponent>
        ))}
    </Box>
  );
};

export default Links;
