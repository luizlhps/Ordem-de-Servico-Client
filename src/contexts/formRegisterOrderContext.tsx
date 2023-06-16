import { useState, createContext, useContext, Dispatch, useEffect } from "react";
import { FormSucessOrErrorContext } from "./formSuccessOrErrorContext";
import { IDetailsStatus, statusApi } from "@/services/api/statusApi";
import { orderApi } from "@/services/api/orderApi";
import { constumersApi } from "@/services/api/costumersApi";
import { ICustomer } from "@/pages/clients";

interface IContext {
  onDiscountChange?: () => void;
  data?: ICustomerAndOrderData;
  setFormValues?: any;
  setCostumer: React.Dispatch<ICustomer | undefined>;
  costumer: ICustomer | undefined;
  confirmData?: () => void;
  loading: boolean;
}

interface FormProviderProps {
  children: React.ReactNode;
  fetchApi: () => void;
}

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
export const FormRegisterOrderContext = createContext({} as IContext);

export const FormRegisterOrderProvider: React.FC<FormProviderProps> = ({ children, fetchApi }) => {
  const [data, setData] = useState<ICustomerAndOrderData | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [costumer, setCostumer] = useState<ICustomer | undefined>(undefined);

  const { setFormSuccess, setErrorMessage } = useContext(FormSucessOrErrorContext);

  const setFormValues = (values: any) => {
    setData((prevValues) => ({
      ...prevValues,
      ...values,
    }));
  };

  function confirmData() {
    async function createOrder(data: any, costumer: string) {
      try {
        const statusUpdateId = async () => {
          try {
            const requestStatusApi = await statusApi.getAllStatus("", 0, 0);

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
        };

        const res = await orderApi.createOrder(await statusUpdateId(), costumer);
        setFormSuccess(true);
        fetchApi();
      } catch (error: any) {
        setFormSuccess(false);
        setErrorMessage(error.response.data.message); //
        console.error(error);
      }
      setLoading(false);
    }

    if (!costumer) return new Error("O id do cliente não foi selecionado");
    createOrder(data, costumer._id);
  }
  return (
    <>
      <FormRegisterOrderContext.Provider value={{ loading, confirmData, data, setFormValues, setCostumer, costumer }}>
        {children}
      </FormRegisterOrderContext.Provider>
    </>
  );
};

export const useFormData = () => useContext(FormRegisterOrderContext);
