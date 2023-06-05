export interface IToastError {
  errorMessage: any;
  formError: boolean;
  setFormError: any;
}

export interface IToastSuccess {
  formSuccess: boolean;
  setFormSuccess: (value: boolean) => void;
  alertSuccess: string | undefined;
}
