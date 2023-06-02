import { Api } from "./axios-config";

export interface IOrderData {
  id: number;
  equipment: string;
  brand: string;
  model: string;
  defect: string;
  observation: string;
  dateEntry: string;
  status: string;
  customer: string;
}

class OrderApi {
  async getAllOrder() {}

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
}

export const orderApi = new OrderApi();
