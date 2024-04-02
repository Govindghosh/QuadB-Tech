import { useState } from "react";
import { useDispatch } from "react-redux";
import { login as loginSlice } from "../store/authSlice";
import useShowToast from "./useShowToast";
import axios from "axios";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const showToast = useShowToast();
  const dispatch = useDispatch();

  const login = async (formData) => {
    setLoading(true);
    try {
      const response = await axios.post(
        import.meta.env.VITE_LOGIN_API,
        formData
      );
      console.log(
        `my db is ${response.data.data.user._id} and my name is ${response.data.data.user.fullName} last username is ${response.data.data.user.username}`
      );
      dispatch(loginSlice(response.data));
      return response.data;
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};

export default useLogin;