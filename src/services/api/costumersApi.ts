import { ICustomer } from "@/contexts";
import { Api } from "./axios-config";

//[] - Adicionar trycatch e validação de erro

class Costumers {
  async getAllCostumers(filter = "", page = 1, limit = 10) {
    const res = await Api.get(`costumers/?filter=${filter}&page=${page}&limit=${limit}`);
    return res;
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
