import { RootUser } from "../../../types/users";
import { Api } from "./axios-config";

class UsersApi {
  getById() {}
  getAll(filter = "", page = 1, limit = 10) {}

  GetMyInfo() {
    return Api.get<RootUser>("/me");
  }
}

export const usersApi = new UsersApi();
