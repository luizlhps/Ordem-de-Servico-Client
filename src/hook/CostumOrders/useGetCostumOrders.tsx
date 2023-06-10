import { useDebouse } from "@/hook";
import useApiRequest from "@/hook/useApiGet";
import { orderApi } from "@/services/api/orderApi";
import React, { useState, useEffect } from "react";

export interface IData {
  total: number;
  page: number;
  limit: number;
  orders: Order[];
}

export interface Order {
  _id: string;
  id: number;
  equipment: string;
  brand: string;
  model: string;
  defect: string;
  observation: string;
  dateEntry: string;
  services: any[];
  status: Status;
  customer: string;
  createdAt: string;
  updatedAt: string;
}

export interface Status {
  _id: string;
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export const useGetCostumOrders = () => {
  const [data, setData] = useState<IData>({ total: 0, page: 0, limit: 0, orders: [] || "" });
  const [currentPage, setCurrentPage] = useState(0);
  const { debouse } = useDebouse(300);

  const { loading, error, request } = useApiRequest();

  const fetchApi = async (id?: string, search = "", page?: number, limit?: number) => {
    debouse(async () => {
      const costumerOrders = await request(orderApi.getCostumerOrders, id, search, page, limit);

      setData(costumerOrders);
      if (error) {
        console.error(error);
        setData({ total: 0, page: 0, limit: 0, orders: [] });
      }
    });
  };

  return {
    fetchApi,
    data,
    setData,
    currentPage,
    setCurrentPage,
    loading,
  };
};
