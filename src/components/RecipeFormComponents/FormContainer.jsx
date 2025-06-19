import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
  MenuItem,
  IconButton,
} from "@mui/material";

import RecipeBasics from "./RecipeBasics";
import IngredientFields from "./IngredientFields";
import InstructionFields from "./InstructionFields";
import RecipeTypes from "./RecipeTypes";
import TagSelector from "./TagSelector";
import ImageUpload from "./ImageUploader";

const FormContainer = ({
  formData,
  setFormData,
  handleRecipeChange,
  handleIngredientsChange,
  addIngredient,
  removeIngredient,
  handleInstructionChange,
  addInstruction,
  removeInstruction,
  handleAddTag,
  handleRemoveTag,
  customTagMode,
  setCustomTagMode,
  customTagInput,
  setCustomTagInput,
}) => {
  return (
    <Box>
      <RecipeBasics
        formData={formData}
        handleRecipeChange={handleRecipeChange}
      />
      <IngredientFields
        ingredientsList={formData.ingredientsList}
        handleIngredientsChange={handleIngredientsChange}
        addIngredient={addIngredient}
        removeIngredient={removeIngredient}
        setFormData={setFormData}
      />
      <InstructionFields
        instructions={formData.instructions}
        handleInstructionChange={handleInstructionChange}
        addInstruction={addInstruction}
        removeInstruction={removeInstruction}
      />
      <RecipeTypes
        formData={formData}
        handleRecipeChange={handleRecipeChange}
      />
      <TagSelector
        tags={formData.tags}
        handleAddTag={handleAddTag}
        handleRemoveTag={handleRemoveTag}
        customTagMode={customTagMode}
        setCustomTagMode={setCustomTagMode}
        customTagInput={customTagInput}
        setCustomTagInput={setCustomTagInput}
      />
      <ImageUpload setFormData={setFormData} />
    </Box>
  );
};

export default FormContainer;
