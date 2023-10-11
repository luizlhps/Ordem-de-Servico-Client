import { ICustomer } from "./customer";

export interface RootOrder {
  total: number;
  page: number;
  limit: number;
  orders: IOrder[];
}

export interface IOrder {
  _id: string;
  id: number;
  equipment: string;
  brand: string;
  model: string;
  defect: string;
  observation: string;
  dateEntry: string;
  services: Service[];
  status: Status;
  customer: ICustomer;
  amount: number;
  discount: number;
  totalAmount: number;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  technicalOpinion: string;
  servicesPrices: ServicePrice[];
  equipmentField: string;
  exitDate: string;
}

export interface Service {
  _id: string;
  id: number;
  title: string;
  description: string;
  amount: number;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Status {
  _id: string;
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
}

export interface ServicePrice {
  _id: string;
  id: number;
  service: string;
  price: number;
  order: string;
  __v: number;
  title: string;
  description: string;
}
