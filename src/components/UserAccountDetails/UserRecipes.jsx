import { useState, useEffect } from "react";
import { auth } from "../../Firebase/firebaseClient";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate;

  //Handlers
  const handleUpdateRecipe = async (updatedFields, recipeId) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Not authenticated");

      const token = await user.getIdToken();

      const res = await fetch(`${apiKey}/api/recipes/update/${recipeId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFields),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to update recipe");
      }

      const data = await res.json();
      setUpdateRecipe(data.updatedRecipe);
      console.log("Recipe updated successfully");
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
      ) : loading || !auth ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress sx={{ color: "#FFC107" }} size={80} thickness={5} />
        </Box>
      ) : (
        <Box sx={{ p: 2 }}>
          <Typography
            variant="h5"
            gutterBottom
            textAlign="center"
            sx={{ mb: 3 }}
          >
            My Recipes
          </Typography>

          {userRecipes.length === 0 ? (
            <Link
              href="/recipe-form"
              sx={{
                display: "inline-block",
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
            <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
              {userRecipes.map((recipe) => (
                <Box
                  key={recipe.id}
                  sx={{
                    width: 300,
                    p: 2,
                    borderRadius: 2,
                    boxShadow: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "#fff",
                  }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    textAlign="center"
                    sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
                  >
                    {recipe.recipeName}
                  </Typography>

                  <Box
                    component="img"
                    src={`data:image/jpeg;base64,${recipe.image}`}
                    alt={recipe.recipeName}
                    sx={{
                      height: 200,
                      width: "100%",
                      objectFit: "cover",
                      borderRadius: 2,
                      mb: 2,
                    }}
                  />

                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Button sx={buttonStyle}>Edit</Button>
                    <Button sx={buttonStyle}>Delete</Button>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default UserRecipes;
