import { useDebouse } from "@/hook";
import useApiRequest from "@/hook/useApiGet";
import { orderApi } from "@/services/api/orderApi";
import React, { useState, useEffect } from "react";
import { RootOrder } from "../../types/order";
import { ICustomer } from "../../types/customer";

interface IProps {
  customer: ICustomer;
}

export const useGetCustomerOrders = ({ customer }: IProps) => {
  const [data, setData] = useState<RootOrder>({ total: 0, page: 0, limit: 0, orders: [] || "" });
  const [currentPage, setCurrentPage] = useState(0);
  const { debouse } = useDebouse(300);

  const { loading, error, request } = useApiRequest();

  const fetchApi = async (id?: string, search = "", page?: number, limit?: number) => {
    debouse(async () => {
      if (!id) {
        const customerOrders = await request(orderApi.getCustomerOrders, customer._id, "", 1, limit);
        setData(customerOrders);
      } else {
        const customerOrders = await request(orderApi.getCustomerOrders, id, search, page, limit);
        setData(customerOrders);
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
