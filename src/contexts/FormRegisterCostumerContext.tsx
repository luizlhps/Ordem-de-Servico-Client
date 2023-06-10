import { useState, createContext, useContext } from "react";

import { constumersApi } from "@/services/api/costumersApi";
import { orderApi } from "@/services/api/orderApi";
import { IDetailsStatus } from "@/services/api/statusApi";
import { FormSucessOrErrorContext, FormSucessOrErrorProvider } from "./formSuccessOrErrorContext";
import { statusApi } from "@/services/api/statusApi";

export const FormRegisterCostumerContext = createContext({} as Context);

type Context = {
  onDiscountChange?: () => void;
  data?: ICustomerAndOrderData;
  setFormValues?: any;
  confirmData?: () => void;
  loading: boolean;
};

export interface ICustomerAndOrderData {
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
}

export const FormRegisterCostumerProvider: React.FC<FormProviderProps> = ({ children, fetchApi }) => {
  const [data, setData] = useState<ICustomerAndOrderData | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const { setFormSuccess, setErrorMessage } = useContext(FormSucessOrErrorContext);

  const setFormValues = (values: any) => {
    setData((prevValues) => ({
      ...prevValues,
      ...values,
    }));
  };

  async function updateStatusForId(data: any) {
    const requestStatusApi = await statusApi.getAllStatus("", 0, 0);
    try {
      if (!(requestStatusApi instanceof Error)) {
        const { status } = requestStatusApi;
        const statusID = status.find((status: IDetailsStatus) => status.name === data?.status);

        const updateStatus = { ...data, status: statusID?._id };
        return updateStatus;
      } else {
        throw new Error("Ocorreu um erro ao encontrar o statusId");
      }
    } catch (error) {
      console.error(error);
    }
  }

  function confirmData() {
    async function costumer(data: any) {
      setLoading(true);
      try {
        const res = await constumersApi.createCostumer(await updateStatusForId(data));

        if (res instanceof Error) {
          throw new Error("Ocorreu um erro");
        }

        await order(await updateStatusForId(data), res.data._id);
        fetchApi();
      } catch (error: any) {
        setFormSuccess(false);
        console.error(error);
        setErrorMessage(error.response.data.message); //
      }
    }

    async function order(data: any, costumerId: string) {
      try {
        const res = await orderApi.createOrder(data, costumerId);
        setFormSuccess(true);
      } catch (error: any) {
        setFormSuccess(false);
        setErrorMessage(error.response.data.message); //
        console.error(error);
      } finally {
        fetchApi();
        setLoading(false);
      }
    }

    costumer(data);
  }

  return (
    <FormRegisterCostumerContext.Provider value={{ data, setFormValues, confirmData, loading }}>
      {children}
    </FormRegisterCostumerContext.Provider>
  );
};

export const useFormData = () => useContext(FormRegisterCostumerContext);
