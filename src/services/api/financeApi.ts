import { IBalance, RootFinance } from "../../../types/finance";
import { Api } from "./axios-config";

class FinanceApi {
  async create() {}

  async delete() {}

  getAll(filter = "", page = 1, limit = 10) {
    return Api.get<RootFinance>(`finance/?filter=${filter}&page=${page}&limit=${limit}`);
  }

  getBalance() {
    return Api.get<IBalance>("finance/balance");
  }
}

export const financeApi = new FinanceApi();
