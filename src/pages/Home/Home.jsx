import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Grid2,
  Typography,
  Button,
  CircularProgress,
  CardMedia,
  Card,
  CardContent,
} from "@mui/material";
import HamburgerMenu from "../../components/hamburgerMenu";

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
    <Box sx={{ backgroundColor: "#795548", minHeight: "100vh" }}>
      <HamburgerMenu />

      <Box sx={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem" }}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: 600,
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          Discover Delicious Recipes
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : recipes.length === 0 ? (
          <Typography variant="body1">
            No recipes have been added yet. Be the first!
          </Typography>
        ) : (
          <Grid2 container spacing={3}>
            {recipes.map((recipe) => (
              <Grid2
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={recipe._id}
                sx={{ backgroundColor: "FFF3E0" }}
              >
                <Card
                  component={Link}
                  to={`/recipes/${recipe._id}`}
                  sx={{
                    textDecoration: "none",
                    backgroundColor: "#FFF3E0",
                    borderRadius: 3,
                    boxShadow: 3,
                    padding: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    transition: "transform 0.2s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.03)",
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={`data:${recipe.mimeType};base64,${recipe.image}`}
                    alt={recipe.recipeName}
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
                    noWrap
                  >
                    {recipe.recipeName}
                  </Typography>
                </Card>
              </Grid2>
            ))}
          </Grid2>
        )}

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error.message}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Home;
