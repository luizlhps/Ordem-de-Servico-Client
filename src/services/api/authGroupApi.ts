import { IPermissions, RootAuthGroup } from "../../../types/authGroup";
import { Api } from "./axios-config";

class AuthGroupApi {
  getAll(filter = "", page = 1, limit = 10) {
    return Api.get<RootAuthGroup>(`authGroup?filter=${filter}&page=${page}&limit=${limit}`);
  }
  create(name: string, permissions: IPermissions) {
    return Api.post(`authGroup`, {
      name: name,
      create: permissions.create,
      deleted: permissions.deleted,
      view: permissions.view,
      update: permissions.update,
    });
  }
}

export const authGroupApi = new AuthGroupApi();
