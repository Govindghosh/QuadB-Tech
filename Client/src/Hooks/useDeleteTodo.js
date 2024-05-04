import { useState } from "react";
import axios from "axios";
import useShowToast from "./useShowToast";

const useDeleteTodo = () => {
  const [deleting, setDeleting] = useState(false);
  const showToast = useShowToast();

  const deleteTodo = async (taskId) => {
    setDeleting(true);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_DELETETODO_API}/${taskId}`
      );

      setDeleting(false);
      return response.data;
    } catch (error) {
      setDeleting(false);
      showToast("Error", error.message, "error");
    }
  };

  return { deleting, showToast, deleteTodo };
};

export default useDeleteTodo;
