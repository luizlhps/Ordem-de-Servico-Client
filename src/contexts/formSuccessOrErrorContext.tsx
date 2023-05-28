import { useState, createContext, useContext, Dispatch, SetStateAction } from "react";

interface Context {
  setFormError: Dispatch<SetStateAction<boolean>>;
  formError: boolean;
  setFormSucessoValue: (value: boolean) => void;
  formSuccess: boolean;
  setFormErrorValue: (value: boolean) => void;
  setErrorMessageValue: (value: any) => void;
  errorMessage: any;
  setFormSuccess: any;
  setErrorMessage: Dispatch<any>;
}

interface IProviderProps {
  children: React.ReactNode;
}

export const FormSucessOrErrorContext = createContext({} as Context);
export const useFormData = () => useContext(FormSucessOrErrorContext);

export const FormSucessOrErrorProvider: React.FC<IProviderProps> = ({ children }) => {
  const [formError, setFormError] = useState<boolean>(false);
  const [formSuccess, setFormSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<any>(undefined);

  const setFormSucessoValue = (value: boolean) => {
    if (value) {
      setFormSuccess(value);
    }
  };
  const setFormErrorValue = (value: boolean) => {
    if (value) {
      setFormError(value);
    }
  };
  const setErrorMessageValue = (value: any) => {
    if (value) {
      setErrorMessage(value);
    }
  };

  return (
    <FormSucessOrErrorContext.Provider
      value={{
        setFormError,
        setFormErrorValue,
        setErrorMessageValue,
        setFormSucessoValue,
        formSuccess,
        errorMessage,
        formError,
        setFormSuccess,
        setErrorMessage,
      }}
    >
      {children}
    </FormSucessOrErrorContext.Provider>
  );
};
