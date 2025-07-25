import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Link,
  CircularProgress,
  Paper,
  Button,
} from "@mui/material";
import { wrapBoxStyle } from "../../../styles/styles";
import Nav from "../../../components/hamburgerMenu";
import UserAccountName from "../../../components/UserAccountDetails/UserAccountName";
import UserProfilePicture from "../../../components/UserAccountDetails/UserProfilePicture";
import UserBio from "../../../components/UserAccountDetails/UserBio";
import UserRecipes from "../../../components/UserAccountDetails/UserRecipes";

const UserAccount = () => {
  return (
    <Box sx={{ bgcolor: "#795548" }}>
      <Nav />

      {/* Basic Information */}
      <Box sx={wrapBoxStyle}>
        <UserAccountName />
        <UserProfilePicture />
        <UserBio />
      </Box>
      {/* User Recipes */}
      <Box sx={wrapBoxStyle}>
        <UserRecipes />
      </Box>
    </Box>
  );
};

export default UserAccount;
