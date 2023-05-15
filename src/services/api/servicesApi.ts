import { Api } from "./axios-config";

class Services {
  async getAllServices() {
    const res = await Api.get("services");
    return res;
  }
}

export const servicesApi = new Services();
