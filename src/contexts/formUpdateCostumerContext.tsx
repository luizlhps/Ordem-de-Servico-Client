import { useState, createContext, useContext } from "react";

import { constumersApi } from "@/services/api/costumersApi";
import { orderApi } from "@/services/api/orderApi";
import { IDetailsStatus } from "@/services/api/statusApi";
import { useRouter } from "next/router";

export const formUpdateCostumerContext = createContext({} as Context);

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

export const FormUpdateCostumerProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [data, setData] = useState<ICustomer | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const { query } = useRouter();

  const idCustomer = query.costumerId;

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
    async function costumer(data: any, _id: string | string[]) {
      setLoading(true);
      console.log(data, _id);
      try {
        const res = await constumersApi.updateCostumer(data, _id);
        console.log(res);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
    if (idCustomer) {
      costumer(data, idCustomer);
    }
  }

  return (
    <formUpdateCostumerContext.Provider value={{ data, setFormValues, confirmData, test, loading }}>
      {children}
    </formUpdateCostumerContext.Provider>
  );
};

export const useFormData = () => useContext(formUpdateCostumerContext);
