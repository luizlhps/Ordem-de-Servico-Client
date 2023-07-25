import { IOrder, RootOrder, Service } from "../../../types/order";
import { Api } from "./axios-config";

export interface IOrderData {
  _id: string;
  id: number;
  equipment: string;
  brand: string;
  model: string;
  defect: string;
  observation: string;
  dateEntry: string;
  services: Service;
  status: string;
  costumer: string;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  technicalOpinion: string;
  discount: string;
  name: string;
}

class OrderApi {
  getAllOrder(filter = "", page = 1, limit = 10) {
    return Api.get<RootOrder>(`order/?filter=${filter}&page=${page}&limit=${limit}`);
  }
  getPendingOrder(filter = "", page = 1, limit = 10) {
    return Api.get<RootOrder>(`order/pending?filter=${filter}&page=${page}&limit=${limit}`);
  }

  async createOrder(data: IOrder, Costumerid: string) {
    const res = await Api.post("order", {
      equipment: data.equipment,
      brand: data.brand,
      model: data.model,
      defect: data.defect,
      observation: data.observation,
      dateEntry: data.dateEntry,
      services: [],
      status: data.status,
      customer: Costumerid,
    });
    return res;
  }

  async getCostumerOrders(id: string, filter: string, page: number, limit: number) {
    console.log(id, filter, page, limit);
    try {
      const data = await Api.get(`order/costumer?costumerId=${id}&filter=${filter}&$page=${page}&limit=${limit}`);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  deleteOrder(id: string) {
    return Api.delete(`order/${id}`);
  }

  async updateOrder(data: IOrderData, orderId: string) {
    try {
      const res = await Api.put(`order/${orderId}`, {
        equipment: data.equipment,
        brand: data.brand,
        model: data.model,
        defect: data.defect,
        discount: data.discount,
        technicalOpinion: data.technicalOpinion,
        observation: data.observation,
        dateEntry: data.dateEntry,
        services: data.services,
        status: data.status,
        customer: data.costumer,
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
}

export const orderApi = new OrderApi();
