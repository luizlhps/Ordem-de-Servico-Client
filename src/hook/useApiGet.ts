// useApiRequest hook
import { useState } from "react";
import { useDebouse } from "./useDebouse";

const useApiRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { debouse } = useDebouse(300);

  const request = async (apiFunction: any, ...args: any) => {
    setLoading(true);
    try {
      const response = await apiFunction(...args);
      console.log(response);
      setLoading(false);
      return response.data;
    } catch (error: any) {
      setLoading(false);
      setError(error);
      throw error;
    }
  };

  return {
    loading,
    error,
    request,
  };
};

export default useApiRequest;
