import { useState, createContext, useContext, Dispatch } from "react";
import { FormSucessOrErrorContext } from "./formSuccessOrErrorContext";
import { IDetailsStatus, statusApi } from "@/services/api/statusApi";
import { orderApi } from "@/services/api/orderApi";

interface IContext {
  onDiscountChange?: () => void;
  data?: ICustomerAndOrderData;
  setFormValues?: any;
  setCostumerId: Dispatch<string>;
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
  const [costumerId, setCostumerId] = useState<string | undefined>(undefined);

  const { setFormSuccess, setErrorMessage } = useContext(FormSucessOrErrorContext);

  console.log(costumerId);
  console.log(data);

  const setFormValues = (values: any) => {
    console.log("exist", values);
    setData((prevValues) => ({
      ...prevValues,
      ...values,
    }));
  };

  function confirmData() {
    async function order(data: any, costumerId: string) {
      try {
        console.log(data, costumerId);
        const res = await orderApi.createOrder(data, costumerId);
        setFormSuccess(true);
        fetchApi();
      } catch (error: any) {
        setFormSuccess(false);
        setErrorMessage(error.response.data.message); //
        console.error(error);
      }
      setLoading(false);
    }
    if (!costumerId) return new Error("O id do cliente não foi selecionado");
    order(data, costumerId);
  }
  return (
    <>
      <FormRegisterOrderContext.Provider value={{ loading, confirmData, data, setFormValues, setCostumerId }}>
        {children}
      </FormRegisterOrderContext.Provider>
    </>
  );
};

export const useFormData = () => useContext(FormRegisterOrderContext);
