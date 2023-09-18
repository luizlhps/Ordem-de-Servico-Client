import { useCallback, useState } from "react";
import { useDebouse } from "./useDebouse";
import { RootUser } from "../../types/users";
import { authGroupApi } from "../services/api/authGroupApi";
import { RootAuthGroup } from "../../types/authGroup";

export const useGetFetchPermissions = () => {
  const [permissionsData, setPermissionsData] = useState<RootAuthGroup>({ total: 0, page: 0, limit: 0, authGroup: [] });
  const [currentPage, setCurrentPage] = useState(0);
  const { debouse } = useDebouse(300);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  //Get Api

  const fetchApi = useCallback(
    async (search = "", page?: number, limit?: number) => {
      debouse(async () => {
        setLoading(true);
        authGroupApi
          .getAll(search, page, limit)
          .then((res) => {
            setPermissionsData(res.data);
          })
          .catch((err) => {
            console.log(err);
            setError(true);
          })
          .finally(() => setLoading(false));
      });
    },
    [debouse, setLoading, setPermissionsData]
  );
  return {
    loading,
    error,
    fetchApi,
    permissionsData,
    setPermissionsData,
    currentPage,
    setCurrentPage,
  };
};
