import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { buttonStyle } from "../../styles/styles";

const UpdateUserRecipes = ({ recipe }) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/recipe-form/${recipe._id}`, {
      state: { recipe },
    });
  };

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Button onClick={handleEditClick} sx={buttonStyle}>
        Edit
      </Button>
      <Button sx={buttonStyle}>Delete</Button>
    </Box>
  );
};

export default UpdateUserRecipes;
