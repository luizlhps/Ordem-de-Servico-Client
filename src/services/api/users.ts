import { RootUser } from "../../../types/users";
import { Api } from "./axios-config";

class UsersApi {
  getById() {
    return Api.get<RootUser>(`/me`);
  }
  getAll(filter = "", page = 1, limit = 10) {}
}

export const usersApi = new UsersApi();
