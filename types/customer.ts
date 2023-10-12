export interface RootCustomer {
  total: number;
  page: number;
  limit: number;
  customer: ICustomer[];
}

export interface ICustomer {
  _id: string;
  id: number;
  name: string;
  email: string;
  contact: string;
  phone: string;
  cpfOrCnpj: string;
  telephone: string;
  address: Address[];
  orders: string[];
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  cep: string;
  state: string;
  neighborhood: string;
  street: string;
  city: string;
  number: string;
  complement: string;
  _id: string;
}
