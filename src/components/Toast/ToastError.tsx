import React, { useState, useEffect } from "react";
import { Alert, Button, Snackbar, SnackbarOrigin, Stack, TextField, useTheme } from "@mui/material";
import { IToastError } from "./types/ToastsTypes";

export const ToastError: React.FC<IToastError> = ({ errorMessage, setErrorMessage }) => {
  const [errorState, setErrorState] = useState<boolean>(false);

  //Error
  const handleFormErrorClick = () => {
    setErrorState(true);
  };
  const handleFormErrorClose = () => {
    setErrorState(false);
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      handleFormErrorClick();

      setErrorMessage(undefined);
    }
  }, [errorMessage, errorState]);

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
