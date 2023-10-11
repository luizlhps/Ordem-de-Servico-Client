import { useState, createContext, useContext, useEffect } from "react";

import { orderApi } from "@/services/api/orderApi";
import { IDetailsStatus } from "@/services/api/statusApi";
import { useRouter } from "next/router";
import { FormSucessOrErrorContext } from "./formSuccessOrErrorContext";
import { customersApi } from "@/services/api/customersApi";

export const formUpdateCustomerContext = createContext({} as Context);

type Context = {
  onDiscountChange?: () => void;
  data?: ICustomer;
  setFormValues?: any;
  confirmData?: () => void;
  loading: boolean;
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
  CustomerID: string;
  CustomerData: any;
}

export const FormUpdateCustomerProvider: React.FC<FormProviderProps> = ({
  children,
  fetchApi,
  CustomerID,
  CustomerData,
}) => {
  const [data, setData] = useState<ICustomer | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const { setFormSuccess, setErrorMessage } = useContext(FormSucessOrErrorContext);

  useEffect(() => {
    if (CustomerData.address && CustomerData.address.length > 0) {
      const form = {
        name: CustomerData.name,
        email: CustomerData.email,
        contact: CustomerData.contact,
        cpfOrCnpj: CustomerData.cpfOrCnpj,
        phone: CustomerData.phone,
        tel: CustomerData.tel,
        address: [
          {
            cep: CustomerData?.address[0].cep,
            state: CustomerData.address[0].state,
            neighborhood: CustomerData.address[0].neighborhood,
            street: CustomerData.address[0].street,
            city: CustomerData.address[0].city,
            number: CustomerData.address[0].number,
            complement: CustomerData.address[0].complement,
          },
        ],

        //Andress
      };
      setData((prevValues: any) => ({
        ...prevValues,
        ...form,
      }));
    }
  }, [CustomerData]);

  const setFormValues = (values: any) => {
    setData((prevValues) => ({
      ...prevValues,
      ...values,
    }));
  };

  function confirmData() {
    async function customer(data: any, _id: string | string[]) {
      setLoading(true);
      try {
        const res = await customersApi.updateCustomer(data, _id);

        if (res instanceof Error) {
          throw new Error("Ocorreu um erro");
        }

        setFormSuccess(true);
      } catch (error: any) {
        setFormSuccess(false);
        console.error(error);
        setErrorMessage(error.response.data.message); //
      } finally {
        setLoading(false);
        fetchApi();
      }
    }

    customer(data, CustomerID);
  }

  return (
    <formUpdateCustomerContext.Provider value={{ data, setFormValues, confirmData, loading }}>
      {children}
    </formUpdateCustomerContext.Provider>
  );
};

export const useFormData = () => useContext(formUpdateCustomerContext);
