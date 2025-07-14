import { useState, useEffect } from "react";
import { auth } from "../../Firebase/firebaseClient";
import { onAuthStateChanged } from "firebase/auth";
import {
  Box,
  Typography,
  Link,
  CircularProgress,
  Paper,
  Button,
} from "@mui/material";
import { buttonStyle, wrapBoxStyle } from "../../styles/styles";

const UserRecipes = () => {
  //State
  const [userRecipes, setUserRecipes] = useState([]);
  const [updateRecipe, setUpdateRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  //Globals
  const apiKey = import.meta.env.VITE_API_KEY;

  //Handlers
  const handleUpdateRecipe = async (e) => {
    const recipe = e.target.value;
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Not authenticated");

      const token = await user.getIdToken();

      const res = await fetch(`${apiKey}/api/recipes/update/${user.uid}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipe }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to update update recipe");
      }

      const data = await res.json();
      setUpdateRecipe(data.user.recipe);
      console.log("recipe updated successfully");
    } catch (error) {
      console.error("Failed to update recipe", error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        try {
          const res = await fetch(
            `${apiKey}/api/recipes/user-recipes/${user.uid}`
          );
          const data = await res.json();
          console.log("Fetched user data:", data);

          setUserRecipes(data.userRecipes);
        } catch (error) {
          console.error("Failed to fetch user recipes", error.message);
          setError(
            "Oops, an error occurred trying to get your recipes! Your recipes will be ready soon!"
          );
        } finally {
          setLoading(false);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      {error ? (
        <Box>
          <Typography>{error}</Typography>
        </Box>
      ) : (
        <>
          {loading || !auth ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100vh"
            >
              <CircularProgress
                sx={{ color: "#FFC107" }}
                size={80}
                thickness={5}
              />
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
              <Box sx={wrapBoxStyle}>
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
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "100%",
                          maxHeight: 150,
                          maxWidth: 200,
                          objectFit: "cover",
                          borderRadius: 2,
                          mb: 4,
                        }}
                      />
                      <Button sx={buttonStyle}>Edit</Button>
                      <Button sx={buttonStyle}>Delete</Button>
                    </Paper>
                  ))
                )}
              </Box>
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default UserRecipes;
