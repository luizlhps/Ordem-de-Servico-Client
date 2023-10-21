export interface RootServices {
  total: number;
  page: number;
  limit: number;
  service: IServices[];
}

export interface IServices {
  _id: string;
  id: number;
  title: string;
  description: string;
  amount: number;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
}
