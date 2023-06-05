import { useState, createContext, useContext, Dispatch, SetStateAction } from "react";

interface Context {
  setFormError: Dispatch<SetStateAction<boolean>>;
  formError: boolean;
  formSuccess: boolean;
  errorMessage: any;
  setFormSuccess: any;
  setErrorMessage: Dispatch<any>;
  setMessageForm: Dispatch<any>;
  messageForm: any;
}

interface IProviderProps {
  children: React.ReactNode;
}

export const FormSucessOrErrorContext = createContext({} as Context);
export const useFormData = () => useContext(FormSucessOrErrorContext);

export const FormSucessOrErrorProvider: React.FC<IProviderProps> = ({ children }) => {
  const [formError, setFormError] = useState<boolean>(false);
  const [formSuccess, setFormSuccess] = useState<boolean>(false);

  const [messageForm, setMessageForm] = useState<string | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<any>(undefined);

  console.log(errorMessage);

  return (
    <FormSucessOrErrorContext.Provider
      value={{
        setFormError,

        formSuccess,
        errorMessage,
        formError,
        setFormSuccess,
        setErrorMessage,

        setMessageForm,
        messageForm,
      }}
    >
      {children}
    </FormSucessOrErrorContext.Provider>
  );
};
