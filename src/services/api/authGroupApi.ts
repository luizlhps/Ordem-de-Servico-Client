import { IFilterSearchOfficials } from "@/hook/useGetFetchOfficials";
import { IPermissions, RootAuthGroup } from "../../../types/authGroup";
import { Api } from "./axios-config";

class AuthGroupApi {
  getAll(filter: IFilterSearchOfficials = { customer: "", search: "", status: "" }, page = 1, limit = 10) {
    return Api.get<RootAuthGroup>(`authGroup?filter=${JSON.stringify(filter)}&page=${page}&limit=${limit}`);
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
  update(name: string, permissions: IPermissions, id: string) {
    return Api.put(`authGroup/${id}`, {
      name: name,
      create: permissions.create,
      deleted: permissions.deleted,
      view: permissions.view,
      update: permissions.update,
    });
  }

  delete(id: string) {
    return Api.delete(`authGroup/${id}`);
  }
}

export const authGroupApi = new AuthGroupApi();
