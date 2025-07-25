import {
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { inputStyle } from "../../styles/styles";

const IngredientFields = ({
  ingredientsList,
  handleIngredientsChange,
  setFormData,
  addIngredient,
  removeIngredient,
  formError,
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
      <Typography variant="h6" sx={{ mb: 2 }}>
        Ingredients
      </Typography>

      {ingredientsList.map((ingredient, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            flexDirection: { xs: "row", sm: "row" },
            gap: 2,
            mb: 3,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {/* Ingredient Name */}
          <TextField
            label="Ingredient"
            name="name"
            value={ingredient.name}
            onChange={(e) => handleIngredientsChange(index, e)}
            fullWidth
            sx={inputStyle}
            required
            error={!!formError[`ingredient-${index}-name`]}
            helperText={formError[`ingredient-${index}-name`]}
          />

          {/* Quantity */}
          {ingredient.customQuantity ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <TextField
                label="Custom Quantity"
                name="quantity"
                value={ingredient.quantity}
                onChange={(e) => handleIngredientsChange(index, e)}
                sx={{ ...inputStyle, width: 100 }}
              />
              <IconButton
                size="small"
                onClick={() => {
                  const updated = [...ingredientsList];
                  updated[index].customQuantity = false;
                  updated[index].quantity = "";
                  setFormData((prev) => ({
                    ...prev,
                    ingredientsList: updated,
                  }));
                }}
              >
                ❌
              </IconButton>
            </Box>
          ) : (
            <TextField
              select
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
              required
              sx={{ ...inputStyle, width: 100 }}
              error={!!formError[`ingredient-${index}-quantity`]}
              helperText={formError[`ingredient-${index}-quantity`]}
            >
              {quantityOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          )}

          {/* Unit */}
          {ingredient.customUnit ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <TextField
                label="Custom Unit"
                name="unit"
                value={ingredient.unit}
                onChange={(e) => handleIngredientsChange(index, e)}
                sx={{ ...inputStyle, width: 100 }}
              />
              <IconButton
                size="small"
                onClick={() => {
                  const updated = [...ingredientsList];
                  updated[index].customUnit = false;
                  updated[index].unit = "";
                  setFormData((prev) => ({
                    ...prev,
                    ingredientsList: updated,
                  }));
                }}
              >
                ❌
              </IconButton>
            </Box>
          ) : (
            <TextField
              select
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
              sx={{ ...inputStyle, width: 100 }}
            >
              {unitOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          )}

          {/* Delete Ingredient */}
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
