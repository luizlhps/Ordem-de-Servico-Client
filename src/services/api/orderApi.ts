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
  services: string[];
  status: string;
  customer: string;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
}

class OrderApi {
  async getAllOrder(filter = "", page = 1, limit = 10) {
    try {
      const res = await Api.get(`order/?filter=${filter}&page=${page}&limit=${limit}`);

      if (res) return res;

      return new Error("Erro ao listar os registros.");
    } catch (error) {
      console.error(error);
      return new Error((error as { message: string }).message || "Erro ao listar os registros.");
    }
  }

  async createOrder(data: IOrderData, Costumerid: string) {
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
    try {
      const data = await Api.get(`order/costumer?costumerId=${id}&filter=${filter}&$page=${page}&limit=${limit}`);
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
      throw new Error((error as { message: string }).message || "Erro ao listar os status.");
    }
  }

  async deleteOrder(id: string) {
    try {
    } catch (error) {}
  }

  async updateOrder(data: IOrderData, Costumerid: string) {
    const res = await Api.put("order", {
      equipment: data.equipment,
      brand: data.brand,
      model: data.model,
      defect: data.defect,
      observation: data.observation,
      dateEntry: data.dateEntry,
      services: data.services,
      status: data.status,
      customer: Costumerid,
    });
    return res;
  }
}

export const orderApi = new OrderApi();
