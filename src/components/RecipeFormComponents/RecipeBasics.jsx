import { TextField, Box, Typography } from "@mui/material";

const RecipeBasics = ({ formData, handleRecipeChange }) => {
  return (
    <>
      {/* Recipe Name Field */}
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
      />

      {/* Labels */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <Typography variant="h6">Serving Size</Typography>
        <Typography variant="h6">Estimated Time</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
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
    </>
  );
};

export default RecipeBasics;
