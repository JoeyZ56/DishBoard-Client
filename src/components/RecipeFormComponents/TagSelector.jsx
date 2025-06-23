import {
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import PropTypes from "prop-types";

const TagSelector = ({
  tags,
  handleAddTag,
  handleRemoveTag,
  customTagInput,
  setCustomTagInput,
  customTagMode,
  setCustomTagMode,
}) => {
  const tagOptions = [
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Keto",
    "Low Carb",
    "High Protein",
    "Dairy-Free",
  ];

  return (
    <>
      {/* Tags */}
      <Typography variant="h6" sx={{ mb: 1 }}>
        Tags
      </Typography>

      {customTagMode ? (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <TextField
            label="Custom Tag"
            value={customTagInput}
            onChange={(e) => setCustomTagInput(e.target.value)}
            sx={{ backgroundColor: "#FFF", flex: 1 }}
          />
          <IconButton
            onClick={() => {
              if (customTagInput.trim()) {
                handleAddTag(customTagInput.trim());
                setCustomTagInput("");
                setCustomTagMode(false);
              }
            }}
          >
            <Add />
          </IconButton>
          <IconButton onClick={() => setCustomTagMode(false)}>❌</IconButton>
        </Box>
      ) : (
        <TextField
          select
          label="Select Tag"
          value=""
          onChange={(e) => {
            const val = e.target.value;
            if (val === "Custom Tag") {
              setCustomTagMode(true);
            } else {
              handleAddTag(val);
            }
          }}
          sx={{
            width: "30%",
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
          {tagOptions.map((tag) => (
            <MenuItem
              key={tag}
              value={tag}
              sx={{
                "&:hover": {
                  backgroundColor: "#FFC107",
                },
              }}
            >
              {tag}
            </MenuItem>
          ))}
          <MenuItem
            value="Custom Tag"
            sx={{
              "&:hover": {
                backgroundColor: "#FFC107",
              },
            }}
          >
            Custom Tag
          </MenuItem>
        </TextField>
      )}

      {/* Display selected tags */}

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
        {tags.map((tag, i) => (
          <Button
            key={i}
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => handleRemoveTag(tag)}
            endIcon={<Delete />}
            sx={{
              textTransform: "none",
              color: "#795548",
              borderColor: "#795548",
              "&:hover": {
                backgroundColor: "#FFC107",
                borderColor: "#795548",
              },
            }}
          >
            {tag}
          </Button>
        ))}
      </Box>
    </>
  );
};

//Prop validation: to document and enforce the types of props a component should receive
export default TagSelector;

TagSelector.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleAddTag: PropTypes.func.isRequired,
  handleRemoveTag: PropTypes.func.isRequired,
  customTagInput: PropTypes.string.isRequired,
  setCustomTagInput: PropTypes.func.isRequired,
  customTagMode: PropTypes.bool.isRequired,
  setCustomTagMode: PropTypes.func.isRequired,
};
