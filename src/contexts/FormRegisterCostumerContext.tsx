import { useState, createContext, useContext } from "react";

import { constumersApi } from "@/services/api/costumersApi";
import { orderApi } from "@/services/api/orderApi";
import { IDetailsStatus } from "@/services/api/statusApi";
import { FormSucessOrErrorContext, FormSucessOrErrorProvider } from "./formSuccessOrErrorContext";

export const FormRegisterCostumerContext = createContext({} as Context);

type Context = {
  onDiscountChange?: () => void;
  data?: ICustomer;
  setFormValues?: any;
  confirmData?: () => void;
  test: (valor: any) => void;
  loading: boolean;
};

export interface ICustomer {
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
}

export const FormRegisterCostumerProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [data, setData] = useState<ICustomer | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const { setFormSucessoValue, setErrorMessageValue, setFormErrorValue } = useContext(FormSucessOrErrorContext);

  console.log(data);

  if (data?.status) {
    if (data?.status.length > 0) {
      console.log(data.status[0]);
    }
  }

  const setFormValues = (values: any) => {
    console.log("exist", values);
    setData((prevValues) => ({
      ...prevValues,
      ...values,
    }));
  };

  const test = (valor: any) => {
    console.log(valor);
  };

  function confirmData() {
    async function costumer(data: any) {
      setLoading(true);
      try {
        const res = await constumersApi.createCostumer(data);
        console.log(res);

        if (res instanceof Error) {
          throw new Error("Ocorreu um erro");
        }
        await order(data, res.data._id);
      } catch (error: any) {
        setFormSucessoValue(false);
        console.error(error);
        setErrorMessageValue(error.response.data.message); //
      }
    }

    async function order(data: any, costumerId: string) {
      try {
        console.log(data, costumerId);
        const res = await orderApi.createOrder(data, costumerId);
        setFormSucessoValue(true);
      } catch (error) {
        setFormSucessoValue(false);
        console.error(error);
      }
      setLoading(false);
    }

    costumer(data);
  }

  return (
    <FormRegisterCostumerContext.Provider value={{ data, setFormValues, confirmData, test, loading }}>
      {children}
    </FormRegisterCostumerContext.Provider>
  );
};

export const useFormData = () => useContext(FormRegisterCostumerContext);
