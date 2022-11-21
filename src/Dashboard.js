import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TextField } from "@mui/material";

import { useState, useEffect } from "react";

import WeatherCard from "./WeatherCard";
import Location from "./Location";
import { alignProperty } from "@mui/material/styles/cssUtils";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/shaneSleeman">
        Shane Sleeman's Github
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Dashboard() {
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState([]);

  function addLocation(location) {
    let query =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      location +
      "&APPID=" +
      "1392939c8de4d48505175baaadda2965";

    let weatherData;

    try {
      async function getData() {
        const response = await fetch(query, { mode: "cors" });
        weatherData = await response.json();

        let newCard = Location(
          weatherData.name,
          weatherData.sys.country,
          weatherData.main.temp,
          weatherData.weather[0].description,
          weatherData.main.humidity,
          false
        );

        setCards((cards) => [...cards, newCard]);
      }

      getData();
    } catch (e) {}
  }

  useEffect(() => {
    addLocation("Sydney");
    addLocation("Tokyo");
    addLocation("New York");
  }, []);

  function changeSearch(event) {
    setSearch(event.target.value);
  }

  const deleteFunction = (i) => {
    setCards((cards) => cards.filter((item, n) => n !== i));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <WbSunnyIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Weather Cards
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Weather Cards
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Enter a city below, then click Add Location. If the location
              exists, a card containing the city's weather and image will be
              displayed!
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <TextField
                id="standard-basic"
                label="Location"
                variant="standard"
                onChange={changeSearch}
              />
              <Button variant="contained" onClick={() => addLocation(search)}>
                Add Location
              </Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card, i) => (
              <WeatherCard
                index={i}
                card={card}
                deleteFunction={deleteFunction}
              />
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Shane Sleeman
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Web Dev Portfolio Project
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
