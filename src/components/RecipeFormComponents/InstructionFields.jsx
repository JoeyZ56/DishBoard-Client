import { TextField, Button, Box, Typography, IconButton } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { inputStyle } from "../../styles/styles";

const InstructionFields = ({
  instructions,
  handleInstructionChange,
  addInstruction,
  removeInstruction,
}) => {
  return (
    <>
      {/* Instructions Field */}
      <Typography variant="h6" sx={{ mb: 1 }}>
        Instructions
      </Typography>
      {instructions.map((step, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 2,
          }}
        >
          <TextField
            label={`Step ${index + 1}`}
            value={step}
            onChange={(e) => handleInstructionChange(index, e)}
            fullWidth
            multiline
            rows={2}
            sx={inputStyle}
            required
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
    </>
  );
};

export default InstructionFields;
