// Import necessary MUI components
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { auth } from "../../../Firebase/firebaseClient";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from "../../../components/hamburgerMenu";
import HandleGoogleSignup from "../../../Firebase/googleSignup";
import { FcGoogle } from "react-icons/fc";
import { authStyle, buttonStyle, wrapBoxStyle } from "../../../styles/styles";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  //Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    //Basic password validation
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      //create user with email and password
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const { user } = userCredentials;

      //sending data to database
      await axios.post(`${import.meta.env.VITE_API_KEY}/api/users`, {
        uid: user.uid,
        username,
        email,
        password,
      });

      //Fetch user from the backend
      const res = await fetch(
        `${import.meta.env.VITE_API_KEY}/api/users/${user.uid}`
      );
      const data = await res.json();
      console.log("User Data from Backend:", data);

      //storing user data in localStorage
      const userData = {
        username: data.user.username,
        email: data.user.email,
        uid: data.user.uid,
      };
      console.log("User Data:", userData);

      localStorage.setItem("auth", JSON.stringify(userData));

      navigate("/");
    } catch (error) {
      setError(error.message);
      //Logs
      console.log("signup error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Nav />

      <Box component="form" onSubmit={handleSubmit} sx={wrapBoxStyle}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Join The Community!
        </Typography>

        {/* Error Message */}
        {error && <Alert severity="error">{error}</Alert>}

        {/* Username Field */}
        <TextField
          label="Username"
          type="username"
          variant="outlined"
          required
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={authStyle}
        />

        {/* Email Field */}
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          required
          fullWidth
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          sx={authStyle}
        />

        {/* Password Field */}
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          required
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={authStyle}
        />
        {/* Confirm Password */}
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          required
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={authStyle}
        />

        {/* Sign Up Button */}

        <Button type="submit" variant="contained" fullWidth sx={buttonStyle}>
          {loading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
        </Button>

        <Typography
          textAlign="center"
          variant="caption"
          sx={{ fontSize: "1rem", fontWeight: "bold" }}
        >
          or
        </Typography>

        <Button onClick={() => HandleGoogleSignup(navigate)} sx={buttonStyle}>
          <Typography
            sx={{ color: "#000", marginRight: 2, textTransform: "none" }}
          >
            Sign Up with Google
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
          Already a User?{" "}
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              color: "#000",
              fontWeight: "bold",
            }}
          >
            Login
          </Link>
        </Typography>
      </Box>
    </>
  );
};

export default Register;
