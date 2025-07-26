// CategoryButtons.jsx
import { Box, Button } from "@mui/material";

const CategoryButtons = ({
  buttons = [],
  selectedCategory,
  onCategorySelect,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 2,
        marginTop: 2,
        padding: 2,
        flexWrap: "wrap", // optional for responsiveness
      }}
    >
      {buttons.map(({ label }, index) => (
        <Button
          key={index}
          onClick={() => onCategorySelect(label)}
          color="primary"
          sx={{
            borderRadius: 2,
            backgroundColor: label === selectedCategory ? "#FFC107" : "#FFF3E0",
            color: "black",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor:
                label === selectedCategory ? "#FFB74D" : "#FFE0B2",
            },
          }}
        >
          {label}
        </Button>
      ))}
    </Box>
  );
};

export default CategoryButtons;
