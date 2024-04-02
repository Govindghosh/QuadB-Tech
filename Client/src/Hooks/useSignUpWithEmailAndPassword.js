import { useState } from "react";
import axios from "axios";
import useShowToast from "./useShowToast";

const useSignUpWithEmailAndPassword = () => {
  const [loading, setLoading] = useState(false);
  const showToast = useShowToast();

  const signup = async (formData) => {
    setLoading(true);

    // Check if the email contains '@'
    if (!formData.email.includes("@")) {
      showToast("Error", "Invalid email format", "error");
      setLoading(false);
      return; // Stop execution if email format is invalid
    }

    // Check if the password is at least 8 characters long
    if (formData.password.length < 8) {
      showToast("Error", "Password must be at least 8 characters", "error");
      setLoading(false);
      return; // Stop execution if password is too short
    }

    try {
      const response = await axios.post(
        import.meta.env.VITE_REGISTER_API,
        formData
      );

      console.log("response :---", response);

      return response.data; // Assuming your server returns user data upon successful signup
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignUpWithEmailAndPassword;
