export interface IToastError {
  errorMessage: string;
  formError: boolean;
  setFormError: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IToastSuccess {
  formSuccess: boolean;
  setFormSuccess: (value: boolean) => void;
  alertSuccess: string | undefined;
}
