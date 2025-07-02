import { auth, googleProvider, signInWithPopup } from "./firebaseClient";
import axios from "axios";

const HandleGoogleSignup = async (navigate) => {
  const apiKey = import.meta.env.VITE_API_KEY;

  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const idToken = await user.getIdToken();

    const response = await axios.post(`${apiKey}/api/users/google-login`, {
      idToken,
    });

    const { message, user: dbUser } = response.data;

    //save users info to local storage
    if (dbUser) {
      const userData = {
        username: dbUser.username,
        email: dbUser.email,
        uid: dbUser.uid,
      };
      localStorage.setItem("auth", JSON.stringify(userData));
    }

    if (message === "User already exists!") {
      navigate("/"); // Send to home if they already exist
    } else {
      navigate("/username"); // Send to username creation if they’re new
    }

    console.log("Google responded with:", response.data);
  } catch (error) {
    console.error("Google Sign-In failed:", error.message);
  }
};

export default HandleGoogleSignup;
