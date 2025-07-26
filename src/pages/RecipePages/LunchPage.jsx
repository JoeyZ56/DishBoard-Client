import { useState } from "react";
import { Box } from "@mui/material";
import Nav from "../../components/hamburgerMenu";
import CategoryButtons from "../../components/CategoryButtonsProp";
import { mainBoxStyle } from "../../styles/styles";
import LunchRecipes from "../../components/RecipeCard/LunchRecipes";

const LunchPage = ({ lunchRecipes }) => {
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
        <LunchRecipes
          lunchRecipes={lunchRecipes}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </Box>
    </Box>
  );
};

export default LunchPage;
