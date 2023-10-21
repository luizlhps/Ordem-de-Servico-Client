import Axios, { AxiosInstance, AxiosRequestConfig } from "axios";

import { responseInteceptor } from "./inteceptors/ResponseInterceptors";
import { errorInteceptors } from "./inteceptors/ErrorInteceptors";
import { requestInteceptor } from "./inteceptors/RequestInterceptors";

console.log(process.env.NEXT_PUBLIC_BASE_URL);

export function setupApiClientSide(contextCookie = undefined) {
  const Api: AxiosInstance = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  });

  Api.interceptors.request.use(
    async function (config) {
      return await requestInteceptor(config, contextCookie);
    },
    (error) => errorInteceptors(error, contextCookie)
  );

  Api.interceptors.response.use(responseInteceptor, errorInteceptors);
  return Api;
}

export const Api = setupApiClientSide();
