import { useState, createContext, useContext, Dispatch, useEffect } from "react";
import { FormSucessOrErrorContext } from "./formSuccessOrErrorContext";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import { IDetailsStatus, statusApi } from "@/services/api/statusApi";
import { orderApi } from "@/services/api/orderApi";
import { ICostumerData, constumersApi } from "@/services/api/costumersApi";
import { ICustomer } from "@/pages/clients";
import { Order } from "../../types/order";

interface IContext {
  onDiscountChange?: () => void;
  data?: ICustomerAndOrderData;
  setFormValues?: any;
  costumer: ICustomer | undefined;
  setCostumer: Dispatch<ICustomer | undefined>;
  confirmData?: () => void;
  loading: boolean;
}

interface FormProviderProps {
  children: React.ReactNode;
  fetchApi: () => void;
  orderID: string | undefined;
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
  console.log(orderData);

  if (orderData) {
    const pre = {
      _id: orderData.customer?._id,
      id: orderData.customer?.id,
      name: orderData.customer?.name,
      email: orderData.customer?.email,
      contact: orderData.customer?.contact,
      phone: orderData.customer?.phone,
      cpfOrCnpj: orderData.customer?.cpfOrCnpj,
      telephone: orderData.customer?.telephone,
      address: orderData.customer?.address,
      orders: orderData.customer?.orders,
      createdAt: orderData.customer?.createdAt,
      updatedAt: orderData.customer?.updatedAt,
    };
  }

  const [costumer, setCostumer] = useState<ICustomer | undefined>();
  const { setFormSuccess, setErrorMessage } = useContext(FormSucessOrErrorContext);

  const orderDataServices: string[] = [];

  orderData?.services?.map((item: any) => {
    orderDataServices.push(item._id);
  });
  useEffect(() => {
    if (orderData) {
      const form = {
        equipment: orderData.equipment,
        defect: orderData.defect,
        observation: orderData.observation,
        dateEntry: orderData.dateEntry,
        status: orderData.status.name,
        brand: orderData.brand,
        model: orderData.model,

        phone: orderData.customer.phone,
        name: orderData.customer._id,
        costumer: orderData.customer.name,
        services: orderDataServices,
        discount: orderData.discount,
        exitDate: orderData.exitDate,
        technicalOpinion: orderData.technicalOpinion,
      };

      /*  setCostumer(pre); */

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

  function confirmData() {
    if (!orderData._id) return new Error("O id do cliente não foi selecionado");
    console.log(data);
    updateOrder(data, orderData._id);
    async function updateOrder(data: any, costumer: string) {
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

        if (orderID) {
          const res = await orderApi.updateOrder(await statusUpdateId(), orderID);
        }
        setFormSuccess(true);
        fetchApi();
      } catch (error: any) {
        setFormSuccess(false);
        setErrorMessage(error.response.data.message); //
        console.error(error);
      }
      setLoading(false);
    }
  }

  return (
    <>
      <FormUpdateOrderContext.Provider value={{ loading, confirmData, data, setFormValues, setCostumer, costumer }}>
        {children}
      </FormUpdateOrderContext.Provider>
    </>
  );
};

export const useFormData = () => useContext(FormUpdateOrderContext);
