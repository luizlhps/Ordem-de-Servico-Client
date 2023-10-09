import { CSSProperties, useState } from "react";

import { Box, Button, CircularProgress, Icon, IconButton, Stack, TextField, Typography, useTheme } from "@mui/material";
import { ToastSuccess } from "../Toast/ToastSuccess";
import { ToastError } from "../Toast/ToastError";
import TransitionsModal from "../Modal/Modal";
import { statusApi } from "@/services/api/statusApi";
import { format } from "date-fns";
import { Controller, useForm } from "react-hook-form";
import { FormStatus } from "./FormStatus";

interface IPropsNewOfficials {
  handleClose: () => void;
  fetchApi: () => void;
  style: CSSProperties;
  open: boolean;
}

export const NewStatus = ({ fetchApi, handleClose, open, style }: IPropsNewOfficials) => {
  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const createNewStatus = (data: any) => {
    setLoading(true);
    statusApi
      .createStatus(data)
      .then(() => {
        fetchApi();
        setSuccess(true);
      })
      .catch((err) => {
        console.error(typeof err.request.response === "string" ? err.request.response : "Ocorreu um erro!!"),
          setMessageError(typeof err.request.response === "string" ? err.request.response : "Ocorreu um erro!!");
        setError(true);
      })
      .finally(() => {
        setLoading(false);
        handleClose();
      });
  };

  return (
    <>
      <ToastSuccess alertSuccess="Criado com sucesso!!" formSuccess={success} setFormSuccess={setSuccess} />
      <ToastError errorMessage={messageError} formError={error} setFormError={setError} />
      {open && (
        <>
          <TransitionsModal handleClose={handleClose} open={open} style={style}>
            <Box flexDirection={"row"} display={"flex"} justifyContent={"flex-end"} width={"100%"}>
              <IconButton onClick={handleClose}>
                <Icon>close</Icon>
              </IconButton>
            </Box>
            <FormStatus submitFunction={createNewStatus} fetchApi={fetchApi} loading={loading} />
          </TransitionsModal>
        </>
      )}
    </>
  );
};
