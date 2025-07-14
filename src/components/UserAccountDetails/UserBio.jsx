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

const UserBio = () => {
  //State
  const [fetchBio, setFetchBio] = useState("");
  const [editBio, setEditBio] = useState("");
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [error, setError] = useState(false);

  //Globals
  const apiKey = import.meta.env.VITE_API_KEY;

  //Word Limit
  const validateWordCount = (words) => {
    const wordLimit = 200;
    return words.trim().split(/\s+/).length <= wordLimit;
  };

  //Handlers
  const handleUpdateBio = async (bio) => {
    if (bio.trim() === "") {
      setEditBio(!null);
      return;
    }

    if (!validateWordCount(bio)) {
      setError("Bio must be 200 words or less");
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Not authenticated");

      const token = await user.getIdToken();

      const res = await fetch(`${apiKey}/api/users/update/${user.uid}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bio }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to update bio");
      }

      const data = await res.json();
      setFetchBio(data.user.bio);
      console.log("Bio updated successfully");
    } catch (error) {
      console.error("Failed to update Bio", error.message);
    }
  };

  //UseEffect
  useEffect(() => {
    //Wait for user authentication state to change
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const res = await fetch(`${apiKey}/api/users/${user.uid}`);
          if (!res.ok) {
            throw new Error("Failed to fetch user data");
          }

          const data = await res.json();
          // console.log("User data:", data);
          // Set user data to state variables

          setFetchBio(data.user.bio || "Tell us about yourself!");
        } catch (error) {
          console.error("Error fetching user data:", error);
          setError("Failed to load user data");
        }
      } else {
        setError("User not authenticated");
      }
    });
    return () => unsubscribe();
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
      <Paper sx={{ ...wrapBoxStyle, mb: 2 }}>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {fetchBio}
        </Typography>
      </Paper>
      {isEditingBio ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            flexDirection: "column",
          }}
        >
          <textarea
            type="text"
            value={editBio}
            onChange={(e) => setEditBio(e.target.value)}
            rows={4}
            cols={50}
          />
          <Button
            onClick={() => {
              handleUpdateBio(editBio), setIsEditingBio(false);
            }}
            sx={{ ...buttonStyle, mb: 2, mt: 2 }}
          >
            Update Bio
          </Button>
          <Button onClick={() => setIsEditingBio(false)} sx={buttonStyle}>
            Cancel
          </Button>
          {error && <Typography>{error}</Typography>}
        </Box>
      ) : (
        <Button
          onClick={() => {
            setEditBio(fetchBio);
            setIsEditingBio(true);
          }}
          sx={buttonStyle}
        >
          Set Bio
        </Button>
      )}
    </Box>
  );
};

export default UserBio;
