import Axios, { AxiosInstance, AxiosRequestConfig } from "axios";

import { responseInteceptor } from "./inteceptors/ResponseInterceptors";
import { errorInteceptors } from "./inteceptors/ErrorInteceptors";
import { requestInteceptor } from "./inteceptors/RequestInterceptors";

export const Api: AxiosInstance = Axios.create({
  baseURL: "http://localhost:8000/",
  withCredentials: false,
});

Api.interceptors.request.use(
  async function (config) {
    return await requestInteceptor(config);
  },
  (error) => errorInteceptors(error)
);

Api.interceptors.response.use(responseInteceptor, errorInteceptors);
