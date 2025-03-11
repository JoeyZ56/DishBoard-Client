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
import { Add, Delete } from "@mui/icons-material";
import HamburgerMenu from "../../components/hamburgerMenu";
import Upload from "./upload";
import { getAuth } from "firebase/auth";

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
      },
    ],
    instructions: [""],
    image: null,
    tags: [""],
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

  // Handle instruction change
  const handleIngredientsChange = (index, e) => {
    const { name, value } = e.target;
    const updatedIngredients = [...formData.ingredientsList];
    updatedIngredients[index][name] = value;
    setFormData({ ...formData, ingredientsList: updatedIngredients });
  };

  //Add a new ingredient field
  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredientsList: [
        ...formData.ingredientsList,
        { name: "", quantity: "", unit: "" },
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

    // if (
    //   !formData.recipeName ||
    //   !formData.category ||
    //   !formData.cuisineType ||
    //   !formData.difficultyLevel ||
    //   !formData.estimatedTime ||
    //   !formData.servingSize ||
    //   !formData.ingredientsList ||
    //   !formData.instructions ||
    //   !formData.image
    // ) {
    //   setError("All Fields are required!");
    //   setLoading(false);
    //   return;
    // }

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

        {/* Recipe Name Field */}
        <Typography variant="h6">Recipe Name</Typography>
        <TextField
          label="Name"
          name="recipeName"
          variant="outlined"
          required
          fullWidth
          value={formData.recipeName}
          onChange={handleRecipeChange}
          sx={{
            backgroundColor: "#FFF",
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

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">Serving Size</Typography>
          <Typography variant="h6" sx={{ marginRight: 4 }}>
            Estimated Time
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Servings Field */}

          <TextField
            label="How many servings?"
            name="servingSize"
            variant="outlined"
            value={formData.servingSize}
            onChange={handleRecipeChange}
            sx={{
              backgroundColor: "#FFF",
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
          {/*estimated time */}

          <TextField
            label="Total time in minutes"
            name="estimatedTime"
            variant="outlined"
            value={formData.estimatedTime}
            onChange={handleRecipeChange}
            sx={{
              backgroundColor: "#FFF",
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
        </Box>

        {/* Ingredients Fields */}
        <Typography variant="h6">Ingredients</Typography>
        {formData.ingredientsList.map((ingredient, index) => (
          <Box
            key={index}
            sx={{ display: "flex", alignItems: "center", gap: 2 }}
          >
            <TextField
              label="Ingredient Name"
              name="name"
              value={ingredient.name}
              onChange={(e) => handleIngredientsChange(index, e)}
              fullWidth
              sx={{
                backgroundColor: "#FFF",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "black",
                  },
                  "&:hover fieldset": {
                    borderColor: "black",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "black",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "black",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "black",
                },
              }}
            />
            <TextField
              label="Quantity"
              name="quantity"
              value={ingredient.quantity}
              onChange={(e) => handleIngredientsChange(index, e)}
              sx={{
                width: 100,
                backgroundColor: "#FFF",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "black",
                  },
                  "&:hover fieldset": {
                    borderColor: "black",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "black",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "black",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "black",
                },
              }}
            />
            <TextField
              label="Unit"
              name="unit"
              value={ingredient.unit}
              onChange={(e) => handleIngredientsChange(index, e)}
              sx={{
                width: 100,
                backgroundColor: "#FFF",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "black",
                  },
                  "&:hover fieldset": {
                    borderColor: "black",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "black",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "black",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "black",
                },
              }}
            />
            <IconButton onClick={() => removeIngredient(index)} color="error">
              <Delete />
            </IconButton>
          </Box>
        ))}
        <Button
          onClick={addIngredient}
          variant="contained"
          startIcon={<Add />}
          sx={{
            backgroundColor: "#FFC107",
            color: "#000",
            "&:hover": { backgroundColor: "#FFB300" },
          }}
        >
          Add Ingredient
        </Button>

        {/* Instructions Field */}
        <Typography variant="h6">Instructions</Typography>
        {formData.instructions.map((step, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <TextField
              label={`step ${index + 1}`}
              value={step}
              onChange={(e) => handleInstructionChange(index, e)}
              fullWidth
              multiline
              row={2}
              sx={{
                backgroundColor: "#FFF",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "black",
                  },
                  "&:hover fieldset": {
                    borderColor: "black",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "black",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "black",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "black",
                },
              }}
            />
            <IconButton onClick={() => removeInstruction(index)} color="error">
              <Delete />
            </IconButton>
          </Box>
        ))}
        <Button
          onClick={addInstruction}
          variant="contained"
          startIcon={<Add />}
          sx={{
            backgroundColor: "#FFC107",
            color: "#000",
            "&:hover": { backgroundColor: "#FFB300" },
          }}
        >
          Add Step
        </Button>

        {/* courseType Select */}
        <Typography variant="h6">Course Type</Typography>
        <TextField
          select
          label="Select Course Type"
          name="courseType"
          value={formData.courseType}
          onChange={handleRecipeChange}
          fullWidth
          sx={{
            backgroundColor: "#FFF",
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

        {/* Cuisine Type */}
        <Typography variant="h6">Cuisine Type</Typography>
        <TextField
          select
          label="Select Cuisine Type"
          name="cuisineType"
          value={formData.cuisineType}
          onChange={handleRecipeChange}
          fullWidth
          sx={{
            backgroundColor: "#FFF",
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
          <MenuItem value="American">American</MenuItem>
          <MenuItem value="Mexican">Mexican</MenuItem>
          <MenuItem value="Italian">Italian</MenuItem>
          <MenuItem value="Asian">Asian</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField>

        {/*Difficulty Level */}
        <Typography variant="h6">Difficulty</Typography>
        <TextField
          select
          label="Select Difficulty"
          name="difficultyLevel"
          value={formData.difficultyLevel}
          onChange={handleRecipeChange}
          fullWidth
          sx={{
            backgroundColor: "#FFF",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "black",
              },
              "&:hover fieldset": {
                borderColor: "black",
              },
              "&.Mui-focused fieldset": {
                borderColor: "black",
              },
            },
            "& .MuiInputLabel-root": {
              color: "black",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "black",
            },
          }}
        >
          <MenuItem value="select">Select</MenuItem>
          <MenuItem value="Easy" sx={{ color: "green" }}>
            Easy
          </MenuItem>
          <MenuItem value="Medium" sx={{ color: "orange" }}>
            Medium
          </MenuItem>
          <MenuItem value="Hard" sx={{ color: "red" }}>
            Hard
          </MenuItem>
        </TextField>

        {/* Tags */}
        <Typography variant="h6">Tags</Typography>
        <TextField
          label="Enter tags (optional)"
          name="tags"
          value={formData.tags}
          onChange={handleFormSubmit}
          sx={{
            backgroundColor: "#FFF",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "black",
              },
              "&:hover fieldset": {
                borderColor: "black",
              },
              "&.Mui-focused fieldset": {
                borderColor: "black",
              },
            },
            "& .MuiInputLabel-root": {
              color: "black",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "black",
            },
          }}
        />

        {/* Image Upload */}
        <Upload setFormData={setFormData} />

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
