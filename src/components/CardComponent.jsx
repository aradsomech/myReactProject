import React, { useState } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PropTypes from "prop-types";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
  MemoryRouter,
} from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import Button from "@mui/material/Button";

const CardComponent = ({
  _id,
  title,
  subTitle,
  phone,
  address,
  img,
  alt,
  like,
  cardNumber,
  onDeleteCard,
  onEditCard,
  createdUser,
}) => {
  const navigate = useNavigate();
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  const [isLike, setIsLike] = useState(like);
  const handlePhoneClick = () => {
    console.log("you clicked on phone btn");
  };
  const { loggedIn } = useSelector((bigPie) => bigPie.authSlice);

  const handleDeleteCardClick = () => {
    axios
      .delete(`/cards/${_id}`)
      .then(() => {
        toast.success("Deleted successfully");
        onDeleteCard(_id);
      })
      .catch((err) => {
        toast.error("Deletion isnt allowed");
      });
  };
  const handleClickEditCard = () => {
    onEditCard(_id);
  };
  const handleLikeCardClick = () => {
    axios
      .patch(`/cards/${_id}`)
      .then(() => {
        setIsLike(!isLike);
        const toastMessage = isLike
          ? "You disliked a card"
          : "You liked a card";
        toast.success(toastMessage);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  return (
    <Card>
      <CardActionArea>
        <CardMedia component="img" image={img} height="160" alt={alt} />
      </CardActionArea>
      <CardContent>
        <CardHeader title={title} subheader={subTitle} sx={{ p: 0, mb: 1 }} />
        <Divider />
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2">
            <Typography fontWeight="700" variant="subtitle1" component="span">
              Phone:{" "}
            </Typography>
            {phone}
          </Typography>
          <Typography variant="body2">
            <Typography fontWeight="700" variant="subtitle1" component="span">
              Address:{" "}
            </Typography>
            {address}
          </Typography>
          <Typography variant="body2">
            <Typography fontWeight="700" variant="subtitle1" component="span">
              Card Number:{" "}
            </Typography>
            {cardNumber}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Box>
            <IconButton onClick={handlePhoneClick}>
              <PhoneIcon />
            </IconButton>

            {userData?.isAdmin || createdUser === userData?._id ? (
              <IconButton onClick={handleClickEditCard}>
                <CreateIcon />
              </IconButton>
            ) : null}
          </Box>
          <Box>
            {userData?.isAdmin || createdUser === userData?._id ? (
              <IconButton onClick={handleDeleteCardClick}>
                <DeleteIcon />
              </IconButton>
            ) : null}

            <IconButton onClick={handleLikeCardClick}>
              <FavoriteIcon color={isLike ? "favActive" : ""} />
            </IconButton>
          </Box>
        </Box>
        <Button
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/carddetail/${_id}`)}
          variant="outlined"
        >
          Read More
        </Button>
      </CardContent>
    </Card>
  );
};

CardComponent.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  phone: PropTypes.string,
  address: PropTypes.string,
  img: PropTypes.string,
  alt: PropTypes.string,
  like: PropTypes.bool,
  cardNumber: PropTypes.number,
  onDeleteCard: PropTypes.func.isRequired,
  onEditCard: PropTypes.func.isRequired,
  createdUser: PropTypes.string.isRequired,
};
CardComponent.defaultProps = {
  img: "https://www.livemint.com/lm-img/img/2023/08/14/1600x900/garena_free_fire_max_1688877791610_1691982307589.jpg",
  alt: "running",
};

export default CardComponent;
