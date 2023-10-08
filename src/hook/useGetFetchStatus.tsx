import { useCallback, useState } from "react";
import { useDebouse } from "./useDebouse";
import { TStatusData, statusApi } from "@/services/api/statusApi";
import { IFilterSearch } from "./useSearchField";

export const useGetFetchStatus = () => {
  const [statusData, setStatusData] = useState<TStatusData>({ total: 0, page: 0, limit: 0, status: [] });
  const [currentPage, setCurrentPage] = useState(0);
  const { debouse } = useDebouse(300);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  //Get Api

  const fetchApi = useCallback(
    async (search?: IFilterSearch, page?: number, limit?: number) => {
      debouse(async () => {
        setLoading(true);
        try {
          statusApi.getAllStatus(search, page, limit).then((res) => {
            setStatusData(res.data);
          });
        } catch (err) {
          console.log(err);
          setError(true);
        } finally {
          setLoading(false);
        }
      });
    },
    [debouse, setLoading, setStatusData]
  );
  return {
    loading,
    error,
    fetchApi,
    statusData,
    setStatusData,
    currentPage,
    setCurrentPage,
  };
};
