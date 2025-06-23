import { useState } from "react";
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

//File Imports
import HamburgerMenu from "../../components/hamburgerMenu";
import { getAuth } from "firebase/auth";
import FormContainer from "../../components/RecipeFormComponents/FormContainer";

const RecipeForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
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
        customQuantity: false, //acts as your toggle between select and custom input modes.
        customUnit: false, //acts as your toggle between select and custom input modes.
      },
    ],
    instructions: [""],
    image: null,
    tags: [],
    useCustomTag: false, //acts as your toggle between select and custom input modes.
  });
  const [customTagMode, setCustomTagMode] = useState(false);
  const [customTagInput, setCustomTagInput] = useState("");
  const [error, setError] = useState(null);

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

  //form handler
  /* The handleFormSubmit function is triggered when 
  the user submits the recipe form. Its job is to:
  
	1.	Prevent the default form submission behavior.
	2.	Package the form data (including the image) into a FormData object.
	3.	Send the data to the backend using a POST request.
	4.	Handle the response and provide feedback to the user. */
  const handleFormSubmit = async (e) => {
    e.preventDefault();
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
    console.log("Image before upload:", formData.image);

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

    data.append("image", formData.image);
    data.append("createdBy", uid);

    try {
      console.log(`${import.meta.env.VITE_API_KEY}/api/recipes`);
      const res = await fetch(`${import.meta.env.VITE_API_KEY}/api/recipes`, {
        method: "POST",
        body: data,
      });
      if (!res.ok) {
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
      console.error(error);
      alert("Error occurred submitting recipe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HamburgerMenu />

      {/* Form */}
      <Box
        component="form"
        onSubmit={handleFormSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          maxWidth: 400,
          margin: "auto",
          marginTop: "3rem",
          padding: 3,
          border: "1px solid #ccc",
          backgroundColor: "#FFF3E0",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" textAlign="center" gutterBottom>
          Create Recipe
        </Typography>

        {/* Error Message */}
        {error && <Alert severity="error">{error}</Alert>}

        <FormContainer
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
        />

        {/* Submit Form Button */}

        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#FFC107",
            color: "#000",
            "&:hover": { backgroundColor: "#FFB300" },
          }}
          fullWidth
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Submit Recipe"
          )}
        </Button>
      </Box>
    </>
  );
};

export default RecipeForm;
