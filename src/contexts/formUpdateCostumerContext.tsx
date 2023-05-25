import { constumersApi } from "@/services/api/costumersApi";
import React, { useState, createContext, useContext } from "react";

type Context = {
  onDiscountChange?: () => void;
  setFormValues?: any;
  data?: ICustomer;
  confirmData?: () => void;
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
}

interface FormProviderProps {
  children: React.ReactNode;
}

export const formUpdateCostumerContext = createContext({} as Context);

export const FormUpdateCostumerProvider = ({ children }: FormProviderProps) => {
  const [data, setData] = useState<ICustomer | undefined>(undefined);
  const [idCustomer, setIdCustomer] = useState<String>();

  const setFormValues = (values: any) => {
    setData((prevValues) => ({
      ...prevValues,
      ...values,
    }));
  };

  function confirmData() {
    /*       async function costumer(data: any) {
        try {
          const res = await constumersApi.(data);
          console.log(res);

        } catch (error) {
          console.error(error);
        } */
  }
  return (
    <>
      <formUpdateCostumerContext.Provider value={{ data }}>{children}</formUpdateCostumerContext.Provider>
    </>
  );
};

export const FormUpdateCostumerData = () => useContext(formUpdateCostumerContext);
