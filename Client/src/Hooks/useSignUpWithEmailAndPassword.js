import { useState } from "react";
import axios from "axios";
import useShowToast from "./useShowToast";

const useSignUpWithEmailAndPassword = () => {
  const [loading, setLoading] = useState(false);
  const showToast = useShowToast();

  const signup = async (formData) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        formData
      );
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
