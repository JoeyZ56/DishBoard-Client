import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid2, Typography, CircularProgress, Grid } from "@mui/material";

const RecipeDetail = () => {
  //state needed
  const [recipeDetail, setRecipeDetail] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const { id } = useParams();

  const apiKey = import.meta.env.VITE_API_KEY;

  //useEffect for fetching
  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const res = await fetch(`${apiKey}/api/recipes/${id}`);
        // console.log("Image preview:", recipeDetail.image?.substring(0, 100));

        if (!res.ok) {
          throw new Error("Error fetching recipe details");
        }

        const data = await res.json();
        setRecipeDetail(data);
        setLoading(false);
      } catch (error) {
        console.error("error fetching recipe details");
        setError(error);
        setLoading(false);
      }
    };
    fetchRecipeDetails();
  }, []);

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : recipeDetail ? (
        <Box
          sx={{
            background: "#FFF3E0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h2" textAlign="center" gutterBottom>
            {recipeDetail.recipeName}
          </Typography>
          <Box
            component="img"
            src={`data:image/jpeg;base64,${recipeDetail.image}`}
            sx={{
              width: "60%",
              maxHeight: 400,
              objectFit: "cover",
              borderRadius: 2,
            }}
          />

          <Typography variant="h4" textAlign="center" gutterBottom>
            Course Type: {recipeDetail.courseType}
          </Typography>
          <Typography variant="h4" textAlign="center" gutterBottom>
            Cuisine Type: {recipeDetail.cuisineType}
          </Typography>
          <Typography variant="h4" textAlign="center" gutterBottom>
            {recipeDetail.estimatedTime}
          </Typography>
          <Typography variant="h4" textAlign="center" gutterBottom>
            {recipeDetail.servingSize}
          </Typography>
        </Box>
      ) : (
        <Typography>No recipe found.</Typography>
      )}
    </>
  );
};

export default RecipeDetail;
