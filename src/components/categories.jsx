"use client";
import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";

const categories = ({ recipes }) => {
  const [newRecipes, setNewRecipes] = useState([]);

  const handleNewestRecipes = () => {
    const newest = recipes.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setNewRecipes(newest);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 2,
        marginTop: 2,
        padding: 2,
      }}
    >
      <Button
        variant="contained"
        color="primary"
        sx={{
          borderRadius: 2,
          backgroundColor: "#FFF3E0",
          color: "black",
          fontWeight: "bold",
        }}
      >
        Top Rated
      </Button>
      <Button
        variant="contained"
        onClick={{ handleNewestRecipes }}
        color="primary"
        sx={{
          borderRadius: 2,
          backgroundColor: "#FFF3E0",
          color: "black",
          fontWeight: "bold",
        }}
      >
        Newest
      </Button>
      <Button
        variant="contained"
        color="primary"
        sx={{
          borderRadius: 2,
          backgroundColor: "#FFF3E0",
          color: "black",
          fontWeight: "bold",
        }}
      >
        Random
      </Button>
    </Box>
  );
};

export default categories;
