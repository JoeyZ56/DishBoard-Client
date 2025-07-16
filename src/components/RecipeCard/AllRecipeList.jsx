import { useEffect, useState } from "react";
import { CircularProgress, Grid2, Typography, Box } from "@mui/material";
import {
  loadingProps,
  loadingStyle,
  wrapBoxStyle,
  largeWrapBoxStyle,
} from "../../styles/styles";
import RecipeCard from "./RecipeCard";

const AllRecipeList = () => {
  //State
  const [allRecipes, setAllRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //Globals
  const apiKey = import.meta.env.VITE_API_KEY;

  //get all recipes
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch(`${apiKey}/api/recipes`);

        if (!res.ok) {
          throw new Error("Error fetching recipes for the frontend");
        }

        const data = await res.json();
        console.log("Fetched Data:", data);
        setAllRecipes(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

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
          {allRecipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </>
      )}
    </Grid2>
  );
};

export default AllRecipeList;
