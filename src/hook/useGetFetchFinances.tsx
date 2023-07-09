import React, { useState } from "react";
import useApiRequest from "./useApiGet";
import { useDebouse } from "./useDebouse";
import { IBalance, IFinance, RootFinance } from "../../types/finance";
import { financeApi } from "@/services/api/financeApi";

export const useGetFetchFinance = () => {
  const [financeData, setFinanceData] = useState<RootFinance>({ total: 0, page: 0, limit: 0, transaction: [] || "" });
  const [balanceValue, setBalanceValue] = useState<IBalance | undefined>();
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const { debouse } = useDebouse(300);

  //Get Api

  const fetchApi = (search = "", page?: number, limit?: number) => {
    setLoading(true);
    debouse(() => {
      financeApi
        .getAll(search, page, limit)
        .then((response) => {
          if (response instanceof Error) throw new Error("Houve um erro");

          setFinanceData(response.data);
        })
        .catch((err) => console.log("error", err || "deu ruim"))
        .finally(() => setLoading(false));
    });
  };

  const fetchBalance = () => {
    financeApi
      .getBalance()
      .then((res) => {
        setBalanceValue(res.data);
      })
      .catch((err) => console.log(err));
  };

  return {
    fetchBalance,
    balanceValue,
    loading,
    error,
    fetchApi,
    financeData,
    setFinanceData,
    currentPage,
    setCurrentPage,
  };
};
