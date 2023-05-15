import axios from "axios";
import { Api } from "./axios-config";

class AdminPanel {
  getAdmin = () => {
    const resp = Api.get("http://localhost:8000/admin").then((res: any) => {
      return res;
    });
  };
}

export const adminPanel = new AdminPanel();
