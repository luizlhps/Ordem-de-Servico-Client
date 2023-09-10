import { useCallback, useState } from "react";
import { useDebouse } from "./useDebouse";
import { usersApi } from "@/services/api/usersApi";
import { RootUser } from "../../types/users";

export const useGetFetchOfficials = () => {
  const [officialsData, setOfficialsData] = useState<RootUser>({ total: 0, page: 0, limit: 0, user: [] });
  const [currentPage, setCurrentPage] = useState(0);
  const { debouse } = useDebouse(300);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  //Get Api

  const fetchApi = useCallback(
    async (search = "", page?: number, limit?: number) => {
      debouse(async () => {
        setLoading(true);
        usersApi
          .getAll(search, page, limit)
          .then((res) => {
            setOfficialsData(res.data);
          })
          .catch((err) => {
            console.log(err);
            setError(true);
          })
          .finally(() => setLoading(false));
      });
    },
    [debouse, setLoading, setOfficialsData]
  );
  return {
    loading,
    error,
    fetchApi,
    officialsData,
    setOfficialsData,
    currentPage,
    setCurrentPage,
  };
};
