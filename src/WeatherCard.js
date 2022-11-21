import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";

import Location from "./Location";

const WeatherCard = ({ card }) => {
  return (
    <Grid item key={card} xs={12} sm={6} md={4}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia
          component="img"
          sx={
            {
              // 16:9
              //pt: "56.25%",
            }
          }
          image={"https://source.unsplash.com/2560x1440/?$" + card.name}
          alt="random"
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {card.name}
          </Typography>
          <Typography variant="h6" component="h3">
            {card.desc}
          </Typography>
          <Typography>
            This is a media card. You can use this section to describe the
            content.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Remove</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default WeatherCard;
