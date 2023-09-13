import { IMyInfoUser, IUser, RootUser } from "../../../types/users";
import { InputsFormUser } from "../installApplicationApi";
import { Api } from "./axios-config";

interface IInputDataProfile {
  name: string;
  email: string;
  phone: string;
}

interface InputDataProfilePassword {
  password: string;
}

class UsersApi {
  getById() {}
  getAll(filter = "", page = 1, limit = 10) {
    return Api.get<RootUser>(`users/?filter=${filter}&page=${page}&limit=${limit}`);
  }

  GetMyInfo() {
    return Api.get<IMyInfoUser>("/me");
  }

  updateProfile(data: IInputDataProfile) {
    return Api.put("/user", {
      name: data.name,
      email: data.email,
      phone: data.phone,
    });
  }

  updateOffcialsUser(data: InputsFormUser, id: string) {
    return Api.put(`/user/${id}`, {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      group: data.group,
    });
  }
  updateProfilePassword(data: InputDataProfilePassword) {
    return Api.put("/user", {
      password: data.password,
    });
  }
  delete(id: string) {
    return Api.delete(`user/${id}`);
  }

  updateAvatar(formData: FormData) {
    return Api.patch("/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  createOfficials(data: InputsFormUser) {
    console.log("data", data);
    return Api.post("/register", {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      group: data.group,
    });
  }
}

export const usersApi = new UsersApi();
