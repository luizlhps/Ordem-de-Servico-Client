import { IBalance, IFinance, RootFinance } from "../../../types/finance";
import { Api } from "./axios-config";

class FinanceApi {
  create(data: IFinance, orderId: string | undefined) {
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

  update(data: IFinance, transaction_Id: string, orderId: string) {
    console.log(data, transaction_Id);

    return Api.put(`finance/${transaction_Id}`, {
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

  delete() {}

  getAll(filter = "", page = 1, limit = 10) {
    return Api.get<RootFinance>(`finance/?filter=${filter}&page=${page}&limit=${limit}`);
  }

  getBalance() {
    return Api.get<IBalance>("finance/balance");
  }
}

export const financeApi = new FinanceApi();
