import SelectField from "./selectFields/selectFields";

const RecipeTypes = ({ formData, handleRecipeChange }) => {
  return (
    <>
      <SelectField
        label="Course Type"
        name="courseType"
        value={formData.courseType}
        onChange={handleRecipeChange}
        options={[
          "select",
          "Breakfast",
          "Lunch",
          "Dinner",
          "Dessert",
          "Appetizer",
          "Side-Dish",
          "Sauces",
        ]}
      />

      <SelectField
        label="Cuisine Type"
        name="cuisineType"
        value={formData.cuisineType}
        onChange={handleRecipeChange}
        options={["select", "American", "Mexican", "Italian", "Asian", "Other"]}
      />

      <SelectField
        label="Difficulty"
        name="difficultyLevel"
        value={formData.difficultyLevel}
        onChange={handleRecipeChange}
        options={["select", "Easy", "Medium", "Hard"]}
      />
    </>
  );
};

export default RecipeTypes;
