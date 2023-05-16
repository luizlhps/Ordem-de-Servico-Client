import { AxiosError } from "axios";
export const errorInteceptors = (error: AxiosError) => {
  // Se ocorrer um erro na requisição, entra aqui
  if (error.status === 404) {
    // Trata o erro de página não encontrada
    console.error("Página não encontrada:", error);
  } else if (error.status === 401) {
    // Trata o erro de não autorizado
    console.error("Não autorizado:", error);
  } else {
    // Trata qualquer outro erro
    console.error("Ocorreu um erro na requisição:", error);
  }
  return Promise.reject(error);
};
