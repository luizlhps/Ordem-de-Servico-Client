import { IBalance, IFinance, RootFinance } from "../../../types/finance";
import { Api } from "./axios-config";

class FinanceApi {
  async create(data: IFinance, orderId: string | undefined) {
    console.log(data.title);

    return Api.post("finance", {
      title: data.title,
      description: data.description,
      amount: data.amount,
      type: data.type,
      status: data.status,
      order: data.order,
      entryDate: data.entryDate,
      payDay: data.payDay,
    });
  }

  async delete() {}

  getAll(filter = "", page = 1, limit = 10) {
    return Api.get<RootFinance>(`finance/?filter=${filter}&page=${page}&limit=${limit}`);
  }

  getBalance() {
    return Api.get<IBalance>("finance/balance");
  }
}

export const financeApi = new FinanceApi();
