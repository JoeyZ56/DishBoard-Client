import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Grid2 } from "@mui/material";
import {
  loadingStyle,
  largeWrapBoxStyle,
  loadingProps,
} from "../../styles/styles";
import RecipeCard from "./RecipeCard";

const BreakfastRecipes = ({ selectedCategory }) => {
  const [breakfastRecipes, setBreakfastRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const apikey = import.meta.env.VITE_API_KEY;

  //Fetch recipes by dinner only
  useEffect(() => {
    const fetchBreakfastRecipes = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${apikey}/api/recipes/course/Breakfast`);
        const data = await res.json();
        console.log("Breakfast data sent:", data);
        setBreakfastRecipes(data);
      } catch (error) {
        console.error("Failed to fetch breakfast recipes", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchBreakfastRecipes();
  }, []);

  //Filter by cuisine types
  useEffect(() => {
    const handleFilteredRecipes = () => {
      const filtered = breakfastRecipes.filter(
        (recipes) => recipes.cuisineType === selectedCategory
      );
      setFilteredRecipes(filtered);
    };

    if (selectedCategory) {
      handleFilteredRecipes();
    }
  }, [selectedCategory, breakfastRecipes]);

  const recipesToShow = selectedCategory ? filteredRecipes : breakfastRecipes;

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

export default BreakfastRecipes;
