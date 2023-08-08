import axios, { InternalAxiosRequestConfig } from "axios";

import { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

export const requestInteceptor = async (config: InternalAxiosRequestConfig<any>) => {
  const cookie = Cookies.get("auth");

  if (cookie && cookie !== "undefined") {
    const token = JSON.parse(cookie);
    config.headers!["Authorization"] = token.accessToken ? `${token.accessToken}` : "";
    return config;
  }
  return config;
};
