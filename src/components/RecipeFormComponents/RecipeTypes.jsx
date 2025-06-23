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
      <Typography variant="h6" sx={{ mb: 1 }}>
        Course Type
      </Typography>
      <TextField
        select
        label="Select Course Type"
        name="courseType"
        value={formData.courseType}
        onChange={handleRecipeChange}
        fullWidth
        sx={{
          mb: 2,
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
        <MenuItem
          value="select"
          sx={{
            "&.Mui-selected": {
              backgroundColor: "#EFEBE9   !important", // override default blue
              color: "#000",
            },
            "&.Mui-selected:hover": {
              backgroundColor: "#FFB300",
            },
            "&:hover": {
              backgroundColor: "#FFC107",
            },
          }}
        >
          Select
        </MenuItem>
        <MenuItem
          value="Breakfast"
          sx={{
            "&.Mui-selected": {
              backgroundColor: "#EFEBE9   !important", // override default blue
              color: "#000",
            },
            "&.Mui-selected:hover": {
              backgroundColor: "#FFB300",
            },
            "&:hover": {
              backgroundColor: "#FFC107",
            },
          }}
        >
          Breakfast
        </MenuItem>
        <MenuItem
          value="Lunch"
          sx={{
            "&.Mui-selected": {
              backgroundColor: "#EFEBE9   !important", // override default blue
              color: "#000",
            },
            "&.Mui-selected:hover": {
              backgroundColor: "#FFB300",
            },
            "&:hover": {
              backgroundColor: "#FFC107",
            },
          }}
        >
          Lunch
        </MenuItem>
        <MenuItem
          value="Dinner"
          sx={{
            "&.Mui-selected": {
              backgroundColor: "#EFEBE9   !important", // override default blue
              color: "#000",
            },
            "&.Mui-selected:hover": {
              backgroundColor: "#FFB300",
            },
            "&:hover": {
              backgroundColor: "#FFC107",
            },
          }}
        >
          Dinner
        </MenuItem>
        <MenuItem
          value="Dessert"
          sx={{
            "&.Mui-selected": {
              backgroundColor: "#EFEBE9   !important", // override default blue
              color: "#000",
            },
            "&.Mui-selected:hover": {
              backgroundColor: "#FFB300",
            },
            "&:hover": {
              backgroundColor: "#FFC107",
            },
          }}
        >
          Dessert
        </MenuItem>
        <MenuItem
          value="Appetizer"
          sx={{
            "&.Mui-selected": {
              backgroundColor: "#EFEBE9   !important", // override default blue
              color: "#000",
            },
            "&.Mui-selected:hover": {
              backgroundColor: "#FFB300",
            },
            "&:hover": {
              backgroundColor: "#FFC107",
            },
          }}
        >
          Appetizer
        </MenuItem>
        <MenuItem
          value="Side-Dish"
          sx={{
            "&.Mui-selected": {
              backgroundColor: "#EFEBE9   !important", // override default blue
              color: "#000",
            },
            "&.Mui-selected:hover": {
              backgroundColor: "#FFB300",
            },
            "&:hover": {
              backgroundColor: "#FFC107",
            },
          }}
        >
          Side Dish
        </MenuItem>
        <MenuItem
          value="Sauces"
          sx={{
            "&.Mui-selected": {
              backgroundColor: "#EFEBE9   !important", // override default blue
              color: "#000",
            },
            "&.Mui-selected:hover": {
              backgroundColor: "#FFB300",
            },
            "&:hover": {
              backgroundColor: "#FFC107",
            },
          }}
        >
          Sauce
        </MenuItem>
      </TextField>

      {/* Cuisine Type */}
      <Typography variant="h6" sx={{ mb: 1 }}>
        Cuisine Type
      </Typography>
      <TextField
        select
        label="Select Cuisine Type"
        name="cuisineType"
        value={formData.cuisineType}
        onChange={handleRecipeChange}
        fullWidth
        sx={{
          mb: 2,
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
        <MenuItem
          value="select"
          sx={{
            "&.Mui-selected": {
              backgroundColor: "#EFEBE9   !important", // override default blue
              color: "#000",
            },
            "&.Mui-selected:hover": {
              backgroundColor: "#FFB300",
            },
            "&:hover": {
              backgroundColor: "#FFC107",
            },
          }}
        >
          Select
        </MenuItem>
        <MenuItem
          value="American"
          sx={{
            "&.Mui-selected": {
              backgroundColor: "#EFEBE9   !important", // override default blue
              color: "#000",
            },
            "&.Mui-selected:hover": {
              backgroundColor: "#FFB300",
            },
            "&:hover": {
              backgroundColor: "#FFC107",
            },
          }}
        >
          American
        </MenuItem>
        <MenuItem
          value="Mexican"
          sx={{
            "&.Mui-selected": {
              backgroundColor: "#EFEBE9   !important", // override default blue
              color: "#000",
            },
            "&.Mui-selected:hover": {
              backgroundColor: "#FFB300",
            },
            "&:hover": {
              backgroundColor: "#FFC107",
            },
          }}
        >
          Mexican
        </MenuItem>
        <MenuItem
          value="Italian"
          sx={{
            "&.Mui-selected": {
              backgroundColor: "#EFEBE9   !important", // override default blue
              color: "#000",
            },
            "&.Mui-selected:hover": {
              backgroundColor: "#FFB300",
            },
            "&:hover": {
              backgroundColor: "#FFC107",
            },
          }}
        >
          Italian
        </MenuItem>
        <MenuItem
          value="Asian"
          sx={{
            "&.Mui-selected": {
              backgroundColor: "#EFEBE9   !important", // override default blue
              color: "#000",
            },
            "&.Mui-selected:hover": {
              backgroundColor: "#FFB300",
            },
            "&:hover": {
              backgroundColor: "#FFC107",
            },
          }}
        >
          Asian
        </MenuItem>
        <MenuItem
          value="Other"
          sx={{
            "&.Mui-selected": {
              backgroundColor: "#EFEBE9   !important", // override default blue
              color: "#000",
            },
            "&.Mui-selected:hover": {
              backgroundColor: "#FFB300",
            },
            "&:hover": {
              backgroundColor: "#FFC107",
            },
          }}
        >
          Other
        </MenuItem>
      </TextField>

      {/* Difficulty Level */}
      <Typography variant="h6" sx={{ mb: 1 }}>
        Difficulty
      </Typography>
      <TextField
        select
        label="Select Difficulty"
        name="difficultyLevel"
        value={formData.difficultyLevel}
        onChange={handleRecipeChange}
        fullWidth
        sx={{
          mb: 2,
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
        <MenuItem
          value="select"
          sx={{
            "&.Mui-selected": {
              backgroundColor: "#EFEBE9   !important", // override default blue
              color: "#000",
            },
            "&.Mui-selected:hover": {
              backgroundColor: "#FFB300",
            },
            "&:hover": {
              backgroundColor: "#FFC107",
            },
          }}
        >
          Select
        </MenuItem>
        <MenuItem
          value="Easy"
          sx={{
            "&.Mui-selected": {
              backgroundColor: "#EFEBE9   !important", // override default blue
              color: "#000",
            },
            "&.Mui-selected:hover": {
              backgroundColor: "#FFB300",
            },
            "&:hover": {
              backgroundColor: "#FFC107",
            },
          }}
        >
          Easy
        </MenuItem>
        <MenuItem
          value="Medium"
          sx={{
            "&.Mui-selected": {
              backgroundColor: "#EFEBE9   !important", // override default blue
              color: "#000",
            },
            "&.Mui-selected:hover": {
              backgroundColor: "#FFB300",
            },
            "&:hover": {
              backgroundColor: "#FFC107",
            },
          }}
        >
          Medium
        </MenuItem>
        <MenuItem
          value="Hard"
          sx={{
            "&.Mui-selected": {
              backgroundColor: "#EFEBE9   !important", // override default blue
              color: "#000",
            },
            "&.Mui-selected:hover": {
              backgroundColor: "#FFB300",
            },
            "&:hover": {
              backgroundColor: "#FFC107",
            },
          }}
        >
          Hard
        </MenuItem>
      </TextField>
    </>
  );
};

export default RecipeTypes;
