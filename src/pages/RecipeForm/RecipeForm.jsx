import { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  buttonStyle,
  wrapBoxStyle,
  errorMessage,
  mainBoxStyle,
} from "../../styles/styles";

//File Imports
import Nav from "../../components/hamburgerMenu";
import { getAuth } from "firebase/auth";
import FormStepper from "../../components/RecipeFormComponents/FormStepper";

const RecipeForm = () => {
  const location = useLocation();
  const recipeToEdit = location.state?.recipe;
  const isEditMode = !!recipeToEdit;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    recipeName: recipeToEdit?.recipeName || "",
    courseType: recipeToEdit?.courseType || "select",
    cuisineType: recipeToEdit?.cuisineType || "select",
    difficultyLevel: recipeToEdit?.difficultyLevel || "select",
    estimatedTime: recipeToEdit?.estimatedTime || "",
    servingSize: recipeToEdit?.servingSize || "",
    ingredientsList: recipeToEdit?.ingredientsList || [
      {
        name: "",
        quantity: "",
        unit: "",
        customQuantity: false, //acts as your toggle between select and custom input modes.
        customUnit: false, //acts as your toggle between select and custom input modes.
      },
    ],
    instructions: recipeToEdit?.instructions || [""],
    image: recipeToEdit?.image || null,
    tags: recipeToEdit?.tags || [],
    useCustomTag: recipeToEdit?.useCustomTag || false, //acts as your toggle between select and custom input modes.
  });
  const [customTagMode, setCustomTagMode] = useState(false);
  const [customTagInput, setCustomTagInput] = useState("");
  const [error, setError] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [formError, setFormError] = useState({});

  const { id } = useParams();

  const apiKey = import.meta.env.VITE_API_KEY;

  const steps = [
    "Recipe Basics",
    "Ingredients",
    "Instructions",
    "Types & Tags",
    "Image Upload",
  ];

  //handle input change
  /* The handleRecipeChange function is responsible for 
  dynamically updating the formData state whenever 
  the user types into any input field (name, ingredients, etc.). */
  const handleRecipeChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle instruction change
  const handleIngredientsChange = (index, e) => {
    const { name, value } = e.target;
    const updatedIngredients = [...formData.ingredientsList];
    updatedIngredients[index][name] = value;

    if (name === "quantity" && value.trim() === "") {
      updatedIngredients[index].customQuantity = false;
    }

    if (name === "unit" && value.trim() === "") {
      updatedIngredients[index].customUnit = false;
    }

    setFormData({ ...formData, ingredientsList: updatedIngredients });
  };

  //Add a new ingredient field
  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredientsList: [
        ...formData.ingredientsList,
        {
          name: "",
          quantity: "",
          unit: "",
          customQuantity: false,
          customUnit: false,
        },
      ],
    });
  };

  // Remove an ingredient field
  const removeIngredient = (index) => {
    const updatedIngredients = [...formData.ingredientsList];
    updatedIngredients.splice(index, 1);
    setFormData({ ...formData, ingredientsList: updatedIngredients });
  };

  // Handle instruction changes
  const handleInstructionChange = (index, e) => {
    const updatedInstructions = [...formData.instructions];
    updatedInstructions[index] = e.target.value;
    setFormData({ ...formData, instructions: updatedInstructions });
  };

  // Add a new instruction field
  const addInstruction = () => {
    setFormData({ ...formData, instructions: [...formData.instructions, ""] });
  };

  // Remove an instruction field
  const removeInstruction = (index) => {
    const updatedInstructions = [...formData.instructions];
    updatedInstructions.splice(index, 1);
    setFormData({ ...formData, instructions: updatedInstructions });
  };

  const handleAddTag = (value) => {
    const trimmed = value.trim();
    if (trimmed && !formData.tags.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, trimmed],
      }));
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const validateForm = () => {
    const error = {};

    //Basic Info validation
    if (!formData.recipeName.trim()) {
      error.recipeName = (
        <Typography sx={errorMessage}>Recipe name is required!</Typography>
      );
    }
    if (!formData.servingSize) {
      error.servingSize = "Serving size is required!";
    }
    if (!formData.estimatedTime === "") {
      error.estimatedTime = "Estimated time is required!";
    }
    if (!/^\d+s/.test(formData.estimatedTime)) {
      error.estimatedTime = "Numbers only";
    }

    //Ingredients validation
    formData.ingredientsList.forEach((ingredient, index) => {
      if (!ingredient.name.trim()) {
        error[`ingredient-${index}-name`] = "Ingredient name is required!";
      }
      if (!ingredient.quantity.trim() && ingredient.customQuantity === false) {
        error[`ingredient-${index}-quantity`] =
          "Ingredient quantity is required!";
      }
    });

    //Instructions Validation
    formData.instructions.forEach((instruction, index) => {
      if (!instruction.trim()) {
        error[`instruction-${index}`] =
          "Instructions required. Either enter one or remove unused from list.";
      }
    });

    //Selects Validation
    if (formData.courseType === "select") {
      error.courseType = "Please choose a course type.";
    }
    if (formData.cuisineType === "select") {
      error.cuisineType = "Please choose a cuisine type.";
    }
    if (formData.difficultyLevel === "select") {
      error.difficultyLevel = (
        <Typography>Please choose a difficulty level.</Typography>
      );
    }

    setFormError(error);
    return Object.keys(error).length === 0;
  };

  //form handler
  /* The handleFormSubmit function is triggered when 
  the user submits the recipe form. Its job is to:
  
	1.	Prevent the default form submission behavior.
	2.	Package the form data (including the image) into a FormData object.
	3.	Send the data to the backend using a POST request.
	4.	Handle the response and provide feedback to the user. */
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError({});

    //Validation Check
    const isValid = validateForm();
    if (!isValid) {
      setLoading(false);
      alert("Missing required fields, go back and check highlighted fields");
      return; //stop form submission
    }

    setLoading(true);

    const auth = getAuth();
    const user = auth.currentUser;

    let uid = null;

    if (user) {
      uid = user.uid;
    }

    if (!uid) {
      setError("User not authorized. Please log in.");
      setLoading(false);
      return;
    }

    const data = new FormData();
    // console.log("Image before upload:", formData.image);

    data.append("recipeName", formData.recipeName);
    data.append("courseType", formData.courseType);
    data.append("cuisineType", formData.cuisineType);
    data.append("difficultyLevel", formData.difficultyLevel);
    data.append("estimatedTime", formData.estimatedTime);
    data.append("servingSize", formData.servingSize);

    // Convert array to JSON before Sending
    data.append("ingredientsList", JSON.stringify(formData.ingredientsList));
    data.append("instructions", JSON.stringify(formData.instructions));
    if (formData.tags.length) {
      data.append("tags", JSON.stringify(formData.tags));
    }

    if (formData.image instanceof File) {
      data.append("image", formData.image);
    }
    data.append("createdBy", uid);

    try {
      //Change the fetch url depending on if user is updating or creating
      const endpoint = id
        ? `${apiKey}/api/recipes/update/${id}`
        : `${apiKey}/api/recipes`;
      const res = await fetch(endpoint, {
        method: id ? "PUT" : "POST",
        body: data,
      });
      if (!res.ok) {
        const errorData = await res.json();
        console.error("Server error response:", errorData);
        throw new Error("Failed to submit recipe");
      }

      //reset form on success
      setFormData({
        recipeName: "",
        courseType: "select",
        cuisineType: "select",
        difficultyLevel: "select",
        estimatedTime: "",
        servingSize: "",
        ingredientsList: [
          {
            name: "",
            quantity: "",
            unit: "",
            customQuantity: false,
            customUnit: false,
          },
        ],
        instructions: [""],
        image: null,
        tags: [],
      });
      alert("Recipe has been added");
      window.location.href = "/";
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error occurred submitting recipe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ ...mainBoxStyle, bgcolor: "#795548" }}>
      <Nav />

      {/* Form */}
      <Box component="form" onSubmit={handleFormSubmit} sx={wrapBoxStyle}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Create Recipe
        </Typography>

        {/* Error Message */}
        {error && <Alert severity="error">{error}</Alert>}

        <FormStepper
          formData={formData}
          setFormData={setFormData}
          handleRecipeChange={handleRecipeChange}
          handleIngredientsChange={handleIngredientsChange}
          addIngredient={addIngredient}
          removeIngredient={removeIngredient}
          handleInstructionChange={handleInstructionChange}
          addInstruction={addInstruction}
          removeInstruction={removeInstruction}
          handleAddTag={handleAddTag}
          handleRemoveTag={handleRemoveTag}
          customTagMode={customTagMode}
          setCustomTagMode={setCustomTagMode}
          customTagInput={customTagInput}
          setCustomTagInput={setCustomTagInput}
          reportStepToParent={setCurrentStep}
          validateForm={validateForm}
          formError={formError}
          setFormError={setFormError}
        />

        {/* Submit Form Button */}
        {currentStep === steps.length - 1 && (
          <Button type="submit" variant="contained" sx={buttonStyle} fullWidth>
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : isEditMode ? (
              "Update Recipe"
            ) : (
              "Submit Recipe"
            )}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default RecipeForm;
