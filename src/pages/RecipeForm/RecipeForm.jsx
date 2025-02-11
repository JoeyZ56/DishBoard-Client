import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import HamburgerMenu from "../../components/hamburgerMenu";
import ImageUploader from "./imageUploader";
import "./styles.scss";

const RecipeForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    recipeName: "",
    ingredients: "",
    instructions: "",
    fileUpload: null,
    category: "select",
  });
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

  //handle file upload
  /* The handleFileUpload function is responsible for 
  handling the image file uploaded by the user. 
  It updates the formData state with the uploaded file. */
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        fileUpload: file,
      }));
    }
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

    if (
      !formData.recipeName ||
      !formData.ingredients ||
      !formData.instructions ||
      !formData.fileUpload ||
      !formData.category
    ) {
      setError("All Fields are required!");
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append("name", formData.recipeName);
    data.append("ingredients", formData.ingredients);
    data.append("instructions", formData.instructions);
    data.append("category", formData.category);
    if (formData.fileUpload) {
      data.append("image", formData.fileUpload);
    }

    try {
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
        ingredients: "",
        instructions: "",
        fileUpload: null,
        category: "select",
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

        {/* Recipe Name Field */}
        <TextField
          label="What do you call this recipe?"
          name="recipeName"
          variant="outlined"
          required
          fullWidth
          value={formData.recipeName}
          onChange={handleRecipeChange}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "black", // Default border color
              },
              "&:hover fieldset": {
                borderColor: "black", // Border color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "black", // Border color when focused
              },
            },
            "& .MuiInputLabel-root": {
              color: "black", // Label color
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "black", // Label color when focused
            },
          }}
        />

        {/* Ingredients Field */}
        <TextField
          label="What ingredients are used?"
          name="ingredients"
          variant="outlined"
          required
          fullWidth
          value={formData.ingredients}
          onChange={handleRecipeChange}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "black", // Default border color
              },
              "&:hover fieldset": {
                borderColor: "black", // Border color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "black", // Border color when focused
              },
            },
            "& .MuiInputLabel-root": {
              color: "black", // Label color
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "black", // Label color when focused
            },
          }}
        />

        {/* Instructions Field */}

        <TextField
          label="How do you make this meal?"
          name="instructions"
          variant="outlined"
          required
          fullWidth
          multiline
          rows={4}
          value={formData.instructions}
          onChange={handleRecipeChange}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "black", // Default border color
              },
              "&:hover fieldset": {
                borderColor: "black", // Border color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "black", // Border color when focused
              },
            },
            "& .MuiInputLabel-root": {
              color: "black", // Label color
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "black", // Label color when focused
            },
          }}
        />

        {/* Category Select */}

        <TextField
          select
          label="Select Category"
          name="category"
          value={formData.category}
          onChange={handleRecipeChange}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "black", // Default border color
              },
              "&:hover fieldset": {
                borderColor: "black", // Border color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "black", // Border color when focused
              },
            },
            "& .MuiInputLabel-root": {
              color: "black", // Label color
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "black", // Label color when focused
            },
          }}
        >
          <MenuItem value="select">Select</MenuItem>
          <MenuItem value="Breakfast">Breakfast</MenuItem>
          <MenuItem value="Lunch">Lunch</MenuItem>
          <MenuItem value="Dinner">Dinner</MenuItem>
          <MenuItem value="Dessert">Dessert</MenuItem>
          <MenuItem value="Appetizer">Appetizer</MenuItem>
          <MenuItem value="Side-Dish">Side Dish</MenuItem>
        </TextField>

        {/* Image Upload */}
        <ImageUploader handleFileUpload={handleFileUpload} />

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
