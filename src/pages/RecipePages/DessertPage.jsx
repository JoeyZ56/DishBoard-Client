import { useState } from "react";
import { Box, Typography } from "@mui/material";
import Nav from "../../components/hamburgerMenu";
import DessertRecipes from "../../components/RecipeCard/DessertRecipes";
import CategoryButtons from "../../components/CategoryButtonsProp";
import { mainBoxStyle, wrapBoxStyle } from "../../styles/styles";
import { Link } from "react-router-dom";

const DessertPage = ({ dessertRecipes }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  return (
    <Box sx={{ ...mainBoxStyle, bgcolor: "#795548" }}>
      <Nav />
      {!dessertRecipes ? (
        <Box sx={wrapBoxStyle}>
          <Typography sx={{ textAlign: "center" }}>
            No desserts added yet. Be the First! <br />
            <Link to="/recipe-form" sx={{ color: "#FFC107" }}>
              Create A Recipe
            </Link>
          </Typography>
        </Box>
      ) : (
        <>
          <Box>
            <CategoryButtons
              buttons={[
                { label: "American" },
                { label: "Mexican" },
                { label: "Italian" },
                { label: "Asian" },
                { label: "Other" },
              ]}
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
            />
          </Box>
          <Box>
            <DessertRecipes
              dessertRecipes={dessertRecipes}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default DessertPage;
