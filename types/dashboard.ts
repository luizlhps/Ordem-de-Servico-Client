import { IFinance } from "./finance";

export interface IDashboard {
  totalCount: number;
  totalCountPrevMonth: number;
  percetege: number;
  balance: Balance;
  pending: Pending;
  finished: Pending;
  transactions: IFinance[];
  transactionsPreviusMonth: IFinance[];
}

export interface Orders {
  totalCount: number;
  percetege: number;
}

export interface ITransactionDashboard {
  totalCount: number;
  percetege: number;
}
export interface Pending {
  transaction: ITransactionDashboard;
  credit: Credit;
  debit: Debit;
  orders: Orders;
}

export interface Debit {
  percetege: number;
  amountMonth: number;
  amountPrevMonth: number;
  counter: Counter;
}

export interface Credit {
  percetege: number;
  amountMonth: number;
  amountPrevMonth: number;
  counter: Counter;
}

export interface Counter {
  MonthCredit: number;
  prevMonthCredit: number;
  percentege: number;
}

export interface Balance {
  percetege: number;
  totalAmountCredit: number;
  totalAmountDebit: number;
  totalAmountMonth: number;
  totalAmount: number;
}
