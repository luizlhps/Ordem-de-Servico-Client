import { IFilterSearchStatus } from "@/hook/useGetFetchStatus";
import { Api } from "./axios-config";

export interface IStatus {
  name: string;
}
export interface IDetailsStatus {
  _id: string;
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export type TStatusData = {
  page: number;
  limit: number;
  total: number;
  status: IDetailsStatus[];
};

class Status {
  async getAllStatus(filter: IFilterSearchStatus = { search: "" }, page = 1, limit = 5, deleted: "" | boolean = false) {
    return Api.get<TStatusData>(
      `status/?filter=${JSON.stringify(filter)}&page=${page}&limit=${limit}&deleted=${deleted}`
    );
  }

  async createStatus(data: IStatus) {
    const res = Api.post("status", {
      name: data.name,
    });
    return res;
  }

  async updateStatus(data: IStatus, _id: string) {
    const res = Api.put(`status/${_id}`, {
      name: data.name,
    });
    return res;
  }

  deleteStatus(_id: string) {
    return Api.delete(`status/${_id}`);
  }
}

export const statusApi = new Status();
