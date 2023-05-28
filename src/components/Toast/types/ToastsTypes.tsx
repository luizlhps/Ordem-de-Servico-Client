export interface IToastError {
  errorMessage: any;
  setErrorMessageValue: (value: any) => void;
  setErrorMessage: React.Dispatch<any>;
}

export interface IToastSuccess {
  formSuccess: boolean;
  setFormSucessoValue: (value: boolean) => void;
  alertSuccess: string | undefined;
}
