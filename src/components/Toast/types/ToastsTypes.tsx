export interface IToastError {
  errorMessage: any;
  setErrorMessage: React.Dispatch<any>;
}

export interface IToastSuccess {
  formSuccess: boolean;
  setFormSuccess: (value: boolean) => void;
  alertSuccess: string | undefined;
}
