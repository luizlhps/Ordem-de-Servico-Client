import axios, { InternalAxiosRequestConfig } from "axios";

import { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

export const requestInteceptor = async (config: InternalAxiosRequestConfig<any>) => {
  const cookie = Cookies.get("auth");

  if (cookie && cookie !== "undefined") {
    let token;
    try {
      token = JSON.parse(cookie);
    } catch (error: any) {
      console.error("Erro ao analisar o JSON do cookie:", error.message);
    }
    config.headers!["Authorization"] = token.accessToken ? `${token.accessToken}` : "";
    return config;
  }
  return config;
};
