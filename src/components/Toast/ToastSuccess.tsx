import React, { useState, useEffect } from "react";
import { Alert, Button, Snackbar, SnackbarOrigin, Stack, TextField, useTheme } from "@mui/material";
import { IToastSuccess } from "./types/ToastsTypes";

export const ToastSuccess: React.FC<IToastSuccess> = ({ formSuccess, alertSuccess, setFormSuccess }) => {
  const [sucessState, setSucessState] = useState<boolean>(false);

  //Sucess
  const handleFormSuccessClick = () => {
    setSucessState(true);
  };
  const handleFormSuccessClose = () => {
    setSucessState(false);
    setFormSuccess(false);
  };

  useEffect(() => {
    if (formSuccess === true) {
      handleFormSuccessClick();
    }
  }, [formSuccess]);

  return (
    <>
      <Snackbar
        open={sucessState}
        onClose={handleFormSuccessClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleFormSuccessClose} severity="success" sx={{ width: "100%" }}>
          {alertSuccess !== undefined ? alertSuccess : ""}
        </Alert>
      </Snackbar>
    </>
  );
};
