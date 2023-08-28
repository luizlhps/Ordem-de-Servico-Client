import axios from "axios";
import { Api } from "./axios-config";

class AdminPanel {
  getAdmin = () => {
    return Api.get("http://localhost:8000/admin");
  };
}

export const adminPanel = new AdminPanel();
