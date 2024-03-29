import { useCallback, useEffect, useState } from "react";
import { useDebouse } from "./useDebouse";
import { orderApi } from "@/services/api/orderApi";
import { IDetailsStatus } from "@/services/api/statusApi";
import { RootOrder } from "../../types/order";
import { IRangeDateFilter } from "@/components/MenuSelectFilter/FiltersMenu/FilterRangeDate";

export interface IFilterSearchOrder {
  status?: string;
  search?: string;
  customer?: string;
}

export interface IData {
  total: number;
  page: number;
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
  const limitPerPage = 10;

  const [ordersData, setOrdersData] = useState<RootOrder>({ total: 0, page: 0, limit: 0, orders: [] });
  const [currentPage, setCurrentPage] = useState(0);
  const { debouse } = useDebouse(300);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  //filters
  const [searchField, setSearchField] = useState("");
  const [StatusFilter, setStatusFilter] = useState<string | null | undefined>(null);
  const [customerFilter, setCustomerFilter] = useState<string | null | undefined>();
  const [rangeDateFilter, setRangeDateFilter] = useState<IRangeDateFilter | null>(null);

  //Get Api

  const fetchApi = useCallback(
    async (search?: IFilterSearchOrder, page?: number, limit?: number, deleted?: boolean) => {
      debouse(async () => {
        setLoading(true);
        try {
          const res = await orderApi.getAllOrder(search, page, limit, deleted);
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
    ordersData,
    setOrdersData,
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
