import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Paper, Typography, Grid2, CircularProgress } from "@mui/material";
import Nav from "../../components/hamburgerMenu";
import { wrapBoxStyle } from "../../styles/styles";

const RecipeDetail = () => {
  //state needed
  const [recipeDetail, setRecipeDetail] = useState();
  const [loading, setLoading] = useState(true);
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
      ) : recipeDetail ? (
        <>
          {/* <Button onClick={handleBackButton}>Back</Button> */}
          <Nav />
          <Box
            sx={{
              background: "#FFF3E0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              backgroundColor: "#795548",
            }}
          >
            <Typography
              variant="h4"
              textAlign="center"
              gutterBottom
              sx={{ mt: 4, mb: 4 }}
            >
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
            <Box sx={wrapBoxStyle}>
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
                  <Typography>{recipeDetail.servingSize} People</Typography>
                </Grid2>
                <Grid2 item xs={6}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Estimated Time
                  </Typography>
                  <Typography>{recipeDetail.estimatedTime} Minutes</Typography>
                </Grid2>
                <Grid2 item xs={6}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Difficulty
                  </Typography>
                  <Typography>{recipeDetail.difficultyLevel}</Typography>
                </Grid2>
              </Grid2>
            </Box>
            <Box sx={wrapBoxStyle}>
              <Typography variant="h5" gutterBottom>
                Ingredients:
              </Typography>
              {recipeDetail.ingredientsList.map((ingredient, index) => (
                <Typography key={index}>
                  {ingredient.name} {ingredient.quantity} {ingredient.unit}
                </Typography>
              ))}
            </Box>
            <Box sx={wrapBoxStyle}>
              <Typography variant="h5">Instructions:</Typography>
              {recipeDetail.instructions.map((step, index) => (
                <Typography key={index}>
                  {index + 1}. {step}
                </Typography>
              ))}
            </Box>

            {recipeDetail?.tags?.length > 0 ? (
              <Box sx={wrapBoxStyle}>
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
              </Box>
            ) : (
              <Typography>No tags</Typography>
            )}
          </Box>
          <Box sx={{ textAlign: "center", mt: 4, bgcolor: "#FFC107" }}>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{
                mb: 2,
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              Created by: {recipeDetail.createdBy?.username || "Unknown"}
            </Typography>
          </Box>
        </>
      ) : (
        <Typography>No recipe found.</Typography>
      )}
    </>
  );
};

export default RecipeDetail;
