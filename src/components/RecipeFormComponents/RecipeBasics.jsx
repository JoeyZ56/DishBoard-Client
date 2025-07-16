import { Label } from "@mui/icons-material";
import { TextField, Box, Typography } from "@mui/material";
import { inputStyle } from "../../styles/styles";
import PropTypes from "prop-types";

const RecipeBasics = ({ formData, handleRecipeChange }) => {
  return (
    <>
      {/* Recipe Name */}
      <Typography variant="h6" sx={{ mb: 1 }}>
        Recipe Name
      </Typography>
      <TextField
        label="Name"
        name="recipeName"
        variant="outlined"
        required
        fullWidth
        value={formData.recipeName}
        onChange={handleRecipeChange}
        sx={inputStyle}
      />

      {/* Two Fields in Responsive Column */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          mb: 2,
        }}
      >
        {/* Serving Size */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Serving Size
          </Typography>
          <TextField
            label="How many servings?"
            name="servingSize"
            variant="outlined"
            fullWidth
            value={formData.servingSize}
            onChange={handleRecipeChange}
            sx={inputStyle}
            required
          />
        </Box>

        {/* Estimated Time */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Estimated Time
          </Typography>
          <TextField
            label="Total time in minutes"
            name="estimatedTime"
            variant="outlined"
            fullWidth
            value={formData.estimatedTime}
            onChange={handleRecipeChange}
            sx={inputStyle}
            required
          />
        </Box>
      </Box>
    </>
  );
};

PropTypes.RecipeBasics = {
  formData: PropTypes.shape({
    recipeName: PropTypes.string.isRequired,
    servingSize: PropTypes.string.isRequired,
    estimatedTime: PropTypes.string.isRequired,
  }).isRequired,
  handleRecipeChange: PropTypes.func.isRequired,
};

export default RecipeBasics;
