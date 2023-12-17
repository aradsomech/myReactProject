import React, { useEffect, useState } from "react";
import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [userDataFromServer, setUserDataFromServer] = useState({
    _id: "",
    name: {
      first: "",
      middle: "",
      last: "",
      _id: "",
    },
    phone: "",
    email: "",
    image: {
      url: "",
      alt: "",
      _id: "",
    },
    address: {
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: 0,
      zip: 0,
      _id: "",
    },
    isAdmin: false,
    isBusiness: false,
    createdAt: "",
  });

  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get("/users/" + userData._id);
        setUserDataFromServer(data);
      } catch (err) {
        // Handle error
      }
    })();
  }, []);

  return (
    <Container sx={{ minHeight: "90vh" }}>
      <Grid container>
        <Grid item xs={12} sm={8} md={7}>
          <Typography variant="h3" p={2}>
            {userDataFromServer.name.first}&nbsp;
            {userDataFromServer.name.last}
          </Typography>
          <Box>
            <Typography variant="h5" component="p" sx={{ p: 2 }}>
              Country: {userDataFromServer.address.country}
            </Typography>
            <Typography variant="h5" component="p" sx={{ p: 2 }}>
              city: {userDataFromServer.address.city}
            </Typography>
            <Typography variant="h5" component="p" sx={{ p: 2 }}>
              street: {userDataFromServer.address.street}
            </Typography>
            <Typography variant="h5" component="p" sx={{ p: 2 }}>
              house number: {userDataFromServer.address.houseNumber}
            </Typography>
            <Typography variant="h5" component="p" sx={{ p: 2 }}>
              Email: {userDataFromServer.email}
            </Typography>
            <Typography variant="h5" component="p" sx={{ p: 2 }}>
              Phone: {userDataFromServer.phone}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={false} sm={4} md={2}>
          <Box
            component="img"
            src={userDataFromServer.image.url}
            alt={userDataFromServer.image.alt}
            sx={{ width: "100%" }}
          ></Box>
        </Grid>
      </Grid>
      <Divider sx={{ mt: 4, mb: 4 }}></Divider>
    </Container>
  );
};

export default ProfilePage;
