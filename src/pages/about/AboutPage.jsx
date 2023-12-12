import { Container, Divider, Grid, Typography } from "@mui/material";
import { Fragment } from "react";

const AboutPage = () => {
  return (
    <Container sx={{ my: 5, minHeight: "90vh" }}>
      <Typography variant="h1">About us</Typography>
      <Typography variant="h4">
        Here you can hear about us and our website
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={12} lg={7}>
          <Fragment>
            <Divider sx={{ m: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: "bold", p: 1 }}>
              Our Story
            </Typography>
            <Typography variant="h5">
              This site is designed to help the general public search and find
              business owners that are suitable for them as well as for both
              large and small businesses.
            </Typography>
            <Typography variant="h5">
              Business owners' cards with full details are displayed on the
              website.
            </Typography>
            <Divider sx={{ m: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: "bold", p: 1 }}>
              Public user
            </Typography>
            <Typography variant="h5">
              Our public users can register on the site and enjoy a wide range
              of activities on the site, they will be able to save cards they
              liked, create a card, edit their profile and more
            </Typography>
            <Divider sx={{ m: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: "bold", p: 1 }}>
              Business user
            </Typography>
            <Typography variant="h5">
              Business owners who wish to advertise your business will be able
              to create a business profile and create a card that all visitors
              to the site can see
            </Typography>
          </Fragment>
        </Grid>
      </Grid>
    </Container>
  );
};
export default AboutPage;
