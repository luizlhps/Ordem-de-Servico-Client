import React, { useState, useEffect } from "react";
import { Alert, Button, Snackbar, SnackbarOrigin, Stack, TextField, useTheme } from "@mui/material";

interface State extends SnackbarOrigin {
  open: boolean;
}

interface IToast {
  formSuccess: boolean;
  errorMessage: any;
  setFormSucessoValue: (value: boolean) => void;
  setErrorMessageValue: (value: any) => void;
}

export const ToastError: React.FC<IToast> = ({
  formSuccess,
  errorMessage,
  setFormSucessoValue,
  setErrorMessageValue,
}) => {
  const [sucessState, setSucessState] = useState<boolean>(false);
  const [errorState, setErrorState] = useState<boolean>(false);

  //Sucess
  const handleFormSuccessClick = () => {
    setSucessState(true);
  };
  const handleFormSuccessClose = () => {
    setSucessState(false);
  };

  //Error
  const handleFormErrorClick = () => {
    setErrorState(true);
  };
  const handleFormErrorClose = () => {
    setErrorState(false);
  };

  useEffect(() => {
    if (formSuccess === true) {
      handleFormSuccessClick();
    }

    if (errorMessage !== undefined) {
      handleFormErrorClick();

      setErrorMessageValue(undefined);
    }
  }, [formSuccess, errorMessage, errorState]);

  console.log("aqui,, ", sucessState);

  console.log(formSuccess);
  console.log(errorMessage);

  const ErrorValidade = () => {
    if (errorMessage) {
      const errorD = errorMessage.toString();
      return errorD;
    }
    return undefined;
  };

  return (
    <>
      <Snackbar
        open={sucessState}
        onClose={handleFormSuccessClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleFormSuccessClose} severity="success" sx={{ width: "100%" }}>
          O.S e cliente cadastrados com sucesso!!
        </Alert>
      </Snackbar>
      <Snackbar
        open={errorState}
        onClose={handleFormErrorClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleFormErrorClose} severity="error" sx={{ width: "100%" }}>
          Ocorreu um Erro ao criar : {ErrorValidade() !== undefined ? ErrorValidade() : "Desconhecido"}
        </Alert>
      </Snackbar>
    </>
  );
};
