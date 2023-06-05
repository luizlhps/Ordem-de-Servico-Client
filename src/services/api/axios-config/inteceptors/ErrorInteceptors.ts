import { AxiosError } from "axios";
export const errorInteceptors = (error: AxiosError) => {
  if (error.response) {
    // Se ocorrer um erro de resposta HTTP, entre aqui
    if (error.response.status === 404) {
      // Trate o erro de página não encontrada
      console.error("Página não encontrada:", error);
    } else if (error.response.status === 401) {
      // Trate o erro de não autorizado
      console.error("Não autorizado:", error);
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
