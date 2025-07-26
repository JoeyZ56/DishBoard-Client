import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Grid2 } from "@mui/material";
import {
  loadingStyle,
  largeWrapBoxStyle,
  loadingProps,
} from "../../styles/styles";
import RecipeCard from "./RecipeCard";

const LunchRecipes = ({ selectedCategory }) => {
  const [lunchRecipes, setLunchRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const apikey = import.meta.env.VITE_API_KEY;

  //Fetch recipes by dinner only
  useEffect(() => {
    const fetchLunchRecipes = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${apikey}/api/recipes/course/Lunch`);
        const data = await res.json();
        console.log("Lunch data sent:", data);
        setLunchRecipes(data);
      } catch (error) {
        console.error("Failed to fetch lunch recipes", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchLunchRecipes();
  }, []);

  //Filter by cuisine types
  useEffect(() => {
    const handleFilteredRecipes = () => {
      const filtered = lunchRecipes.filter(
        (recipes) => recipes.cuisineType === selectedCategory
      );
      setFilteredRecipes(filtered);
    };

    if (selectedCategory) {
      handleFilteredRecipes();
    }
  }, [selectedCategory, lunchRecipes]);

  const recipesToShow = selectedCategory ? filteredRecipes : lunchRecipes;

  return (
    <Grid2 container spacing={3} sx={largeWrapBoxStyle}>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
            width: "100%",
          }}
        >
          <CircularProgress sx={loadingStyle} {...loadingProps} />
        </Box>
      ) : error ? (
        <Box>
          <Typography>{error.message}</Typography>
        </Box>
      ) : (
        <>
          {recipesToShow.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </>
      )}
    </Grid2>
  );
};

export default LunchRecipes;
