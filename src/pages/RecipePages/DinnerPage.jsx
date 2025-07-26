import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import DinnerRecipes from "../../components/RecipeCard/DinnerRecipes";
import Nav from "../../components/hamburgerMenu";
import { mainBoxStyle } from "../../styles/styles";
import CategoryButtons from "../../components/CategoryButtonsProp";

const DinnerPage = ({ dinnerRecipes }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  return (
    <Box sx={{ ...mainBoxStyle, bgcolor: "#795548" }}>
      <Nav />
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
        <DinnerRecipes
          dinnerRecipes={dinnerRecipes}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </Box>
    </Box>
  );
};

export default DinnerPage;
