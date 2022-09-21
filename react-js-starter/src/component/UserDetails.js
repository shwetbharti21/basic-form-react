import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

function UserDetails({ users, handleUserInputs }) {
  const { Pokemon } = users;
  const navigate = useNavigate();
  const [isInvalid, setIsInvalid] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: "",
    image: "",
  });

  const handleSave = () => {
    navigate("Review");
  };

  useEffect(() => {
    const arr = Object.values(users);
    setIsInvalid(false);
    arr.forEach((values) => {
      if (values === "") {
        setIsInvalid(true);
        return;
      }
    });
  });

  //Fetch the pokemon based on name
  const handleFetchingThePokemon = (Pokemon) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${Pokemon.toLowerCase()}`)
      .then((response) => {
        response
          .json()
          .then((res) => {
            setPokemon({
              name: res.name,
              img: res.sprites.front_default,
            });
          })
          .catch((e) => {
            alert("Pokemon Not Found!");
            const event = {
              target: {
                name: "Pokemon",
                value: "",
              },
            };
            handleUserInputs(event);
          });
      })
      .catch((e) => {
        alert("Pokemon Not Found!");
      });
  };

  return (
    <>
      <h2>User Details</h2>
      <Box
        component="form"
        sx={{
          p: 10,
          width: "auto",
          backgroundColor: "#D6EDFD",
        }}
      >
        {isInvalid && <Alert severity="error">All Fields are mandatory</Alert>}
        <Paper
          elevation={3}
          sx={{
            height: 700,
            width: 400,
            mx: "auto",
            padding: 3,
          }}
        >
          <TextField
            sx={{ my: 1 }}
            value={users.FirstName}
            onChange={handleUserInputs}
            variant="outlined"
            label="First Name"
            name="FirstName"
          />
          <TextField
            sx={{ my: 1 }}
            value={users.LastName}
            onChange={handleUserInputs}
            variant="outlined"
            label="Last Name"
            name="LastName"
          />
          <TextField
            sx={{ my: 1 }}
            value={users.PhoneNumber}
            onChange={handleUserInputs}
            variant="outlined"
            label="Phone Number"
            name="PhoneNumber"
          />
          <TextField
            sx={{ my: 1 }}
            value={users.Address}
            onChange={handleUserInputs}
            variant="outlined"
            label="Address"
            name="Address"
          />
          <h3>Which is your favourite Pokemon?</h3>
          <TextField
            id="outlined"
            sx={{ my: 1 }}
            value={users.Pokemon}
            label="Type a pokemon name"
            onChange={handleUserInputs}
            variant="outlined"
            name="Pokemon"
          />
          <Button
            sx={{
              maxWidth: "100px",
              justifyContent: "right",
              ml: 2,
              mt: 3,
              position: "relative",
            }}
            size="small"
            variant="contained"
            onClick={() => handleFetchingThePokemon(Pokemon)}
          >
            Search
          </Button>
          {pokemon.name && (
            <Paper elevation={3}>
              <h1>{pokemon.name.toLocaleUpperCase()}</h1>
              <img alt="" src={pokemon.img} />
            </Paper>
          )}
          <Button
            sx={{
              maxWidth: "50px",
              ml: 15,
              mt: 5,
            }}
            size="large"
            variant="contained"
            disabled={isInvalid}
            onClick={() => handleSave()}
          >
            Review
          </Button>
        </Paper>
      </Box>
    </>
  );
}

export default UserDetails;
