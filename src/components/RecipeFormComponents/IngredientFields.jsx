import {
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";

const IngredientFields = ({
  ingredientsList,
  handleIngredientsChange,
  setFormData,
  addIngredient,
  removeIngredient,
}) => {
  //Custom data for quantity, units, and tags
  const quantityOptions = [
    "1/4",
    "1/3",
    "1/2",
    "2/3",
    "1",
    "2",
    "3",
    "4",
    "Custom Quantity",
  ];

  const unitOptions = [
    "Tbsp",
    "Tsp",
    "Cup",
    "Gram",
    "mL",
    "oz",
    "lb",
    "Custom Unit",
  ];

  return (
    <>
      {/* Ingredients Fields */}
      <Typography variant="h6" sx={{ mb: 1 }}>
        Ingredients
      </Typography>
      {ingredientsList.map((ingredient, index) => (
        <Box
          key={index}
          sx={{ display: "flex", alignItems: "center", gap: 2, m: 2 }}
        >
          <TextField
            label="Ingredient Name"
            name="name"
            value={ingredient.name}
            onChange={(e) => handleIngredientsChange(index, e)}
            fullWidth
            sx={{
              width: "50%",
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
          {ingredient.customQuantity ? (
            <>
              <TextField
                label="Custom Quantity"
                name="quantity"
                value={ingredient.quantity}
                onChange={(e) => handleIngredientsChange(index, e)}
                sx={{
                  width: 100,
                  backgroundColor: "#FFF",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "black" },
                    "&:hover fieldset": { borderColor: "black" },
                    "&.Mui-focused fieldset": { borderColor: "black" },
                  },
                  "& .MuiInputLabel-root": { color: "black" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "black" },
                }}
              />
              <IconButton
                size="small"
                onClick={() => {
                  const updated = [...ingredientsList];
                  updated[index].customQuantity = false;
                  updated[index].quantity = ""; // clears the input field
                  setFormData((prev) => ({
                    ...prev,
                    ingredientsList: updated,
                  }));
                }}
                sx={{ ml: -2 }}
              >
                ❌
              </IconButton>
            </>
          ) : (
            <TextField
              select={!ingredient.customQuantity}
              label="Quantity"
              name="quantity"
              value={ingredient.quantity}
              onChange={(e) => {
                const value = e.target.value;
                const updated = [...ingredientsList];
                if (value === "Custom Quantity") {
                  updated[index].customQuantity = true;
                  updated[index].quantity = "";
                } else {
                  updated[index].quantity = value;
                }
                setFormData((prev) => ({ ...prev, ingredientsList: updated }));
              }}
              sx={{
                width: 100,
                backgroundColor: "#FFF",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "black" },
                  "&:hover fieldset": { borderColor: "black" },
                  "&.Mui-focused fieldset": { borderColor: "black" },
                },
                "& .MuiInputLabel-root": { color: "black" },
                "& .MuiInputLabel-root.Mui-focused": { color: "black" },
              }}
            >
              {quantityOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          )}

          {ingredient.customUnit ? (
            <>
              <TextField
                label="Custom Unit"
                name="unit"
                value={ingredient.unit}
                onChange={(e) => handleIngredientsChange(index, e)}
                sx={{
                  width: 100,
                  backgroundColor: "#FFF",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "black" },
                    "&:hover fieldset": { borderColor: "black" },
                    "&.Mui-focused fieldset": { borderColor: "black" },
                  },
                  "& .MuiInputLabel-root": { color: "black" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "black" },
                }}
              />
              <IconButton
                size="small"
                onClick={() => {
                  const updated = [...ingredientsList];
                  updated[index].customUnit = false;
                  updated[index].unit = ""; // clears the input field
                  setFormData((prev) => ({
                    ...prev,
                    ingredientsList: updated,
                  }));
                }}
                sx={{ ml: -2 }}
              >
                ❌
              </IconButton>
            </>
          ) : (
            <TextField
              select={!ingredient.customUnit}
              label="Unit"
              name="unit"
              value={ingredient.unit}
              onChange={(e) => {
                const value = e.target.value;
                const updated = [...ingredientsList];
                if (value === "Custom Unit") {
                  updated[index].customUnit = true;
                  updated[index].unit = "";
                } else {
                  updated[index].unit = value;
                }
                setFormData((prev) => ({ ...prev, ingredientsList: updated }));
              }}
              sx={{
                width: 100,
                backgroundColor: "#FFF",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "black" },
                  "&:hover fieldset": { borderColor: "black" },
                  "&.Mui-focused fieldset": { borderColor: "black" },
                },
                "& .MuiInputLabel-root": { color: "black" },
                "& .MuiInputLabel-root.Mui-focused": { color: "black" },
              }}
            >
              {unitOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          )}

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
          mt: 2,
          backgroundColor: "#FFC107",
          color: "#000",
          "&:hover": { backgroundColor: "#FFB300" },
        }}
      >
        Add Ingredient
      </Button>
    </>
  );
};

export default IngredientFields;
