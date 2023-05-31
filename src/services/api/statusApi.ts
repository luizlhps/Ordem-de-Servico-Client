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
  async getAllStatus(filter = "", page = 1, limit = 5): Promise<TStatusData | Error> {
    try {
      const { data } = await Api.get(`status/?filter=${filter}&page=${page}&limit=${limit}`);

      if (data) {
        return data as TStatusData;
      }

      return new Error("Erro ao listar os status.");
    } catch (error) {
      console.error(error);
      throw new Error((error as { message: string }).message || "Erro ao listar os status.");
    }
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

  async deleteStatus(_id: string) {
    const res = Api.delete(`status/${_id}`);
    return res;
  }
}

export const statusApi = new Status();
