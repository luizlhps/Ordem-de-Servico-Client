import { useState, createContext, useContext, useEffect } from "react";

import { constumersApi } from "@/services/api/costumersApi";
import { orderApi } from "@/services/api/orderApi";
import { IDetailsStatus } from "@/services/api/statusApi";
import { useRouter } from "next/router";
import { FormSucessOrErrorContext } from "./formSuccessOrErrorContext";

export const formUpdateCostumerContext = createContext({} as Context);

type Context = {
  onDiscountChange?: () => void;
  data?: ICustomer;
  setFormValues?: any;
  confirmData?: () => void;
  loading: boolean;
};
interface ICustomer {
  id: number;
  name: string;
  email: string;
  contact: string;
  phone: string;
  cpfOrCnpj: string;
  tel: string;
  orders: any[];
  createdAt: string;
  updatedAt: string;
  cep: string;
  state: string;
  neighborhood: string;
  street: string;
  city: string;
  number: string;
  complement: string;
  _id: string;

  //equipament
  equipment: string;
  brand: string;
  dateEntry: string;
  model: string;
  defect: string;
  status: string;
}

interface FormProviderProps {
  children: React.ReactNode;
  fetchApi: () => void;
  CostumerID: string;
  CostumerData: any;
}

export const FormUpdateCostumerProvider: React.FC<FormProviderProps> = ({
  children,
  fetchApi,
  CostumerID,
  CostumerData,
}) => {
  const [data, setData] = useState<ICustomer | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const { setFormSuccess, setErrorMessage } = useContext(FormSucessOrErrorContext);

  console.log(CostumerData);

  if (data?.status) {
    if (data?.status.length > 0) {
      console.log(data.status[0]);
    }
  }
  useEffect(() => {
    if (CostumerData.address && CostumerData.address.length > 0) {
      const form = {
        name: CostumerData.name,
        email: CostumerData.email,
        contact: CostumerData.contact,
        cpfOrCnpj: CostumerData.cpfOrCnpj,
        phone: CostumerData.phone,
        tel: CostumerData.tel,
        address: [
          {
            cep: CostumerData?.address[0].cep,
            state: CostumerData.address[0].state,
            neighborhood: CostumerData.address[0].neighborhood,
            street: CostumerData.address[0].street,
            city: CostumerData.address[0].city,
            number: CostumerData.address[0].number,
            complement: CostumerData.address[0].complement,
          },
        ],

        //Andress
      };
      const streetValue = form.address[0].street;
      console.log(streetValue);
      setData((prevValues: any) => ({
        ...prevValues,
        ...form,
      }));
    }
  }, [CostumerData]);

  console.log(data);

  const setFormValues = (values: any) => {
    console.log("exist", values);

    setData((prevValues) => ({
      ...prevValues,
      ...values,
    }));
  };

  console.log(data);

  function confirmData() {
    async function costumer(data: any, _id: string | string[]) {
      setLoading(true);
      console.log(data, _id);
      try {
        const res = await constumersApi.updateCostumer(data, _id);
        console.log(res);

        if (res instanceof Error) {
          throw new Error("Ocorreu um erro");
        }

        setFormSuccess(true);
      } catch (error: any) {
        setFormSuccess(false);
        console.error(error);
        setErrorMessage(error.response.data.message); //
      } finally {
        setLoading(false);
        fetchApi();
      }
    }

    costumer(data, CostumerID);
  }

  return (
    <formUpdateCostumerContext.Provider value={{ data, setFormValues, confirmData, loading }}>
      {children}
    </formUpdateCostumerContext.Provider>
  );
};

export const useFormData = () => useContext(formUpdateCostumerContext);
