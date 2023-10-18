import { IFilterSearchCustomers } from "@/hook/useGetFetchCustomers";
import { Api } from "./axios-config";
import { RootCustomer } from "../../../types/customer";

//[] - Adicionar trycatch e validação de erro

class Customers {
  async getAllCustomers(
    filter: IFilterSearchCustomers = { search: "" },
    page = 1,
    limit = 10,
    deleted: "" | boolean = false
  ) {
    return Api.get<RootCustomer>(
      `customers/?filter=${JSON.stringify(filter)}&page=${page}&limit=${limit}&deleted=${deleted}`
    );
  }

  deleteCustomer(_id: string) {
    return Api.delete(`customers/${_id}`);
  }

  async getById(_id: string) {
    const response = await Api.get(`customers/6495b3b50c5e5fef71564463`);
    return response;
  }

  async createCustomer(data: any) {
    const res = await Api.post("customers", {
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

  async updateCustomer(data: any, _id: string | string[]) {
    const res = await Api.put(`customers/${_id}`, {
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

export const customersApi = new Customers();
