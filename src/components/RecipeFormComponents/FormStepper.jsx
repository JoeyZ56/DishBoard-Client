import { useState, useEffect } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  Typography,
} from "@mui/material";

import RecipeBasics from "./RecipeBasics";
import IngredientFields from "./IngredientFields";
import InstructionFields from "./InstructionFields";
import RecipeTypes from "./RecipeTypes";
import TagSelector from "./TagSelector";
import ImageUpload from "./ImageUploader";

const steps = [
  "Recipe Basics",
  "Ingredients",
  "Instructions",
  "Types & Tags",
  "Image Upload",
];

const FormStepper = ({
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
  reportStepToParent,
  formError,
  setFormError,
}) => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    reportStepToParent(activeStep);
  }, []);

  const handleNext = () => {
    setActiveStep((prev) => {
      const next = prev + 1;
      reportStepToParent(next);
      return next;
    });
  };
  const handleBack = () => {
    setActiveStep((prev) => {
      const back = prev - 1;
      reportStepToParent(back);
      return back;
    });
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <RecipeBasics
            formData={formData}
            handleRecipeChange={handleRecipeChange}
            formError={formError}
            setFormError={setFormError}
          />
        );
      case 1:
        return (
          <IngredientFields
            ingredientsList={formData.ingredientsList}
            handleIngredientsChange={handleIngredientsChange}
            addIngredient={addIngredient}
            removeIngredient={removeIngredient}
            setFormData={setFormData}
            formError={formError}
            setFormError={setFormError}
          />
        );
      case 2:
        return (
          <InstructionFields
            instructions={formData.instructions}
            handleInstructionChange={handleInstructionChange}
            addInstruction={addInstruction}
            removeInstruction={removeInstruction}
            formError={formError}
            setFormError={setFormError}
          />
        );
      case 3:
        return (
          <>
            <RecipeTypes
              formData={formData}
              handleRecipeChange={handleRecipeChange}
              formError={formError}
              setFormError={setFormError}
            />
            <TagSelector
              tags={formData.tags}
              handleAddTag={handleAddTag}
              handleRemoveTag={handleRemoveTag}
              customTagMode={customTagMode}
              setCustomTagMode={setCustomTagMode}
              customTagInput={customTagInput}
              setCustomTagInput={setCustomTagInput}
              formError={formError}
              setFormError={setFormError}
            />
          </>
        );
      case 4:
        return <ImageUpload setFormData={setFormData} formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: "100%", mt: 3 }}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          "& .MuiStepIcon-root": {
            color: "#D7CCC8", // default/unfinished: soft earthy gray-brown
          },
          "& .MuiStepIcon-root.Mui-completed": {
            color: "#FFC107", // completed: golden yellow
          },
          "& .MuiStepIcon-root.Mui-active": {
            color: "#795548", // active: earthy brown
          },
        }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 4 }}>{renderStepContent(activeStep)}</Box>
      <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{
            backgroundColor: "#795548", // Earthy Brown
            color: "#FFF",
            "&:hover": {
              backgroundColor: "#5D4037", // darker brown
            },
            "&:disabled": {
              backgroundColor: "#CCC",
              color: "#666",
            },
          }}
        >
          Back
        </Button>

        <Button
          variant="contained"
          onClick={handleNext}
          disabled={activeStep === steps.length - 1}
          sx={{
            backgroundColor: "#FFC107", // Golden Yellow
            color: "#000",
            "&:hover": {
              backgroundColor: "#FFB300", // slightly darker yellow
            },
            "&:disabled": {
              backgroundColor: "#CCC",
              color: "#666",
            },
          }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default FormStepper;
