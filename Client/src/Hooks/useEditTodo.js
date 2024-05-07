import { useState } from "react";
import axios from "axios";
import useShowToast from "./useShowToast";

const useEditTodo = () => {
  const [updating, setUpdating] = useState(false);
  const showToast = useShowToast();

  const updateTodo = async (taskId, formData) => {
    setUpdating(true);
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_UPDATETODO_API}/${taskId}`,
        formData // Sending form data containing task updates and media files
      );

      setUpdating(false);
      return response.data;
    } catch (error) {
      setUpdating(false);
      showToast("Error", error.message, "error");
    }
  };
  return { updating, updateTodo, showToast };
};

export default useEditTodo;
