export interface RootStore {
  address: IAddressStore;
  _id: string;
  name: string;
  cnpj: string;
  phone: string;
  telephone: string;
  aplicationConfigurate: boolean;
  alreadyExistAdmin: boolean;
  __v: number;
  avatar: string;
}

export interface IAddressStore {
  cep: string;
  state: string;
  neighborhood: string;
  street: string;
  city: string;
  number: string;
  complement: string;
}
