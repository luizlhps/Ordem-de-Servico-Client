export interface IFinance {
  _id: string;
  id: number;
  title: string;
  description: string;
  amount: number;
  type: string;
  status: string;
  order: string;
  entryDate: string;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  payDay: string;
  dueDate: string;
}

export interface RootFinance {
  total: number;
  page: number;
  limit: number;
  transaction: IFinance[];
}

export interface IBalance {
  _id: string;
  amount: number;
  __v: number;
}

export interface InputTransactionOrderData {
  _id?: string;
  id?: number;
  title: string;
  description?: string;
  amount: number;
  type: string;
  status: string;
  order: string;
  entryDate?: string;
  deleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  payDay?: string;
  dueDate?: string;
}
