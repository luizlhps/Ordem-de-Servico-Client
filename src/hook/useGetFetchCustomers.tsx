import { useCallback, useEffect, useState } from "react";
import { useDebouse } from "./useDebouse";
import { customersApi } from "@/services/api/customersApi";
import { RootCustomer } from "../../types/customer";
import { IRangeDateFilter } from "@/components/MenuSelectFilter/FiltersMenu/FilterRangeDate";

export interface IFilterSearchCustomers extends IRangeDateFilter {
  search?: string;
}

export const useGetFetchCustomers = () => {
  const limitPerPage = 10;

  const [customerData, setCustomerData] = useState<RootCustomer>({ total: 0, page: 0, limit: 0, customer: [] });
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const { debouse } = useDebouse(300);

  //filters
  const [searchField, setSearchField] = useState("");
  const [StatusFilter, setStatusFilter] = useState<string | null | undefined>(null);
  const [customerFilter, setCustomerFilter] = useState<string | null | undefined>();
  const [rangeDateFilter, setRangeDateFilter] = useState<IRangeDateFilter | null>(null);

  //Get Api
  const fetchApi = useCallback((search?: IFilterSearchCustomers, page?: number, limit?: number) => {
    setLoading(true);
    debouse(() => {
      customersApi
        .getAllCustomers(search, page, limit)
        .then((response) => {
          setCustomerData(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("error", err || "deu ruim");
          setCustomerData({ total: 0, page: 0, limit: 0, customer: [] || "" });
        })
        .finally(() => setLoading(false));
    });
  }, []);

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
    customerData,
    setCustomerData,
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
