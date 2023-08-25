import axios, { Axios, AxiosError } from "axios";
import { Api } from "..";
import Cookies from "js-cookie";
import { IResponseLogin } from "../../../../../types/auth";
import { useRouter } from "next/router";

let isRefreshing = false;
let failedQueue: Array<any> = [];

const processQueue = (error: any, token: any = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

export const errorInteceptors = async (error: any) => {
  const originalConfig = error.config;

  if (error.response) {
    // Se ocorrer um erro de resposta HTTP, entre aqui
    if (error.response.status === 404) {
      // Trate o erro de página não encontrada
      console.error("Página não encontrada:", error);
    } else if (error.response.status === 401) {
      console.log(error?.response?.data?.code);

      if (error?.response?.data?.code === "system.notConfig.store") {
        return (window.location.href = "/install?store");
      }
      if (error?.response?.data?.code === "system.notConfig.userAdmin") {
        return (window.location.href = "/install?user");
      }

      if (error?.response?.data?.code === "token.expired") {
        const tokenAuth = Cookies.get("auth");
        if (!tokenAuth) return console.error("Não autorizado:", error);

        const refreshObj = JSON.parse(tokenAuth, (key, value) => {
          try {
            return JSON.parse(value, (key, value) => {
              try {
                return JSON.parse(value);
              } catch (e) {
                return "error";
              }
            });
          } catch (e) {
            return value;
          }
        });
        const refreshToken = refreshObj.refreshToken;

        console.log(refreshToken);

        //Se outras solicitações chegarem durante o tempo em que a promessa de atualização do token está sendo resolvida, elas entrarão no bloco if (isRefreshing).
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((data: any) => {
              originalConfig.headers["Authorization"] = data.accessToken;
              Cookies.set("auth", JSON.stringify(data), {
                path: "/",
              });
              return Api(originalConfig);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }
        originalConfig._retry = true;
        isRefreshing = true;

        return new Promise((resolve, reject) => {
          Api.post<IResponseLogin>("/refreshToken", {
            refreshToken: refreshToken,
          })
            .then(({ data }) => {
              Cookies.set("auth", JSON.stringify(data), {
                path: "/",
              });
              Api.defaults.headers.common["Authorization"] = data.accessToken;
              originalConfig.headers["Authorization"] = data.accessToken;

              processQueue(null, data);
              resolve(axios(originalConfig));
            })
            .catch((err) => {
              processQueue(err, null);

              reject(err);
            })
            .then(() => {
              isRefreshing = false;
            });
        });
      } else {
        // Delogar e redirecionar
        Cookies.remove("auth");
        window.location.href = "/register"; // Redireciona para a página de registro
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
