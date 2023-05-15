import { Api } from "./axios-config";

export interface IService{
  title:string
  description:string
  amount:number
}
class Services {
  async getAllServices() {
    const res = await Api.get("services");
    return res;
  }
  async createServices(data:IService) {
    const res = await Api.post("services", {
      "title": data.title,
      "description": data.description,
      "amount": data.amount
    });
    return res;
  }
}

export const servicesApi = new Services();
