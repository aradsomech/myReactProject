import { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Grid,
  Typography,
  Divider,
  Button,
  Paper,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditCardPage = () => {
  const navigate = useNavigate();
  const [inputsValue, setInputValue] = useState({
    title: "",
    subtitle: "",
    phone: "",
    add: "",
    mail: "",
    description: "",
    web: "",
    url: "",
    alt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });

  const { id: _id } = useParams();
  console.log(_id);
  const handleInputChange = (e) => {
    setInputValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };
  useEffect(() => {
    axios
      .get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${_id}`)
      .then(({ data }) => {
        console.log(data);
        setInputValue({
          title: data?.title,
          subtitle: data?.subtitle,
          phone: data?.phone,
          mail: data?.email,
          description: data?.description,
          web: data?.web,
          url: data?.image?.url,
          alt: data.image.alt,
          state: data.address.state,
          country: data.address.country,
          city: data.address.city,
          street: data.address.street,
          houseNumber: data.address.houseNumber,
          zip: data.address.zip,
        });
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);
  const handleUpdateChangesClick = async () => {
    console.log("edit");
    try {
      const { data } = await axios.put("/cards/" + _id, {
        title: inputsValue.title,
        subtitle: inputsValue.subtitle,
        description: inputsValue.description,
        phone: inputsValue.phone,
        email: inputsValue.mail,
        web: inputsValue.web,
        image: {
          url: inputsValue.url,
          alt: inputsValue.alt,
        },
        address: {
          state: inputsValue.state,
          country: inputsValue.country,
          city: inputsValue.city,
          street: inputsValue.street,
          houseNumber: inputsValue.houseNumber,
          zip: +inputsValue.zip,
        },
      });
      toast.success("updated successfully");
      navigate(-1);
    } catch (err) {
      toast.error(err.response.data);
      console.log("err", err.response);
    }
  };
  return (
    <Container sx={{ padding: "50px" }}>
      <Typography variant="h2" sx={{ mb: 1, padding: "10px", pb: "0px" }}>
        Card - Edit
      </Typography>
      <Typography variant="body1" sx={{ mb: 1, padding: "3px", ml: "7px" }}>
        Put a new values in the correct input
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <Grid container flexDirection={"column"}>
        <TextField
          id="title"
          label="Title"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.title}
          required
        />
        <TextField
          id="subtitle"
          label="SubTitle"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.subtitle}
          required
        />
        <TextField
          id="phone"
          label="Phone Number"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.phone}
          required
        />
        <TextField
          id="description"
          label="Description"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.description}
          required
        />
        <TextField
          id="web"
          label="Web"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.web}
        />
        <TextField
          id="mail"
          label="Email"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.mail}
          required
        />

        <TextField
          id="url"
          label="Url"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.url}
        />
        <TextField
          id="alt"
          label="Alt"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.alt}
        />

        <TextField
          id="state"
          label="State"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.state}
        />
        <TextField
          id="country"
          label="Country"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.country}
          required
        />
        <TextField
          id="city"
          label="City"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.city}
          required
        />
        <TextField
          id="street"
          label="Street"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.street}
          required
        />
        <TextField
          id="houseNumber"
          label="House Number"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.houseNumber}
          required
        />
        <TextField
          id="zip"
          label="Zip"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.zip}
        />
      </Grid>
      <Grid container spacing={2}>
        <Grid item lg={8} md={8} sm={8} xs>
          <Button
            variant="outlined"
            sx={{ mt: 2, width: "100%", ml: "0%", bgcolor: "lightskyblue" }}
            onClick={handleUpdateChangesClick}
          >
            Update Changes
          </Button>
        </Grid>
        <Grid item xs>
          <Link to={ROUTES.HOME}>
            <Button
              variant="outlined"
              sx={{
                mt: 2,
                width: "100%",
                ml: "0%",
                bgcolor: "navy",
                color: "gray",
              }}
            >
              Discard Changes
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};
export default EditCardPage;
