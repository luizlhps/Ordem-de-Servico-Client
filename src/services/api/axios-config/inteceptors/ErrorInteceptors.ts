import { Axios, AxiosError } from "axios";
import { Api } from "..";
import Cookies from "js-cookie";
import { IResponseLogin } from "../../../../../types/auth";

const tokenAuth = Cookies.get("auth");
let isRefreshing = false;
let failedRequest: Array<any> = [];

export const errorInteceptors = async (error: any) => {
  const originalConfig = error.config;

  if (error.response) {
    // Se ocorrer um erro de resposta HTTP, entre aqui
    if (error.response.status === 404) {
      // Trate o erro de página não encontrada
      console.error("Página não encontrada:", error);
    } else if (error.response.status === 401) {
      if (error?.response?.data?.code === "token.expired") {
        if (!tokenAuth) return console.error("Não autorizado:", error);

        const refreshObj = JSON.parse(tokenAuth);
        const refreshToken = refreshObj.refreshToken;

        console.log(refreshToken);

        if (!isRefreshing) {
          isRefreshing = true;
          try {
            const res = await Api.post<IResponseLogin>("/refreshToken", {
              refreshToken: refreshToken,
            });
            const resJSON = JSON.stringify(res.data);
            Cookies.set("auth", resJSON, {
              path: "/",
            });

            console.log(originalConfig);

            failedRequest.forEach((req) => {
              req.onSuccess(res.data.accessToken);
            });
            failedRequest = [];
          } catch (error) {
            failedRequest.forEach((req) => req.onFailure(error));
            failedRequest = [];
          } finally {
            isRefreshing = false;
          }

          //armazena as requisições enquanto atualiza o token para assim executar novamente
          return new Promise((resolve, reject) => {
            failedRequest = [
              {
                onSuccess(token: string) {
                  originalConfig.headers["Authorization"] = token;
                  resolve(Api(originalConfig));
                },
                onFailure(error: AxiosError) {
                  reject(Error);
                },
              },
            ];
          });
        } else {
        }
      }
      // Trate o erro de não autorizado
      console.error("Não autorizado:", error);
    } else if (error.response.status === 403) {
    } else {
      // Trate qualquer outro erro
      console.error("Ocorreu um erro na requisição:", error);
    }
  } else {
    // Se ocorrer um erro na requisição, entre aqui
    console.error("Ocorreu um erro na requisição:", error);
  }

  return Promise.reject(error);
};
