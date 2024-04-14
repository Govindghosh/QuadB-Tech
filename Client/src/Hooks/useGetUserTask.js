import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import axios from "axios";

const useGetUserTask = (authToken) => {
  const [isLoading, setLoading] = useState(false);
  const showToast = useShowToast();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchUserTasks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(import.meta.env.VITE_GETUSERTASK_API);
        setTodos(response.data.data);
        setLoading(false);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchUserTasks();
  }, [authToken, showToast]);

  return { isLoading, todos };
};

export default useGetUserTask;
