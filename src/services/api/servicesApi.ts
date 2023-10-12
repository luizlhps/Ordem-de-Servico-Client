import { AxiosResponse } from "axios";
import { Api } from "./axios-config";
import { IFilterSearchService } from "@/hook/useGetFetchService";

export interface IService {
  _id: string;
  id: number;
  title: string;
  description: string;
  amount: number;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  v?: string;
}

export interface RootService {
  total: number;
  page: number;
  limit: number;
  service: IService[];
}
class Services {
  async getAllServices(
    filter: IFilterSearchService = { search: "" },
    page = 1,
    limit = 10
  ): Promise<RootService | Error> {
    try {
      const res = await Api.get(`services/?filter=${JSON.stringify(filter)}&page=${page}&limit=${limit}`);

      if (res) {
        return res.data;
      }

      return new Error("Erro ao listar os status.");
    } catch (error) {
      console.error("Erro ao listar os Status!!");
      throw new Error((error as { message: string }).message || "Erro ao listar os status.");
    }
  }
  async createServices(data: IService) {
    const res = await Api.post("services", {
      title: data.title,
      description: data.description,
      amount: data.amount,
    });
    return res;
  }

  async updateServices(data: IService, _id: string) {
    const res = await Api.put(`services/${_id}`, {
      title: data.title,
      description: data.description,
      amount: data.amount,
    });
    return res;
  }

  async deleteServices(_id: any) {
    const deleteId = await Api.delete(`services/${_id}`);
    return deleteId;
  }
}

export const servicesApi = new Services();
