import ROUTES from "../routes/ROUTES";

const myLinks = [
  { to: ROUTES.HOME, children: "Home page" },
  { to: ROUTES.REGISTER, children: "Register page" },
  { to: ROUTES.LOGIN, children: "Login page" },
];
const alwaysLinkFooter = [{ to: ROUTES.ABOUTPAGE, children: "about" }];
const regularUserLinksFooter = [
  { to: ROUTES.MYFAVORITES, children: "favorite" },
];

const adminOrBusinessLinksFooter = [
  { to: ROUTES.MYCARDS, children: "my cards" },
];

const alwaysLinks = [
  { to: ROUTES.HOME, children: "Home page" },
  { to: ROUTES.ABOUTPAGE, children: "About us" },
];
const loggedInLinks = [
  { to: ROUTES.PROFILE, children: "Profile page" },

  { to: ROUTES.MYFAVORITES, children: "My Favorites" },
];
const adminOrBusinessLinks = [
  { to: ROUTES.CREATECARD, children: "Create card" },
  { to: ROUTES.MYCARDS, children: "My Cards" },
];
const loggedOutLinks = [
  { to: ROUTES.REGISTER, children: "Register page" },
  { to: ROUTES.LOGIN, children: "Login page" },
];

export default myLinks;
export {
  alwaysLinks,
  loggedInLinks,
  loggedOutLinks,
  adminOrBusinessLinks,
  alwaysLinkFooter,
  adminOrBusinessLinksFooter,
  regularUserLinksFooter,
};
