import { IFilterSearchTransactions } from "@/hook/useGetFetchFinances";
import { IBalance, IFinance, RootFinance } from "../../../types/finance";
import { Api } from "./axios-config";

class FinanceApi {
  create(data: IFinance, orderId: string | undefined) {
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

  delete(transaction_id: string) {
    return Api.delete(`finance/${transaction_id}`);
  }

  getAll(filter: IFilterSearchTransactions = { search: "" }, page = 1, limit = 10, deleted = false) {
    return Api.get<RootFinance>(
      `finance/?filter=${JSON.stringify(filter)}&page=${page}&limit=${limit}&deleted=${deleted}`
    );
  }

  getBalance() {
    return Api.get<IBalance>("finance/balance");
  }
}

export const financeApi = new FinanceApi();
