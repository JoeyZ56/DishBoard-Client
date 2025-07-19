import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Grid2,
  Typography,
  CircularProgress,
  Card,
  Paper,
} from "@mui/material";
import Nav from "../../components/hamburgerMenu";
import Categories from "../../components/categories";
import AllRecipeList from "../../components/RecipeCard/AllRecipeList";

const Home = ({ allRecipes, setAllRecipes }) => {
  //handle search
  // const handleSearch = () => {
  //   setSearchResults(recipes.filter((recipe) => recipe.name === search));
  // };

  //handle category
  // const handleFilterCategory = (category) => {
  //   setSearchResults(recipes.filter((recipe) => recipe.category === category));
  // };

  return (
    <Box sx={{ backgroundColor: "#795548", minHeight: "100vh" }}>
      <Nav />
      <Box>
        <Categories />
      </Box>

      <Box>
        <Typography
          variant="h4"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 4,
            mb: -3,
            fontWeight: 500,
          }}
        >
          Delicious Recipes
        </Typography>
        <AllRecipeList allRecipes={allRecipes} setAllRecipes={setAllRecipes} />
      </Box>
    </Box>
  );
};

export default Home;
