import { useState } from "react";
import axios from "axios";
import useShowToast from "./useShowToast";

const useAddTodo = () => {
  const [adding, setAdding] = useState(false);
  const showToast = useShowToast();
  const addTodo = async (todoData) => {
    setAdding(true);
    try {
      const formData = new FormData();
      formData.append("title", todoData.title);
      formData.append("description", todoData.description);
      formData.append("completed", todoData.completed);
      if (todoData.media) {
        formData.append("media", todoData.media);
      }

      const response = await axios.post(
        import.meta.env.VITE_ADDTODO_API,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setAdding(false);
      return response.data;
    } catch (error) {
      setAdding(false);
      showToast("Error", error.message, "error");
    }
  };

  return { adding, showToast, addTodo };
};

export default useAddTodo;
