import { Api } from "./axios-config";

//[] - Adicionar trycatch e validação de erro

interface ICustomer {
  id: number;
  name: string;
  email: string;
  contact: string;
  phone: string;
  cpfOrCnpj: string;
  tel: string;
  orders: any[];
  createdAt: string;
  updatedAt: string;
  cep: string;
  state: string;
  neighborhood: string;
  street: string;
  city: string;
  number: string;
  complement: string;
  _id: string;

  //equipament
  equipment: string;
  brand: string;
  dateEntry: string;
  model: string;
  defect: string;
  status: string;
}
export interface ICostumerData {
  Total: number;
  Page: number;
  limit: number;
  customer: ICustomer[] | [];
}

class Costumers {
  async getAllCostumers(filter = "", page = 1, limit = 10) {
    try {
      const res = await Api.get(`costumers/?filter=${filter}&page=${page}&limit=${limit}`);

      if (res) return res;
      return new Error("Erro ao listar os registros.");
    } catch (error) {
      console.error(error);
      return new Error((error as { message: string }).message || "Erro ao listar os registros.");
    }
  }

  async deleteCostumer(_id: string) {
    const deleteId = await Api.delete(`costumers/${_id}`);
    return deleteId;
  }
  async getById(_id: string) {
    const deleteId = await Api.get(`costumers/${_id}`);
    return deleteId;
  }

  async createCostumer(data: ICustomer) {
    const res = await Api.post("costumers", {
      name: data?.name,
      email: data?.email,
      contact: data?.contact,
      phone: data?.phone,
      cpfOrCnpj: data?.cpfOrCnpj,
      telephone: data?.tel,
      address: [
        {
          cep: data?.cep,
          state: data?.state,
          neighborhood: data?.neighborhood,
          street: data?.street,
          city: data?.city,
          number: data?.number,
          complement: data?.complement,
        },
      ],
    });
    return res;
  }
  async updateCostumer(data: any, _id: string | string[]) {
    const res = await Api.put(`costumers/${_id}`, {
      name: data?.name,
      email: data?.email,
      contact: data?.contact,
      phone: data?.phone,
      cpfOrCnpj: data?.cpfOrCnpj,
      telephone: data?.tel,
      address: [
        {
          cep: data?.cep,
          state: data?.state,
          neighborhood: data?.neighborhood,
          street: data?.street,
          city: data?.city,
          number: data?.number,
          complement: data?.complement,
        },
      ],
    });
    return res;
  }
}

export const constumersApi = new Costumers();
