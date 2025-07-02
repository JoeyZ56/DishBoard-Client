// Import necessary MUI components
import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import HamburgerMenu from "../../../components/hamburgerMenu";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { wrapBoxStyle, buttonStyle, inputStyle } from "../../../styles/styles";

const Username = () => {
  const [username, setUserName] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const apiURL = import.meta.env.VITE_API_KEY;

  //Handle Login
  const handUsername = async (e) => {
    e.preventDefault();

    const auth = getAuth();
    const user = auth.currentUser;

    if (!username.trim()) {
      return setError("Username cannot be empty");
    }

    if (!user) {
      setError("User not authenticated. Please log in.");
      return;
    }

    const uid = user?.uid;

    try {
      // console.log("API URL:", apiURL);
      // console.log("UID:", uid);
      // console.log("Final URL:", `${apiURL}/api/users/${uid}`);

      const res = await fetch(`${apiURL}/api/users/${uid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to create username");
      }

      const currentAuth = JSON.parse(localStorage.getItem("auth"));
      localStorage.setItem(
        "auth",
        JSON.stringify({
          ...currentAuth,
          username: username,
        })
      );

      navigate("/");
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    }
  };

  return (
    <>
      <HamburgerMenu />

      <Box component="form" onSubmit={handUsername} sx={wrapBoxStyle}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Create Username
        </Typography>

        {/* Email Field */}
        <TextField
          label="Username"
          type="username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          variant="outlined"
          required
          fullWidth
          sx={inputStyle}
        />
        {/* Error Message */}
        {error && (
          <Typography color="error" variant="body2" textAlign="center">
            {error}
          </Typography>
        )}

        <Button variant="contained" type="submit" sx={buttonStyle}>
          Create
        </Button>
      </Box>
    </>
  );
};

export default Username;
