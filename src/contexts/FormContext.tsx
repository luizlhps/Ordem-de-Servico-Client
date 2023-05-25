import { constumersApi } from "@/services/api/costumersApi";
import { orderApi } from "@/services/api/orderApi";
import { IDetailsStatus } from "@/services/api/statusApi";
import { useState, createContext, useContext } from "react";

export const FormContext = createContext({} as Context);

type Context = {
  onDiscountChange?: () => void;
  data?: ICustomer;
  setFormValues?: any;
  confirmData?: () => void;
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

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [data, setData] = useState<ICustomer | undefined>(undefined);
  const [idCustomer, setIdCustomer] = useState<String>();

  console.log(data);
  if (data?.status) {
    if (data?.status.length > 0) {
      console.log(data.status[0]);
    }
  }
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
        console.log(res);
        setIdCustomer(res.data._id);
        await order(data, res.data._id);
      } catch (error) {
        console.error(error);
      }
    }

    async function order(data: any, costumerId: string) {
      try {
        console.log(data, costumerId);
        const res = await orderApi.createOrder(data, costumerId);
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
