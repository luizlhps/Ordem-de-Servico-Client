import { constumersApi } from "@/services/api/costumersApi";
import { useState, createContext, useContext } from "react";

export const FormContext = createContext({} as Context);

type Context = {
  onDiscountChange?: any;
  data?: ICustomer;
  setFormValues?: any;
  confirmData?: any;
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
  description: string;
  stats: string;
}

interface FormProviderProps {
  children: React.ReactNode;
}

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [data, setData] = useState<ICustomer>();
  console.log(data);

  const batata = data?.equipment;

  const setFormValues = (values: any) => {
    setData((prevValues) => ({
      ...prevValues,
      ...values,
    }));
  };

  function confirmData() {
    async function costumer(data: any) {
      try {
        const res = await constumersApi.createCostumer(data);
      } catch (error) {
        console.error(error);
      }
    }
    async function order(data: any) {
      try {
        console.log(data, "existo");
        /* const res = await constumersApi.createCostumer(data); */
      } catch (error) {
        console.error(error);
      }
    }

    costumer(data);
  }

  const equipment = {};

  return <FormContext.Provider value={{ data, setFormValues, confirmData }}>{children}</FormContext.Provider>;
};

export const useFormData = () => useContext(FormContext);
