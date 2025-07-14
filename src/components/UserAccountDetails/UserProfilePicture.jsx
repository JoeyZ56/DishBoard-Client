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

const UserProfilePicture = () => {
  //State
  const [profilePicture, setProfilePicture] = useState("");
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState(false);

  //Globals
  const apiKey = import.meta.env.VITE_API_KEY;

  //Handle logic
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
          Authorization: `Bearer ${token}`, // Includes the token in the request headers
        },
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to update image");
      }

      const data = await res.json();
      setProfilePicture(data.user.profilePicture);
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

  useEffect(() => {
    //Wait for user authentication state to change
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        const res = await fetch(`${apiKey}/api/users/${user.uid}`);
        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await res.json();
        setProfilePicture(data.user.profilePicture || "");
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load user data");
      }
    });
    return () => unsubscribe(`${apiKey}/api/recipes/`); // Cleanup subscription on unmount
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
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
    </Box>
  );
};

export default UserProfilePicture;
