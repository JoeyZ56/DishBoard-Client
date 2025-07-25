import SelectField from "./selectFields/selectFields";

const RecipeTypes = ({ formData, handleRecipeChange, formError }) => {
  return (
    <>
      <SelectField
        label="Course Type"
        name="courseType"
        value={formData.courseType}
        onChange={handleRecipeChange}
        required
        error={!!formError.courseType}
        helperText={formError.courseType}
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
        required
        error={!!formError.cuisineType}
        helperText={formError.cuisineType}
        options={["select", "American", "Mexican", "Italian", "Asian", "Other"]}
      />

      <SelectField
        label="Difficulty"
        name="difficultyLevel"
        value={formData.difficultyLevel}
        onChange={handleRecipeChange}
        required
        error={!!formError.difficultyLevel}
        helperText={formError.difficultyLevel}
        options={["select", "Easy", "Medium", "Hard"]}
      />
    </>
  );
};

export default RecipeTypes;
