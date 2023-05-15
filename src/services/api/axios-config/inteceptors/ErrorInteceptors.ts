import { AxiosError } from "axios";
export const errorInteceptors = (error: AxiosError) => {
  if (error.message === "Network Error") {
    return Promise.reject(new Error("erro de conexão"));
  }

  if (error.status === 401) {
    //
  }

  return Promise.reject(error);
};
