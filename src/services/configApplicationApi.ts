import { RootStore } from "../../types/store";
import { Api } from "./api/axios-config";

export interface InputsFormUser {
  name: string;
  email: string;
  phone: string;
  group?: string;
  password: string;
  checkPassword: string;
}

export interface IStoreAddress {
  cep: string;
  state: string;
  neighborhood: string;
  complement?: string;
  street: string;
  city: string;
  number: string;
}

export interface InputsFormCreateStore {
  name: string;
  cnpj: string;
  phone: string;
  telephone: string;
  address: IStoreAddress;
}

class ConfigApplicationApi {
  CreateAdmin(data: InputsFormUser) {
    return Api.post("/install/userAdmin", {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
    });
  }

  CreateStore(data: InputsFormCreateStore) {
    return Api.post("/install/store", {
      name: data.name,
      cnpj: data.cnpj,
      phone: data.phone,
      telephone: data.telephone,
      address: {
        cep: data.address.cep,
        state: data.address.state,
        neighborhood: data.address.neighborhood,
        complement: data.address?.complement,
        street: data.address.street,
        city: data.address.city,
        number: data.address.number,
      },
    });
  }

  uploudAvatarStore(formData: FormData) {
    return Api.patch("/install/store", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  updateAvatarStore(formData: FormData) {
    return Api.patch("/store", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  uploudAvatarUserAdmin(formData: FormData) {
    console.log(formData);

    return Api.patch("/install/userAdmin", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  updateStore(data: InputsFormCreateStore) {
    return Api.put("/store", data);
  }

  getInfoStore() {
    return Api.get<RootStore>("/store");
  }
}

export const configApplicationApi = new ConfigApplicationApi();
