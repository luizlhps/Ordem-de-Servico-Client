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
  services: any[];
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
      return data;
    } catch (error) {
      console.error("Erro ao deletar o Status!!");
      throw new Error((error as { message: string }).message || "Erro ao listar os status.");
    }
  }

  async deleteOrder(id: string) {
    try {
      const res = await Api.delete(`order/${id}`);
    } catch (error) {
      console.log("ocorreu um Erro ao deletar a O.S");
      throw new Error((error as { message: string }).message || "Erro ao deletar a O.S.");
    }
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
        customer: data.name,
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
}

export const orderApi = new OrderApi();
