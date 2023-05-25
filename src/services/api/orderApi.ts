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
      status: data.status[0], // [0]status is an array [id, name of status]
      customer: Costumerid,
    });
    return res;
  }
}

export const orderApi = new OrderApi();
