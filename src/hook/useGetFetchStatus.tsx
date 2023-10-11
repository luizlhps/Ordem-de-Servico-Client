import { useCallback, useEffect, useState } from "react";
import { useDebouse } from "./useDebouse";
import { TStatusData, statusApi } from "@/services/api/statusApi";

export interface IFilterSearchStatus {
  status?: string;
  search?: string;
  customer?: string;
}

export interface IRangeDateFilter {
  dateFrom: string | null | undefined;
  dateTo: string | null | undefined;
}

export const useGetFetchStatus = () => {
  const limitPerPage = 10;

  const [statusData, setStatusData] = useState<TStatusData>({ total: 0, page: 0, limit: 0, status: [] });
  const [currentPage, setCurrentPage] = useState(0);
  const { debouse } = useDebouse(300);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  //filters
  const [searchField, setSearchField] = useState("");
  const [StatusFilter, setStatusFilter] = useState<string | null | undefined>(null);
  const [customerFilter, setCustomerFilter] = useState<string | null | undefined>();
  const [rangeDateFilter, setRangeDateFilter] = useState<IRangeDateFilter | null>(null);

  //Get Api
  const fetchApi = useCallback(
    async (search?: IFilterSearchStatus, page?: number, limit?: number) => {
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

  //inputSearch
  useEffect(() => {
    let fieldsSearch = {
      status: StatusFilter ? StatusFilter : "",
      search: searchField,
      customer: customerFilter ? customerFilter : "",
      dateFrom: rangeDateFilter?.dateFrom ? rangeDateFilter?.dateFrom : "",
      dateTo: rangeDateFilter?.dateTo ? rangeDateFilter?.dateTo : "",
    };

    fetchApi(fieldsSearch, currentPage + 1, limitPerPage);
  }, [searchField, currentPage, customerFilter, StatusFilter, rangeDateFilter]);

  return {
    loading,
    error,
    fetchApi,
    statusData,
    setStatusData,
    currentPage,
    setCurrentPage,
    setSearchField,
    setStatusFilter,
    setCustomerFilter,
    setRangeDateFilter,
    searchField,
    limitPerPage,
  };
};
