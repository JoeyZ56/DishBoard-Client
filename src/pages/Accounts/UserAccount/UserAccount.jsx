import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Link,
  CircularProgress,
  Paper,
  Button,
} from "@mui/material";
import Nav from "../../../components/hamburgerMenu";
import { auth } from "../../../Firebase/firebaseClient";
import { onAuthStateChanged } from "firebase/auth";
import { buttonStyle, wrapBoxStyle } from "../../../styles/styles";

const UserAccount = () => {
  const [userRecipes, setUserRecipes] = useState([]);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = import.meta.env.VITE_API_KEY;

  const handleUpdateBio = () => {
    // Function to handle bio update logic
    // This could open a dialog or redirect to a bio update form
    console.log("Update Bio clicked");
  };

  const handleUpdateProfilePicture = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const user = auth.currentUser;
      console.log("user:", user);
      if (!user) throw new Error("Not authenticated");

      const token = await user.getIdToken();
      console.log("Token:", token);

      const formData = new FormData();
      formData.append("profilePicture", file); // matches multer field

      const res = await fetch(`${apiKey}/api/users/update/${user.uid}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to update image");
      }

      const data = await res.json();
      setProfilePicture(data.user.profilePicture); // 👈 refresh UI with new pic
      setFileName(file.name);
      console.log("Profile picture saved successfully");
    } catch (error) {
      console.error("Error saving profile picture:", error);
    }
  };

  const imageSrc =
    profilePicture?.startsWith("data:") || profilePicture?.startsWith("http")
      ? profilePicture
      : profilePicture
      ? `data:image/jpeg;base64,${profilePicture}`
      : "/assets/images/default-profile-picture.webp";

  const handleBioUpdate = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) return console.error("User not authenticated");

    try {
      const res = await fetch(`${apiKey}/api/users/update/${user.uid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bio }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to update bio");
      }

      console.log("Bio updated successfully");
      setBio(bio); // Update frontend state
    } catch (error) {
      console.error("Error updating bio:", error);
    }
  };

  useEffect(() => {
    //Wait for user authentication state to change
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLoading(true);

        try {
          const res = await fetch(`${apiKey}/api/users/${user.uid}`);
          if (!res.ok) {
            throw new Error("Failed to fetch user data");
          }

          const data = await res.json();
          // console.log("User data:", data);
          // Set user data to state variables
          setUsername(data.user.username || "Guest");
          setBio(data.bio || "Tell us about yourself!");
          setProfilePicture(data.user.profilePicture || "");
        } catch (error) {
          console.error("Error fetching user data:", error);
          setError("Failed to load user data");
        } finally {
          setLoading(false);
        }
      } else {
        setError("User not authenticated");
        setLoading(false);
      }
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  useEffect(() => {
    // Fetch user's recipes from the backend
    const fetchUserRecipes = async () => {
      setLoading(true);
      try {
        const user = auth.currentUser;
        if (!user) {
          setError("User not authenticated");
          setLoading(false);
          return;
        }
        const uid = user.uid;
        const response = await fetch(
          `${apiKey}/api/recipes/user-recipes/${uid}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user recipes");
        }
        const data = await response.json();
        setUserRecipes(data.userRecipes);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRecipes();
  }, []);

  return (
    <>
      <Nav />

      {/* Basic Information */}

      <Box textAlign="center" sx={wrapBoxStyle}>
        <Typography variant="h4" gutterBottom>
          {username ? `${username}'s Account` : "User Account"}
        </Typography>

        <Box
          component="img"
          src={imageSrc}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/assets/images/default-profile-picture.webp";
          }}
          alt="Profile"
          sx={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            objectFit: "cover",
            border: "3px solid #795548",
            boxShadow: 3,
            mt: 2,
          }}
        />

        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          id="profile-upload"
          onChange={handleUpdateProfilePicture}
        />

        <label htmlFor="profile-upload">
          <Button component="span" sx={{ ...buttonStyle, mt: 2 }}>
            Update Profile Picture
          </Button>
        </label>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {bio}
        </Typography>
        <Button onClick={handleBioUpdate} sx={buttonStyle}>
          Update Bio
        </Button>
      </Box>
      {/* Loading State */}
      {loading || !auth ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress sx={{ color: "#FFC107" }} size={80} thickness={5} />
        </Box>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          padding={2}
        >
          {/* User Recipe posts */}
          <Box sx={wrapBoxStyle}>
            <Typography variant="h5" gutterBottom textAlign={"center"}>
              My Recipes
            </Typography>
            {/* Map through user's recipes and display them */}
            {userRecipes.length === 0 ? (
              <Link
                href="/recipe-form"
                sx={{
                  display: "inline-block",
                  marginTop: 2,
                  textAlign: "center",
                  textDecoration: "none",
                  color: "#FFC107",
                  fontWeight: "bold",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Create your first recipe
              </Link>
            ) : (
              userRecipes.map((recipe) => (
                <Paper
                  component="div"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  elevation={3}
                  key={recipe.id}
                  sx={wrapBoxStyle}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    textAlign={"center"}
                    sx={{ fontWeight: "bold" }}
                  >
                    {recipe.recipeName}
                  </Typography>
                  <Paper
                    component="img"
                    src={`data:image/jpeg;base64,${recipe.image}`}
                    elevation={3}
                    sx={{
                      width: "100%",
                      maxHeight: 150,
                      maxWidth: 200,
                      objectFit: "cover",
                      borderRadius: 2,
                      mb: 4,
                    }}
                  />
                </Paper>
              ))
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default UserAccount;
