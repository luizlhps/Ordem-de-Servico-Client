import { Api } from "./axios-config";

//[] - Adicionar trycatch e validação de erro

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

  deleteCostumer(_id: string) {
    return Api.delete(`costumers/${_id}`);
  }

  async getById(_id: string) {
    const deleteId = await Api.get(`costumers/${_id}`);
    return deleteId;
  }

  async createCostumer(data: any) {
    const res = await Api.post("costumers", {
      name: data?.name,
      email: data?.email,
      contact: data?.contact,
      phone: data?.phone,
      cpfOrCnpj: data?.cpfOrCnpj,
      telephone: data?.tel,
      address: [
        {
          cep: data?.address[0].cep,
          state: data.address[0].state,
          neighborhood: data.address[0].neighborhood,
          street: data.address[0].street,
          city: data.address[0].city,
          number: data.address[0].number,
          complement: data.address[0].complement,
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
          cep: data?.address[0].cep,
          state: data.address[0].state,
          neighborhood: data.address[0].neighborhood,
          street: data.address[0].street,
          city: data.address[0].city,
          number: data.address[0].number,
          complement: data.address[0].complement,
        },
      ],
    });
    return res;
  }
}

export const costumersApi = new Costumers();
