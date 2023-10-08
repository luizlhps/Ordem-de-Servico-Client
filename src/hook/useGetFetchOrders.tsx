import React, { useCallback, useState } from "react";
import useApiRequest from "./useApiGet";
import { useDebouse } from "./useDebouse";
import { orderApi } from "@/services/api/orderApi";
import { IDetailsStatus } from "@/services/api/statusApi";
import { RootOrder } from "../../types/order";
import { IFilterSearch } from "./useSearchField";

export interface IData {
  Total: number;
  Page: number;
  limit: number;
  orders: IOrder[] | [];
}

export interface IOrder {
  _id: string;
  id: number;
  equipment: string;
  brand: string;
  model: string;
  defect: string;
  observation: string;
  dateEntry: string;
  services: any[];
  status: IDetailsStatus;
  customer: string;
  createdAt: string;
  updatedAt: string;
}

export const useGetFetchOrders = () => {
  const [ordersData, setOrdersData] = useState<RootOrder>({ total: 0, page: 0, limit: 0, orders: [] });
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
          const res = await orderApi.getAllOrder(search, page, limit);
          setOrdersData(res.data);
        } catch (err) {
          console.log(err);
          setError(true);
        } finally {
          setLoading(false);
        }
      });
    },
    [debouse, setLoading, setOrdersData]
  );
  return {
    loading,
    error,
    fetchApi,
    ordersData,
    setOrdersData,
    currentPage,
    setCurrentPage,
  };
};
