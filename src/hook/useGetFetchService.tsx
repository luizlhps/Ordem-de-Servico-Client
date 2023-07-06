import React, { useState } from "react";
import { servicesApi } from "@/services/api/servicesApi";
import { useDebouse } from "./useDebouse";
import useApiRequest from "./useApiGet";

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
  const [servicesData, setServicesData] = useState<IData>({ Total: 0, Page: 0, limit: 0, service: [] || "" });
  const [currentPage, setCurrentPage] = useState(0);

  const { debouse } = useDebouse(300);

  //Get Api
  const { loading, error, request } = useApiRequest();

  const fetchApi = async (search = "", page?: number, limit?: number) => {
    debouse(async () => {
      try {
        const data = await servicesApi.getAllServices(search, page, limit);

        if (data instanceof Error) throw new Error("Erro ao listar o serviço");

        setServicesData(data);

        if (error) {
          console.error(error);
          setServicesData({ Total: 0, Page: 0, limit: 0, service: [] });
        }
      } catch (error) {}
    });
  };
  return {
    loading,
    error,
    fetchApi,
    servicesData,
    setServicesData,
    currentPage,
    setCurrentPage,
  };
};
