import React, { useCallback, useState } from "react";
import useApiRequest from "./useApiGet";
import { useDebouse } from "./useDebouse";
import { IBalance, IFinance, RootFinance } from "../../types/finance";
import { financeApi } from "@/services/api/financeApi";
import { dashboardApi } from "@/services/api/dashboardApi";
import { IDashboard } from "../../types/dashboard";

export const useGetFetchFinance = () => {
  const [financeData, setFinanceData] = useState<RootFinance>({ total: 0, page: 0, limit: 0, transaction: [] || "" });
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const { debouse } = useDebouse(300);

  //dashBoard finance
  const [dataDashboard, setDashboard] = useState<IDashboard>();

  const dashboardFetchApi = useCallback(() => {
    dashboardApi
      .getDashboard()
      .then((item: any) => setDashboard(item.data))
      .catch();
  }, []);

  //Get Api
  const fetchApi = useCallback((search = "", page?: number, limit?: number) => {
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
        });
      /*    .finally(() => setLoading(false)); */
    });
  }, []);

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
  };
};
