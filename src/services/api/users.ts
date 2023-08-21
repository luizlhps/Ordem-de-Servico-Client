import { RootUser } from "../../../types/users";
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
  getAll(filter = "", page = 1, limit = 10) {}

  GetMyInfo() {
    return Api.get<RootUser>("/me");
  }

  updateProfile(data: IInputDataProfile) {
    return Api.put("/user", {
      name: data.name,
      email: data.email,
      phone: data.phone,
    });
  }
  updateProfilePassword(data: InputDataProfilePassword) {
    return Api.put("/user", {
      password: data.password,
    });
  }

  updateAvatar(formData: FormData) {
    return Api.patch("/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

export const usersApi = new UsersApi();
