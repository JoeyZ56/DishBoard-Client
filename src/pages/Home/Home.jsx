import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Button,
  CircularProgress,
  CardMedia,
} from "@mui/material";
import HamburgerMenu from "../../components/hamburgerMenu";

/*
array of food by category, category leads to a page with all the food in that category
*/

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState();
  const [categories, setCategories] = useState();
  const [search, setSearch] = useState();
  const [searchResults, setSearchResults] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  //handle search
  // const handleSearch = () => {
  //   setSearchResults(recipes.filter((recipe) => recipe.name === search));
  // };

  //handle category
  // const handleFilterCategory = (category) => {
  //   setSearchResults(recipes.filter((recipe) => recipe.catefory === category));
  // };

  //get all recipes
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5003/api/recipes");

        if (!res.ok) {
          throw new Error("Error fetching recipes for the frontend");
        }

        const data = await res.json();
        setRecipes(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <Box>
      <HamburgerMenu />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFF3E0",
          // width: "95%",
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          gutterBottom
          sx={{ marginTop: "3rem" }}
        >
          Recipes
        </Typography>
        {recipes.length === 0 ? (
          <Box>
            <Typography>
              No recipes have been added yet. Be the first!
            </Typography>
          </Box>
        ) : loading ? (
          <Box>
            <CircularProgress />
          </Box>
        ) : (
          <Box>
            {recipes.map((recipe) => (
              <Link key={uid} to={`/recipes/${recipe._id}`}>
                <CardMedia
                  component="img"
                  image={`data:${recipe.mimeType};base64,${recipe.image}`}
                  alt={recipe.recipeName}
                />
              </Link>
            ))}
          </Box>
        )}
        {error && <Typography color="error">{error.message}</Typography>}
      </Box>
    </Box>
  );
};

export default Home;
