import { useState, createContext, useContext } from "react";

export const FormContext = createContext({} as Context);

type Context = {
  onDiscountChange?: any;
  data?: any;
  setFormValues?: any;
};

interface FormProviderProps {
  children: React.ReactNode;
}

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [data, setData] = useState({});

  const setFormValues = (values: any) => {
    setData((prevValues) => ({
      ...prevValues,
      ...values,
    }));
  };

  console.log(data);
  return (
    <FormContext.Provider value={{ data, setFormValues }}>{children}</FormContext.Provider>
  );
};

export const useFormData = () => useContext(FormContext);