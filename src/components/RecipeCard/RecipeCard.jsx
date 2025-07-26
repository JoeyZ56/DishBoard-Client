import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Grid2,
  Typography,
  CircularProgress,
  Card,
  Paper,
} from "@mui/material";

const RecipeCard = ({ recipe }) => {
  const { _id, image, mimeType, recipeName, tags, createdBy, cuisineType } =
    recipe;

  return (
    <Grid2
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      key={_id}
      sx={{ backgroundColor: "FFF3E0" }}
    >
      <Card
        component={Link}
        to={`/recipes/${_id}`}
        sx={{
          textDecoration: "none",
          backgroundColor: "#fff",
          width: 300,
          minHeight: 300,
          borderRadius: 3,
          boxShadow: 3,
          padding: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "transform 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.03)",
          },
        }}
      >
        <Box
          component="img"
          src={`data:${mimeType};base64,${image}`}
          alt={recipeName}
          sx={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            borderRadius: 2,
            mb: 2,
          }}
        />

        <Typography
          variant="subtitle1"
          fontWeight={600}
          textAlign="center"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            maxHeight: "3em",
          }}
        >
          {recipeName}
        </Typography>
        <Typography sx={{ mt: 1 }}>{cuisineType}</Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
          {tags.map((tag, index) => (
            <Typography key={index}>#{tag}</Typography>
          ))}
        </Box>

        <Typography sx={{ marginTop: 3 }}>
          Chef: {createdBy.username}
        </Typography>
      </Card>
    </Grid2>
  );
};

export default React.memo(RecipeCard);
