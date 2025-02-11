// Import necessary MUI components
import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import HamburgerMenu from "../../../components/hamburgerMenu";
import { Link } from "react-router-dom";
import { auth } from "../../../firebase/firebaseClient";
import { signInWithEmailAndPassword } from "firebase/auth";
import HandleGoogleSignup from "../../../firebase/googleSignup";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  //Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User signed in with:", userCredentials.user);
      navigate("/");
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    }
  };

  return (
    <>
      <HamburgerMenu />

      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          maxWidth: 400,
          margin: "auto",
          marginTop: "3rem",
          padding: 3,
          border: "1px solid #ccc",
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" textAlign="center" gutterBottom>
          Log In
        </Typography>

        {/* Email Field */}
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          required
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "black", // Default border color
              },
              "&:hover fieldset": {
                borderColor: "black", // Border color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "black", // Border color when focused
              },
            },
            "& .MuiInputLabel-root": {
              color: "black", // Label color
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "black", // Label color when focused
            },
          }}
        />

        {/* Password Field */}
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          required
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "black", // Default border color
              },
              "&:hover fieldset": {
                borderColor: "black", // Border color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "black", // Border color when focused
              },
            },
            "& .MuiInputLabel-root": {
              color: "black", // Label color
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "black", // Label color when focused
            },
          }}
        />

        {/* Sign Up Button */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#FFC107",
            color: "#000",
            "&:hover": { backgroundColor: "#FFB300" },
          }}
        >
          Login
        </Button>
        <Typography
          textAlign="center"
          variant="caption"
          sx={{ fontSize: "1rem", fontWeight: "bold" }}
        >
          OR
        </Typography>

        <Button
          onClick={HandleGoogleSignup}
          sx={{
            backgroundColor: "#FFC107",
            color: "#000",
            "&:hover": { backgroundColor: "#FFB300" },
          }}
        >
          <Typography
            sx={{ color: "#000", marginRight: 2, textTransform: "none" }}
          >
            Log In with Google
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#FFF",
              borderRadius: "50%",
            }}
          >
            <FcGoogle size={25} />
          </Box>
        </Button>

        {/* Already a User Button */}
        <Typography textAlign="center">
          Not apart of the community?{" "}
          <Link
            to="/signup"
            style={{
              textDecoration: "none",
              color: "#000",
              fontWeight: "bold",
            }}
          >
            Sign Up
          </Link>
        </Typography>
      </Box>
    </>
  );
};

export default Login;
