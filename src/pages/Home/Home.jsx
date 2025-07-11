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

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState();
  const [categories, setCategories] = useState();
  const [search, setSearch] = useState();
  const [searchResults, setSearchResults] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);

  const apiKey = import.meta.env.VITE_API_KEY;

  //handle search
  // const handleSearch = () => {
  //   setSearchResults(recipes.filter((recipe) => recipe.name === search));
  // };

  //handle category
  // const handleFilterCategory = (category) => {
  //   setSearchResults(recipes.filter((recipe) => recipe.category === category));
  // };

  //get all recipes
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch(`${apiKey}/api/recipes`);

        if (!res.ok) {
          throw new Error("Error fetching recipes for the frontend");
        }

        const data = await res.json();
        setRecipes(data);
        setLoading(false);
        setHasFetched(true);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <Box sx={{ backgroundColor: "#795548", minHeight: "100vh" }}>
      <Nav />
      <Box>
        <Categories recipes={recipes} />
      </Box>

      <Paper
        sx={{
          maxWidth: "1400px",
          gap: 2,
          width: "100%",
          mx: "auto",
          mt: "3rem",
          px: { xs: 2, sm: 3 }, // responsive padding
          py: 3,
          border: "1px solid #ccc",
          backgroundColor: "#FFF3E0",
          borderRadius: 2,
          boxShadow: 3,
          boxSizing: "border-box",
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: 600,
            marginBottom: "2rem",
            textAlign: "center",
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
          }}
        >
          Discover Delicious Recipes
        </Typography>

        {loading && !hasFetched ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "60vh",
            }}
          >
            <CircularProgress
              sx={{ color: "#FFC107" }}
              size={100}
              thickness={5}
            />
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
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      maxHeight: "3em",
                    }}
                  >
                    {recipe.recipeName}
                  </Typography>
                  <Box
                    sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}
                  >
                    {recipe.tags.map((tag, index) => (
                      <Typography key={index}>#{tag}</Typography>
                    ))}
                  </Box>
                  <Typography sx={{ marginTop: 3 }}>
                    Chef: {recipe.createdBy.username}
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
      </Paper>
    </Box>
  );
};

export default Home;
