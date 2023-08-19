import { RootUser } from "../../../types/users";
import { Api } from "./axios-config";

class UsersApi {
  getById() {}
  getAll(filter = "", page = 1, limit = 10) {}

  GetMyInfo() {
    return Api.get<RootUser>("/me");
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
