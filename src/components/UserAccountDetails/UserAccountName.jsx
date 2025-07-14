import { useState, useEffect } from "react";
import { auth } from "../../Firebase/firebaseClient";
import { onAuthStateChanged } from "firebase/auth";
import {
  Box,
  Typography,
  Link,
  CircularProgress,
  Paper,
  Button,
} from "@mui/material";
import { buttonStyle, wrapBoxStyle } from "../../styles/styles";

const UserAccountName = () => {
  //State
  const [username, setUsername] = useState("");

  //Globals
  const apiKey = import.meta.env.VITE_API_KEY;

  //Fetch Username
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const res = await fetch(`${apiKey}/api/users/${user.uid}`);
          const data = await res.json();

          setUsername(data.user.username || "Guest");
        } catch (error) {
          console.error("Failed to fetch username", error.message);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Typography variant="h4" gutterBottom>
        {username ? `${username}'s Account` : "User Account"}
      </Typography>
    </Box>
  );
};

export default UserAccountName;
