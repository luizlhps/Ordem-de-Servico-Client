import { useDebouse } from "@/hook";
import useApiRequest from "@/hook/useApiGet";
import { orderApi } from "@/services/api/orderApi";
import React, { useState, useEffect } from "react";
import { RootOrder } from "../../types/order";
import { ICostumer } from "../../types/costumer";

interface IProps {
  costumer: ICostumer;
}

export const useGetCostumOrders = ({ costumer }: IProps) => {
  const [data, setData] = useState<RootOrder>({ total: 0, page: 0, limit: 0, orders: [] || "" });
  const [currentPage, setCurrentPage] = useState(0);
  const { debouse } = useDebouse(300);

  const { loading, error, request } = useApiRequest();

  const fetchApi = async (id?: string, search = "", page?: number, limit?: number) => {
    debouse(async () => {
      if (!id) {
        const costumerOrders = await request(orderApi.getCostumerOrders, costumer._id, "", 1, limit);
        setData(costumerOrders);
      } else {
        const costumerOrders = await request(orderApi.getCostumerOrders, id, search, page, limit);
        setData(costumerOrders);
      }

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
