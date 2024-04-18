import axios from "axios";
import { useState } from "react";
import useShowToast from "./useShowToast";
import { useEffect } from "react";

const useGetCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const showToast = useShowToast();
  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          import.meta.env.VITE_GETCURRENTUSER_API
        );
        setCurrentUser(response.data);
        setIsLoading(false);
      } catch (error) {
        showToast("Error", error.message, "error");
        setIsLoading(false);
      }
    };
    getUser();
  }, [showToast]);

  return { currentUser, isLoading, showToast };
};

export default useGetCurrentUser;
