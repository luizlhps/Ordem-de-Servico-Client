import React, { CSSProperties, useState } from "react";
import { ToastSuccess } from "../Toast/ToastSuccess";
import { ToastError } from "../Toast/ToastError";
import { Box, Icon, IconButton } from "@mui/material";
import TransitionsModal from "../Modal/Modal";
import { FormStatus } from "./FormStatus";
import { IDetailsStatus, IStatus, statusApi } from "@/services/api/statusApi";
import { DialogModalScroll } from "../Modal/DialogModalScroll";

interface IPropsNewOfficials {
  handleClose: () => void;
  fetchApi: () => void;
  style: CSSProperties;
  open: boolean;
  selectItem: IDetailsStatus;
}

export const UpdateStatus = ({ fetchApi, handleClose, open, style, selectItem }: IPropsNewOfficials) => {
  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const updateStatusSubmit = (data: any) => {
    setLoading(true);
    if (selectItem) {
      statusApi
        .updateStatus(data, selectItem._id)
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
    }
  };

  return (
    <>
      <ToastSuccess alertSuccess="Criado com sucesso!!" formSuccess={success} setFormSuccess={setSuccess} />
      <ToastError errorMessage={messageError} formError={error} setFormError={setError} />
      {open && (
        <>
          <DialogModalScroll.Root handleClose={handleClose} open={open} style={style}>
            <Box flexDirection={"row"} display={"flex"} justifyContent={"flex-end"} width={"100%"}>
              <DialogModalScroll.Close handleClose={handleClose} />
            </Box>
            <FormStatus data={selectItem} submitFunction={updateStatusSubmit} fetchApi={fetchApi} loading={loading} />
          </DialogModalScroll.Root>
        </>
      )}
    </>
  );
};
