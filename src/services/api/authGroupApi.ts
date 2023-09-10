import { RootAuthGroup } from "../../../types/authGroup";
import { Api } from "./axios-config";

class AuthGroupApi {
  getAll(filter = "", page = 1, limit = 10) {
    return Api.get<RootAuthGroup>(`authGroup?filter=${filter}&page=${page}&limit=${limit}`);
  }
}

export const authGroupApi = new AuthGroupApi();
