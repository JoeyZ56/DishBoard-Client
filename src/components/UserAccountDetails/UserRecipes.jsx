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
import UpdateUserRecipes from "./UpdateUserRecipes";

const UserRecipes = () => {
  //State
  const [userRecipes, setUserRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  //Globals
  const apiKey = import.meta.env.VITE_API_KEY;

  // Fetch recipes
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
                  <Box>
                    <UpdateUserRecipes
                      recipe={recipe}
                      onDelete={() => {
                        setUserRecipes((prev) =>
                          prev.filter((r) => r.id !== recipe._id)
                        );
                      }}
                    />
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
