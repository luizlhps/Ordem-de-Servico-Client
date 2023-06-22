export interface Order {
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
  customer: Customer;
  amount: number;
  discount: number;
  totalAmount: number;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  technicalOpinion: string;
  servicesPrices: ServicePrice[];
  equipmentField: string;
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

export interface Customer {
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

export interface ServicePrice {
  _id: string;
  id: number;
  service: string;
  price: number;
  order: string;
  __v: number;
}
