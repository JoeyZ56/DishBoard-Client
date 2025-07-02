import { useState, useEffect } from "react";
import { Box, Typography, Link, CircularProgress, Paper } from "@mui/material";
import Nav from "../../../components/hamburgerMenu";
import { wrapBoxStyle } from "../../../styles/styles";

const UserAccount = () => {
  const [userRecipes, setUserRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const auth = JSON.parse(localStorage.getItem("auth"));

  useEffect(() => {
    const apiKey = import.meta.env.VITE_API_KEY;

    // Fetch user's recipes from the backend
    const fetchUserRecipes = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${apiKey}/api/recipes/user-recipes/${auth.uid}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user recipes");
        }
        const data = await response.json();
        setUserRecipes(data.userRecipes);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (auth?.uid) {
      fetchUserRecipes();
    }
  }, []);

  return (
    <>
      <Nav />

      {/* Basic Information */}
      <Box sx={{ textAlign: "center", marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          {auth?.username ? `${auth.username}'s Account` : "User Account"}
        </Typography>
      </Box>
      {/* Loading State */}
      {loading || !auth ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress sx={{ color: "#FFC107" }} size={80} thickness={5} />
        </Box>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          padding={2}
        >
          {/* User Recipe posts */}
          <Box>
            <Typography variant="h5" gutterBottom textAlign={"center"}>
              My Recipes
            </Typography>
            {/* Map through user's recipes and display them */}
            {userRecipes.length === 0 ? (
              <Link
                href="/recipe-form"
                sx={{
                  display: "inline-block",
                  marginTop: 2,
                  textAlign: "center",
                  textDecoration: "none",
                  color: "#FFC107",
                  fontWeight: "bold",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Create your first recipe
              </Link>
            ) : (
              userRecipes.map((recipe) => (
                <Paper
                  component="div"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  elevation={3}
                  key={recipe.id}
                  sx={wrapBoxStyle}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    textAlign={"center"}
                    sx={{ fontWeight: "bold" }}
                  >
                    {recipe.recipeName}
                  </Typography>
                  <Paper
                    component="img"
                    src={`data:image/jpeg;base64,${recipe.image}`}
                    elevation={3}
                    sx={{
                      width: "100%",
                      maxHeight: 150,
                      maxWidth: 200,
                      objectFit: "cover",
                      borderRadius: 2,
                      mb: 4,
                    }}
                  />
                </Paper>
              ))
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default UserAccount;
