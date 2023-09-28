import { CepSearch } from "@/services/api/SearchCep";
import { useDebouse } from "./useDebouse";
import { useEffect, useState } from "react";

export interface ICepRoot {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

//Search Cep
const useSearchCep = (cepValue: string | undefined) => {
  const { debouse } = useDebouse();
  const [cepError, setCepError] = useState<boolean>(false);
  const [cepData, setCepData] = useState<ICepRoot>();

  useEffect(() => {
    if (cepValue?.split("").length === 8) {
      try {
        debouse(() => {
          CepSearch.getSeachCep(cepValue).then((dataCepApi) => {
            if (dataCepApi.erro) {
              setCepError(true);
              return;
            }
            setCepError(false);
            setCepData(dataCepApi);
          });
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, [cepValue]);

  return {
    cepError,
    cepData,
  };
};

export default useSearchCep;
