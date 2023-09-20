import { useCallback, useState } from "react";
import { useDebouse } from "./useDebouse";
import { configApplicationApi } from "@/services/configApplicationApi";
import { RootStore } from "../../types/store";

export const useGetFetchStore = () => {
  const [storeData, setstoreData] = useState<RootStore>();
  const { debouse } = useDebouse(300);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  //Get Api

  const fetchApi = useCallback(
    async (search = "", page?: number, limit?: number) => {
      debouse(async () => {
        setLoading(true);
        configApplicationApi
          .getInfoStore()
          .then((res) => {
            setstoreData(res.data);
          })
          .catch((err) => {
            console.log(err);
            setError(true);
          })
          .finally(() => setLoading(false));
      });
    },
    [debouse, setLoading]
  );
  return {
    loading,
    error,
    fetchApi,
    storeData,
    setstoreData,
  };
};
