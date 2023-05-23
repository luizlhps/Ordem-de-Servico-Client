import { Api } from "./axios-config";

export interface IService {
  title: string;
  description: string;
  amount: number;
}
class Services {
  async getAllServices(filter = "", page = 1, limit = 10) {
    const res = await Api.get(`services/?filter=${filter}&page=${page}&limit=${limit}`);
    console.log(`services/?filter=${filter}&page=${page}&limit=${limit}`);
    return res;
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
    console.log("data", data);
    console.log("id", _id);

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
