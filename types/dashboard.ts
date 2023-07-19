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

export interface Pending {
  credit: Credit;
  debit: Debit;
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
  totalAmount: number;
}
