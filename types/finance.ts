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
  exitDate?: string;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RootFinance {
  total: number;
  Page: number;
  limit: number;
  transaction: IFinance[];
}

export interface IBalance {
  _id: string;
  amount: number;
  __v: number;
}
