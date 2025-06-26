import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Grid2,
  CircularProgress,
  Button,
} from "@mui/material";
import HamburgerMenu from "../../components/hamburgerMenu";

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

  const handleBackButton = () => {
    window.history.back();
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : recipeDetail ? (
        <>
          {/* <Button onClick={handleBackButton}>Back</Button> */}
          <HamburgerMenu />
          <Box
            sx={{
              background: "#FFF3E0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h3" textAlign="center" gutterBottom>
              {recipeDetail.recipeName}
            </Typography>
            <Paper
              component="img"
              src={`data:image/jpeg;base64,${recipeDetail.image}`}
              elevation={3}
              sx={{
                width: "60%",
                maxHeight: 400,
                objectFit: "cover",
                borderRadius: 2,
                mb: 4,
              }}
            />

            <Grid2
              container
              spacing={2}
              justifyContent="center"
              sx={{ maxWidth: 600, mb: 2 }}
            >
              <Grid2 item xs={6}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Course Type
                </Typography>
                <Typography>{recipeDetail.courseType}</Typography>
              </Grid2>
              <Grid2 item xs={6}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Cuisine Type
                </Typography>
                <Typography>{recipeDetail.cuisineType}</Typography>
              </Grid2>
            </Grid2>

            <Grid2
              container
              spacing={2}
              justifyContent="center"
              sx={{ maxWidth: 600, mb: 2 }}
            >
              <Grid2 item xs={6}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Serving Size
                </Typography>
                <Typography>{recipeDetail.servingSize}</Typography>
              </Grid2>
              <Grid2 item xs={6}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Estimated Time
                </Typography>
                <Typography>{recipeDetail.estimatedTime}</Typography>
              </Grid2>
              <Grid2 item xs={6}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Difficulty
                </Typography>
                <Typography>{recipeDetail.difficultyLevel}</Typography>
              </Grid2>
            </Grid2>

            <Box>
              <Typography variant="h5" gutterBottom>
                Ingredients:
              </Typography>
              {recipeDetail.ingredientsList.map((ingredient, index) => (
                <Typography key={index}>
                  {ingredient.name} {ingredient.quantity} {ingredient.unit}
                </Typography>
              ))}

              <Typography variant="h5">Instructions:</Typography>
              {recipeDetail.instructions.map((step, index) => (
                <Typography key={index}>{step}</Typography>
              ))}
            </Box>

            {recipeDetail?.tags?.length > 0 ? (
              <>
                <Typography variant="h5" gutterBottom>
                  Tags:
                </Typography>
                {recipeDetail.tags.map((tag, index) => (
                  <Typography
                    key={index}
                    variant="body1"
                    sx={{ display: "inline", mr: 1 }}
                  >
                    #{tag}
                  </Typography>
                ))}
              </>
            ) : (
              <Typography>No tags</Typography>
            )}

            {/* <Typography>{recipeDetail.createdBy}</Typography> */}
          </Box>
        </>
      ) : (
        <Typography>No recipe found.</Typography>
      )}
    </>
  );
};

export default RecipeDetail;
