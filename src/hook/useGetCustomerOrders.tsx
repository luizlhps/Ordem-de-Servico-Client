import { useDebouse } from "@/hook";
import useApiRequest from "@/hook/useApiGet";
import { orderApi } from "@/services/api/orderApi";
import React, { useState, useEffect } from "react";
import { RootOrder } from "../../types/order";
import { ICustomer } from "../../types/customer";
import { IFilterSearchCustomers } from "./useGetFetchCustomers";
import { IRangeDateFilter } from "@/components/MenuSelectFilter/FiltersMenu/FilterRangeDate";

interface IProps {
  customer: ICustomer;
}
export interface IFilterSearchOrderPending extends IRangeDateFilter {
  status?: string;
  search?: string;
}

export const useGetCostumersOrders = ({ customer }: IProps) => {
  const limitPerPage = 10;

  const [data, setData] = useState<RootOrder>({ total: 0, page: 0, limit: 0, orders: [] || "" });
  const [currentPage, setCurrentPage] = useState(0);
  const { debouse } = useDebouse(300);

  const { loading, error, request } = useApiRequest();

  const fetchApi = async (id?: string, search?: IFilterSearchOrderPending, page?: number, limit?: number) => {
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

  //filters
  const [searchField, setSearchField] = useState("");
  const [StatusFilter, setStatusFilter] = useState<string | null | undefined>(null);
  const [rangeDateFilter, setRangeDateFilter] = useState<IRangeDateFilter | null>(null);

  useEffect(() => {
    let fieldsSearch = {
      status: StatusFilter ? StatusFilter : "",
      search: searchField,
      dateFrom: rangeDateFilter?.dateFrom ? rangeDateFilter?.dateFrom : "",
      dateTo: rangeDateFilter?.dateTo ? rangeDateFilter?.dateTo : "",
    };

    fetchApi(customer._id, fieldsSearch, currentPage + 1, limitPerPage);
  }, [searchField, currentPage, StatusFilter, rangeDateFilter]);

  return {
    fetchApi,
    data,
    setData,
    currentPage,
    setCurrentPage,
    loading,

    setRangeDateFilter,
    setStatusFilter,
    setSearchField,
    searchField,
    limitPerPage,
  };
};
