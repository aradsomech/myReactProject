import { useState } from "react";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { normalizeData } from "./normalizeData";
import { validateRegister } from "../../validation/registerValidation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [inputsValue, setInputsValue] = useState({
    first: "",
    middle: "",
    last: "",
    email: "",
    password: "",
    phone: "",
    url: "",
    alt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });
  const [errors, setErrors] = useState({});
  const handleInputsChange = (e) => {
    //step 1
    // setInputsValue((currentState) => {
    //   currentState.firstName = e.target.value;
    //   let newObject = { ...currentState };
    //   return newObject;
    // });

    //step 2
    // setInputsValue((currentState) => {
    //   currentState[e.target.id] = e.target.value;
    //   let newObject = { ...currentState };
    //   return newObject;
    // });

    //step 3
    // setInputsValue((currentState) => ({
    //   ...currentState,
    //   firstName: e.target.value,
    // }));

    //step 4
    setInputsValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };
  const handleSubmit = async (event) => {
    console.log("inputsValue", inputsValue);
    try {
      event.preventDefault();

      // inputsValue.isBusiness = false;
      setErrors(validateRegister(inputsValue));
      console.log(errors);
      if (errors) {
        return;
      }
      let request = normalizeData(inputsValue);
      const { data } = await axios.post("/users", request);
      toast.success("User created successfully");
      navigate(ROUTES.LOGIN);
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data || "error");
    }
  };
  return (
    <Box
      onSubmit={handleSubmit}
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      // noValidate
      // autoComplete="off"
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box component="form" noValidate sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              autoComplete="given-name"
              name="first"
              required
              fullWidth
              id="first"
              label="First Name"
              autoFocus
              value={inputsValue.first}
              onChange={handleInputsChange}
              error={Boolean(errors?.first)}
              helperText={errors?.first}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              autoComplete="given-name"
              name="middle"
              fullWidth
              id="middle"
              label="Middle Name"
              autoFocus
              value={inputsValue.middle}
              onChange={handleInputsChange}
              error={Boolean(errors?.middle)}
              helperText={errors?.middle}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              fullWidth
              id="last"
              label="Last Name"
              name="last"
              autoComplete="family-name"
              value={inputsValue.last}
              onChange={handleInputsChange}
              error={Boolean(errors?.last)}
              helperText={errors?.last}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={inputsValue.email}
              onChange={handleInputsChange}
              error={Boolean(errors?.email)}
              helperText={errors?.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={inputsValue.password}
              onChange={handleInputsChange}
              error={Boolean(errors?.password)}
              helperText={errors?.password}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="phone"
              label="Phone"
              id="phone"
              autoComplete="new-phone"
              value={inputsValue.phone}
              onChange={handleInputsChange}
              error={Boolean(errors?.phone)}
              helperText={errors?.phone}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="url"
              label="Url"
              id="url"
              autoComplete="new-url"
              value={inputsValue.url}
              onChange={handleInputsChange}
              error={Boolean(errors?.url)}
              helperText={errors?.url}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="alt"
              label="Alt"
              id="alt"
              autoComplete="new-alt"
              value={inputsValue.alt}
              onChange={handleInputsChange}
              error={Boolean(errors?.alt)}
              helperText={errors?.alt}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="state"
              label="State"
              id="state"
              autoComplete="new-state"
              value={inputsValue.state}
              onChange={handleInputsChange}
              error={Boolean(errors?.state)}
              helperText={errors?.state}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="country"
              label="Country"
              id="country"
              autoComplete="new-country"
              value={inputsValue.country}
              onChange={handleInputsChange}
              error={Boolean(errors?.country)}
              helperText={errors?.country}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="city"
              label="City"
              id="city"
              autoComplete="new-city"
              value={inputsValue.city}
              onChange={handleInputsChange}
              error={Boolean(errors?.city)}
              helperText={errors?.city}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="street"
              label="Street"
              id="street"
              autoComplete="new-street"
              value={inputsValue.street}
              onChange={handleInputsChange}
              error={Boolean(errors?.street)}
              helperText={errors?.street}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="houseNumber"
              label="House Number"
              id="houseNumber"
              autoComplete="new-houseNumber"
              value={inputsValue.houseNumber}
              onChange={handleInputsChange}
              error={Boolean(errors?.houseNumber)}
              helperText={errors?.houseNumber}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="zip"
              label="Zip"
              id="zip"
              autoComplete="new-zip"
              value={inputsValue.zip}
              onChange={handleInputsChange}
              error={Boolean(errors?.zip)}
              helperText={errors?.zip}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="Business Account"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link
              onClick={() => navigate(ROUTES.LOGIN)}
              href="#"
              variant="body2"
            >
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default RegisterPage;
