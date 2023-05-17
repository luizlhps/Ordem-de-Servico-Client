import { Api } from "./axios-config";

export interface IStatus {
  name: string;
}

class Status {
  async getAllStatus(filter = "", page = 1, limit = 5) {
    const res = Api.get(`status/?filter=${filter}&page=${page}&limit=${limit}`);
    return res;
  }
  async createStatus(data: IStatus) {
    const res = Api.post("status", {
      name: data.name,
    });
    return res;
  }
  async updateStatus(data: IStatus, _id: string) {
    const res = Api.post(`status/${_id}`, {
      name: data.name,
    });
    return res;
  }
  async deleteStatus(_id: string) {
    const res = Api.post(`status/${_id}`);
    return res;
  }
}

export const statusApi = new Status();
