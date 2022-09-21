import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

function Review({ users }) {
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.clear();
    //SubmitLogic to store in database
    setSuccess(true);
  };

  return (
    <>
      <h2> Review the input</h2>
      <Box
        sx={{
          p: 10,
          width: "auto",
          backgroundColor: "#D6EDFD",
        }}
      >
        {success && (
          <Alert severity="success">Thanks for your information</Alert>
        )}
        <Paper
          sx={{
            height: 400,
            width: 400,
            mx: "auto",
            padding: 3,
          }}
          elevation={3}
        >
          {/* We can optimise the below further to create a separate component */}
          <h3>First Name:{users.FirstName}</h3>
          <Divider />
          <h3>Last Name: {users.LastName}</h3>
          <Divider />
          <h3>Phone Number: {users.PhoneNumber}</h3>
          <Divider />
          <h3>Address: {users.Address}</h3>
          <Divider />
          <h3>Favourite Pokemon: {users.Pokemon}</h3>
          <Divider />
          <Button
            size="medium"
            variant="outlined"
            sx={{
              maxWidth: "100px",
              justifyContent: "right",
              ml: 10,
              mt: 3,
              position: "relative",
            }}
            onClick={() => {
              navigate(-1);
            }}
          >
            Go Back
          </Button>
          <Button
            size="medium"
            variant="outlined"
            sx={{
              maxWidth: "100px",
              justifyContent: "right",
              ml: 10,
              mt: 3,
              position: "relative",
            }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Paper>
      </Box>
    </>
  );
}

export default Review;
