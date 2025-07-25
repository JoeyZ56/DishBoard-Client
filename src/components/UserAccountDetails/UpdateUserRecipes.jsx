import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase/firebaseClient";
import { Box, Button } from "@mui/material";
import { buttonStyle } from "../../styles/styles";

const UpdateUserRecipes = ({ recipe, onDelete }) => {
  const navigate = useNavigate();

  const apiKey = import.meta.env.VITE_API_KEY;

  const handleEditClick = () => {
    navigate(`/recipe-form/${recipe._id}`, {
      state: { recipe },
    });
  };

  const handleDeleteRecipe = async (id) => {
    const user = auth.currentUser;

    if (!user) {
      alert("You must be logged in to delete a recipe.");
      return;
    }

    const token = await user.getIdToken();

    try {
      const res = await fetch(`${apiKey}/api/recipes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete recipe");
      }

      const data = await res.json();
      console.log("Recipe deleted:", data);
      alert("Recipe deleted successfully.");
    } catch (error) {
      console.error("Error deleting recipe:", error.message);
      alert("An error occurred while deleting the recipe.");
    } finally {
      if (onDelete) onDelete();
    }
  };
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Button onClick={handleEditClick} sx={buttonStyle}>
        Edit
      </Button>
      <Button onClick={() => handleDeleteRecipe(recipe._id)} sx={buttonStyle}>
        Delete
      </Button>
    </Box>
  );
};

export default UpdateUserRecipes;
