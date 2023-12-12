import ROUTES from "../routes/ROUTES";

const myLinks = [
  { to: ROUTES.HOME, children: "Home page" },
  { to: ROUTES.REGISTER, children: "Register page" },
  { to: ROUTES.LOGIN, children: "Login page" },
];

const alwaysLinks = [
  { to: ROUTES.HOME, children: "Home page" },
  { to: ROUTES.ABOUTPAGE, children: "About us" },
];
const loggedInLinks = [
  { to: ROUTES.PROFILE, children: "Profile page" },
  { to: ROUTES.CREATECARD, children: "Create page" },
  { to: ROUTES.MYCARDS, children: "My Cards" },
  { to: ROUTES.MYFAVORITES, children: "My Favorites" },
];
const loggedOutLinks = [
  { to: ROUTES.REGISTER, children: "Register page" },
  { to: ROUTES.LOGIN, children: "Login page" },
];

export default myLinks;
export { alwaysLinks, loggedInLinks, loggedOutLinks };
