import { useEffect, useMemo, useState } from "react";
import { Container, Grid } from "@mui/material";
import nextKey from "generate-my-key";

import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import axios from "axios";
import { useSelector } from "react-redux";
import useQueryParams from "../../hooks/useQueryParams";
import CardComponent from "../../components/CardComponent";
import homePageNormalization from "../home/homePageNormalization";
import CardDetailComponent from "../../components/CardDetailComponent";
import { useParams } from "react-router-dom";

const CardDetailPage = () => {
  const [card, setCard] = useState();
  const navigate = useNavigate();
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  const query = useQueryParams();
  let { cardId } = useParams();
  console.log(cardId);
  useEffect(() => {
    axios
      .get(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`
      )
      .then(({ data }) => {
        setCard(data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);
  // useEffect(() => {
  //   if (!initialDataFromServer.length) return;
  //   const filter = query.filter ? query.filter : "";
  //   setDataFromServer(
  //     initialDataFromServer.filter((card) => card.title.startsWith(filter))
  //   );
  // }, [query, initialDataFromServer]);
  console.log(card);
  const handleDeleteCard = (_id) => {
    console.log("_id to delete (HomePage)", _id);

    // dataFromServer = dataFromServer.filter((card) => card._id != _id);
    //return true for all the cards that has id that not equal to the id we want to delete
  };
  const handleEditCard = (_id) => {
    navigate(`${ROUTES.EDITCARD}/${_id}`);
  };

  return (
    <Container>
      <Grid>
        {card ? (
          <Grid item key={card._id} xs={12} sm={6} md={4} lg={3}>
            <CardDetailComponent
              _id={card._id}
              title={card.title}
              subTitle={card.subtitle}
              phone={card.phone}
              address={`${card.address.city}, ${card.address.street} ${card.address.houseNumber}`}
              img={card.image.url}
              alt={card.image.alt}
              like={card.likes}
              cardNumber={card.cardNumber}
              onDeleteCard={handleDeleteCard}
              onEditCard={handleEditCard}
              createdUser={card.user_id}
            />
          </Grid>
        ) : (
          ""
        )}
      </Grid>
    </Container>
  );
};

export default CardDetailPage;
