import { useState, createContext, useContext, Dispatch, useEffect } from "react";
import { FormSucessOrErrorContext } from "./formSuccessOrErrorContext";
import { IDetailsStatus, statusApi } from "@/services/api/statusApi";
import { orderApi } from "@/services/api/orderApi";
import { constumersApi } from "@/services/api/costumersApi";

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
  orderID: string;
  orderData: any;
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
export const FormUpdateOrderContext = createContext({} as IContext);

export const FormUpdateOrderProvider: React.FC<FormProviderProps> = ({ children, fetchApi, orderData, orderID }) => {
  const [data, setData] = useState<ICustomerAndOrderData | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const [costumerId, setCostumerId] = useState<string | undefined>(undefined);
  const { setFormSuccess, setErrorMessage } = useContext(FormSucessOrErrorContext);
  console.log(data);

  console.log(orderData);

  useEffect(() => {
    if (orderData.equipment) {
      const form = {
        equipment: orderData.equipment,
        defect: orderData.defect,
        observation: orderData.observation,
        dateEntry: orderData.dateEntry,
        status: orderData.status,
        brand: orderData.brand,
        model: orderData.model,

        costumer: orderData.customer,
        services: orderData.services,
        discount: orderData.discount,
        exitDate: orderData.exitDate,
        technicalOpinion: orderData.technicalOpinion,

        //Andress
      };
      setData((prevValues: any) => ({
        ...prevValues,
        ...form,
      }));
    }
  }, [orderData]);

  const setFormValues = (values: any) => {
    setData((prevValues) => ({
      ...prevValues,
      ...values,
    }));
  };

  const requestInfoCostumer = async () => {
    try {
      if (costumerId && data) {
        const requestCostumersApi = await constumersApi.getAllCostumers("", 0, 0);

        if (!(requestCostumersApi instanceof Error)) {
          const { data } = requestCostumersApi;

          const infoCostumer = data.customer.find((costumerInfo: any) => costumerInfo._id === costumerId);

          const nameAndPhone = {
            name: infoCostumer.name,
            phone: infoCostumer.phone,
          };
          setData((oldValue: any) => ({
            ...oldValue,
            ...nameAndPhone,
          }));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    requestInfoCostumer();
  }, [costumerId]);

  function confirmData() {
    async function createOrder(data: any, costumerId: string) {
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

        const res = await orderApi.createOrder(await statusUpdateId(), costumerId);
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
    createOrder(data, costumerId);
  }
  return (
    <>
      <FormUpdateOrderContext.Provider value={{ loading, confirmData, data, setFormValues, setCostumerId }}>
        {children}
      </FormUpdateOrderContext.Provider>
    </>
  );
};

export const useFormData = () => useContext(FormUpdateOrderContext);
