import { useCallback, useEffect, useState } from "react";
import { useDebouse } from "./useDebouse";
import { authGroupApi } from "../services/api/authGroupApi";
import { RootAuthGroup } from "../../types/authGroup";

interface IPropsSearch {
  limitPage: number;
}

export interface IFilterSearchPermissions {
  status?: string;
  search?: string;
  customer?: string;
}

export const useGetFetchPermissions = () => {
  const limitPerPage = 10;

  const [permissionsData, setPermissionsData] = useState<RootAuthGroup>({ total: 0, page: 0, limit: 0, authGroup: [] });
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
    async (search?: IFilterSearchPermissions, page?: number, limit?: number) => {
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
    permissionsData,
    setPermissionsData,
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
