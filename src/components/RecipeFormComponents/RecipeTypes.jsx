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

const RecipeTypes = ({ formData, handleRecipeChange }) => {
  return (
    <>
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
        <MenuItem value="Sauces">Sauce</MenuItem>
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

      {/* Difficulty Level */}
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
    </>
  );
};

export default RecipeTypes;
