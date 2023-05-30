import React, { useState } from "react";
import useApiRequest from "../useApiGet";
import { servicesApi } from "@/services/api/servicesApi";
import { useDebouse } from "../useDebouse";

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
      const data = await request(servicesApi.getAllServices, search, page, limit);
      setServicesData(data);

      if (error) {
        console.error(error);
        setServicesData({ Total: 0, Page: 0, limit: 0, service: [] });
      }
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
