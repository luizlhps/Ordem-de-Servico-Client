import React, { useEffect, useState } from "react";
import { servicesApi } from "@/services/api/servicesApi";
import { useDebouse } from "./useDebouse";
import useApiRequest from "./useApiGet";

interface IPropsSearch {
  limitPage: number;
}

export interface IRangeDateFilter {
  dateFrom?: string | null | undefined;
  dateTo?: string | null | undefined;
}

export interface IFilterSearchService extends IRangeDateFilter {
  search?: string;
}

export interface IData {
  Total: number;
  Page: number;
  limit: number;
  service: IService[] | [] | "";
}

export interface IService {
  deleted: boolean;
  _id: string;
  id: number;
  title: string;
  description: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
}

export const useGetFetchService = () => {
  const limitPerPage = 10;

  const [servicesData, setServicesData] = useState<IData>({ Total: 0, Page: 0, limit: 0, service: [] || "" });
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { debouse } = useDebouse(300);

  //filters
  const [searchField, setSearchField] = useState("");
  const [StatusFilter, setStatusFilter] = useState<string | null | undefined>(null);
  const [customerFilter, setCustomerFilter] = useState<string | null | undefined>();
  const [rangeDateFilter, setRangeDateFilter] = useState<IRangeDateFilter | null>(null);

  const fetchApi = async (search?: IFilterSearchService, page?: number, limit?: number) => {
    setLoading(true);
    debouse(async () => {
      try {
        const data = await servicesApi.getAllServices(search, page, limit);

        if (data instanceof Error) throw new Error("Erro ao listar o serviço");

        setServicesData(data);

        if (error) {
          console.error(error);
          setServicesData({ Total: 0, Page: 0, limit: 0, service: [] });
        }
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    });
  };

  //inputSearch
  useEffect(() => {
    let fieldsSearch: IFilterSearchService = {
      search: searchField,
      dateFrom: rangeDateFilter?.dateFrom ? rangeDateFilter?.dateFrom : "",
      dateTo: rangeDateFilter?.dateTo ? rangeDateFilter?.dateTo : "",
    };

    fetchApi(fieldsSearch, currentPage + 1, limitPerPage);
  }, [searchField, currentPage, customerFilter, StatusFilter, rangeDateFilter]);

  return {
    loading,
    error,
    fetchApi,
    servicesData,
    setServicesData,
    currentPage,
    setCurrentPage,
    setRangeDateFilter,
    setCustomerFilter,
    setStatusFilter,
    setSearchField,
    searchField,
  };
};
