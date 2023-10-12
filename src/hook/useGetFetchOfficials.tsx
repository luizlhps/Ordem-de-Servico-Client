import { useCallback, useEffect, useState } from "react";
import { useDebouse } from "./useDebouse";
import { usersApi } from "@/services/api/usersApi";
import { RootUser } from "../../types/users";
import { IRangeDateFilter } from "@/components/MenuSelectFilter/FiltersMenu/FilterRangeDate";

export interface IFilterSearchOfficials {
  status?: string;
  search?: string;
  customer?: string;
}

export const useGetFetchOfficials = () => {
  const limitPerPage = 10;

  const [officialsData, setOfficialsData] = useState<RootUser>({ total: 0, page: 0, limit: 0, user: [] });
  const [currentPage, setCurrentPage] = useState(0);
  const { debouse } = useDebouse(300);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  //Get Api

  const fetchApi = useCallback(
    async (search?: IFilterSearchOfficials, page?: number, limit?: number) => {
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
  //filters
  const [searchField, setSearchField] = useState("");
  const [StatusFilter, setStatusFilter] = useState<string | null | undefined>(null);
  const [customerFilter, setCustomerFilter] = useState<string | null | undefined>();
  const [rangeDateFilter, setRangeDateFilter] = useState<IRangeDateFilter | null>(null);

  //inputSearch
  useEffect(() => {
    const abortController = new AbortController();
    let fieldsSearch = {
      status: StatusFilter ? StatusFilter : "",
      search: searchField,
      customer: customerFilter ? customerFilter : "",
      dateFrom: rangeDateFilter?.dateFrom ? rangeDateFilter?.dateFrom : "",
      dateTo: rangeDateFilter?.dateTo ? rangeDateFilter?.dateTo : "",
    };

    fetchApi(fieldsSearch, currentPage + 1, limitPerPage);
    return () => {
      abortController.abort();
    };
  }, [searchField, currentPage, customerFilter, StatusFilter, rangeDateFilter]);

  return {
    loading,
    error,
    fetchApi,
    officialsData,
    setOfficialsData,
    currentPage,
    setCurrentPage,
    setRangeDateFilter,
    setCustomerFilter,
    setStatusFilter,
    setSearchField,
    searchField,
    limitPerPage,
  };
};
