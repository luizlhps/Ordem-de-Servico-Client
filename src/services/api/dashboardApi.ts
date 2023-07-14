import { IDashboard } from "../../../types/dashboard";
import { Api } from "./axios-config";

class DashBoardApi {
  getDashboard() {
    return Api.get<IDashboard>("/dashboard");
  }
}

export const dashboardApi = new DashBoardApi();
