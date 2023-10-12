import React, { useCallback, useEffect, useState } from "react";
import useApiRequest from "./useApiGet";
import { useDebouse } from "./useDebouse";
import { IBalance, IFinance, RootFinance } from "../../types/finance";
import { financeApi } from "@/services/api/financeApi";
import { dashboardApi } from "@/services/api/dashboardApi";
import { IDashboard } from "../../types/dashboard";
import { IRangeDateFilter } from "@/components/MenuSelectFilter/FiltersMenu/FilterRangeDate";

export interface IFilterSearchTransactions {
  status?: string;
  search?: string;
  customer?: string;
}

export const useGetFetchFinance = () => {
  const limitPerPage = 10;

  const [financeData, setFinanceData] = useState<RootFinance>({ total: 0, page: 0, limit: 0, transaction: [] || "" });
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const { debouse } = useDebouse(300);

  //filters
  const [searchField, setSearchField] = useState("");
  const [StatusFilter, setStatusFilter] = useState<string | null | undefined>(null);
  const [customerFilter, setCustomerFilter] = useState<string | null | undefined>();
  const [rangeDateFilter, setRangeDateFilter] = useState<IRangeDateFilter | null>(null);

  //dashBoard finance
  const [dataDashboard, setDashboard] = useState<IDashboard>();

  const dashboardFetchApi = useCallback(() => {
    dashboardApi
      .getDashboard()
      .then((item: any) => setDashboard(item.data))
      .catch();
  }, []);

  //Get Api
  const fetchApi = useCallback((search?: IFilterSearchTransactions, page?: number, limit?: number) => {
    setLoading(true);
    debouse(() => {
      dashboardFetchApi();
      financeApi
        .getAll(search, page, limit)
        .then((response) => {
          if (response instanceof Error) throw new Error("Houve um erro");

          setFinanceData(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("error", err || "deu ruim");
          setFinanceData({ total: 0, page: 0, limit: 0, transaction: [] || "" });
        })
        .finally(() => setLoading(false));
    });
  }, []);

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
    financeData,
    dashboardFetchApi,
    setFinanceData,
    currentPage,
    setCurrentPage,
    dataDashboard,

    setRangeDateFilter,
    setCustomerFilter,
    setStatusFilter,
    setSearchField,
    searchField,
    limitPerPage,
  };
};
