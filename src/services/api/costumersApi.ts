import { Api } from "./axios-config";

class Costumers {
  async getAllCostumers() {
    const res = await Api.get("costumers");
    return res;
  }
}

export const constumersApi = new Costumers();
