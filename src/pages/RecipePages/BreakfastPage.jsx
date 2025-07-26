import { useState } from "react";
import { Box } from "@mui/material";
import Nav from "../../components/hamburgerMenu";
import BreakfastRecipes from "../../components/RecipeCard/BreakfastRecipes";
import CategoryButtons from "../../components/CategoryButtonsProp";
import { mainBoxStyle } from "../../styles/styles";

const BreakfastPage = ({ breakfastRecipes }) => {
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
        <BreakfastRecipes
          breakfastRecipes={breakfastRecipes}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </Box>
    </Box>
  );
};

export default BreakfastPage;
