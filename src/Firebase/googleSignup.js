import { auth, googleProvider, signInWithPopup } from "./firebaseClient";
import axios from "axios";

const HandleGoogleSignup = async () => {
  try {
    // Open google pop up
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Get Firebase ID token
    const idToken = await user.getIdToken();

    const response = await axios.post(
      `${import.meta.env.VITE_API_KEY}/api/users/google-login`,
      {
        idToken,
      }
    );

    console.log("Google responded with:", response.data);
  } catch (error) {
    console.error("Google Sign-In failed:", error.message);
  }
};

export default HandleGoogleSignup;
