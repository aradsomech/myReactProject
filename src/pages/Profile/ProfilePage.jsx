import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import CardComponent from "../../components/CardComponent";
import { errorToast, infoToast } from "../../messages/myToasts";
import IconButton from "@mui/material/IconButton";
import CreateIcon from "@mui/icons-material/Create";

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
  const [myCard, setMyCard] = useState([]);
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get("/users/" + userData._id);
        setUserDataFromServer(data);
      } catch (err) {
        errorToast("Something wrong...");
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get("/cards/my-cards");
        setMyCard(data);
      } catch (err) {
        errorToast("Something worng...");
      }
    })();
  }, []);

  const handleEditCardClick = (_id) => {
    navigate(`${ROUTES.EDITCARD}/${_id}`);
  };
  const handleCreateCardClick = () => {
    navigate(ROUTES.CREATECARD);
  };

  const handleDeleteCardClick = async (_id, bizNumber) => {
    try {
      let request = {
        bizNumber: +bizNumber,
      };
      await axios.delete("/cards/" + _id, request);
      setMyCard((dataFromServerCopy) =>
        dataFromServerCopy.filter((card) => card._id !== _id)
      );
      infoToast("Card deleted");
    } catch (err) {
      errorToast("Something wrong....");
    }
  };

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
              Email: {userDataFromServer.email}
            </Typography>
            <Typography variant="h5" component="p" sx={{ p: 2 }}>
              Phone: {userDataFromServer.phone}
            </Typography>
            <IconButton
              onClick={() => navigate("/edituser/" + userDataFromServer._id)}
            >
              <CreateIcon />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={false} sm={4} md={5}>
          <Box
            component="img"
            src={userDataFromServer.image.url}
            alt={userDataFromServer.image.alt}
            sx={{ width: "100%" }}
          ></Box>
        </Grid>
      </Grid>
      <Divider sx={{ mt: 4, mb: 4 }}></Divider>
      {myCard.length ? (
        <Grid container spacing={2}>
          {myCard.map((card) => (
            <Grid item key={card._id} xs={12} sm={6} md={4} lg={3}>
              <CardComponent
                _id={card._id}
                title={card.title}
                subTitle={card.subtitle}
                description={card.description}
                email={card.email}
                address={`${card.address.city}, ${card.address.street} ${card.address.houseNumber}`}
                img={card.image.url}
                alt={card.image.alt}
                phone={card.phone}
                bizNumber={card.bizNumber}
                onDeleteClick={handleDeleteCardClick}
                onEditClick={handleEditCardClick}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Fragment>
          <Typography variant="h4">You don't have cards yet</Typography>
          <Button
            sx={{ m: 2 }}
            variant="contained"
            onClick={handleCreateCardClick}
          >
            Create Card
          </Button>
        </Fragment>
      )}
    </Container>
  );
};
export default ProfilePage;
