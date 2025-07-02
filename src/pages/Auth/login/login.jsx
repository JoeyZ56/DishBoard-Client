// Import necessary MUI components
import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import Nav from "../../../components/hamburgerMenu";
import { Link } from "react-router-dom";
import { auth } from "../../../Firebase/firebaseClient";
import { signInWithEmailAndPassword } from "firebase/auth";
import HandleGoogleSignup from "../../../Firebase/googleSignup";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { authStyle, buttonStyle, wrapBoxStyle } from "../../../styles/styles";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  //Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const firebaseUser = userCredentials.user;

      //Fetch user from the backend using the Firebase UID
      const res = await fetch(
        `${import.meta.env.VITE_API_KEY}/api/users/${firebaseUser.uid}`
      );
      const data = await res.json();
      console.log("User Data from Backend:", data);

      const userData = {
        username: data.user.username,
        email: data.user.email,
        uid: data.user.uid,
      };
      console.log("User Data:", userData);

      localStorage.setItem("auth", JSON.stringify(userData));

      navigate("/");
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Nav />

      <Box component="form" onSubmit={handleLogin} sx={wrapBoxStyle}>
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
          sx={authStyle}
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
          sx={authStyle}
        />

        {/* Login Up Button */}
        <Button type="submit" variant="contained" fullWidth sx={buttonStyle}>
          {loading ? (
            <CircularProgress size={24} sx={{ color: "#000" }} />
          ) : (
            <Typography sx={{ color: "#000", textTransform: "none" }}>
              Log In
            </Typography>
          )}
        </Button>
        <Typography
          textAlign="center"
          variant="caption"
          sx={{ fontSize: "1rem", fontWeight: "bold" }}
        >
          OR
        </Typography>

        <Button onClick={() => HandleGoogleSignup(navigate)} sx={buttonStyle}>
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
