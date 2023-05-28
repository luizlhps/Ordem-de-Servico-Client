// useApiRequest hook
import { useState } from "react";

const useApiRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async (apiFunction: any, ...args: any) => {
    setLoading(true);
    try {
      const response = await apiFunction(...args);
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
