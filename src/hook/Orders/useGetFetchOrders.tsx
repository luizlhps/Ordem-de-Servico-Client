import React, { useState } from "react";
import useApiRequest from "../useApiGet";
import { useDebouse } from "../useDebouse";
import { orderApi } from "@/services/api/orderApi";
import { IDetailsStatus } from "@/services/api/statusApi";

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
  const [ordersData, setOrdersData] = useState<IData>({ Total: 0, Page: 0, limit: 0, orders: [] || "" });
  const [currentPage, setCurrentPage] = useState(0);

  const { debouse } = useDebouse(300);

  //Get Api
  const { loading, error, request } = useApiRequest();

  const fetchApi = async (search = "", page?: number, limit?: number) => {
    debouse(async () => {
      const data = await request(orderApi.getAllOrder, search, page, limit);
      setOrdersData(data);

      if (error) {
        console.error(error);
        setOrdersData({ Total: 0, Page: 0, limit: 0, orders: [] });
      }
    });
  };
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
