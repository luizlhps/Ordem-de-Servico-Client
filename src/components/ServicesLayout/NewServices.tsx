import { CSSProperties, useEffect, useState } from "react";

import { Box, Button, CircularProgress, Stack, TextField, Typography, useTheme } from "@mui/material";
import { ToastSuccess } from "../Toast/ToastSuccess";
import { ToastError } from "../Toast/ToastError";
import TransitionsModal from "../Modal/Modal";
import { useForm } from "react-hook-form";
import { DialogModalScroll } from "../Modal/DialogModalScroll";
import { servicesApi } from "@/services/api/servicesApi";
import { format } from "date-fns";
import { FormServices } from "./FormServices";

interface IProps {
  handleClose: () => void;
  fetchApi: () => void;
  style: CSSProperties;
  open: boolean;
}

export const NewServices = ({ fetchApi, handleClose, open, style }: IProps) => {
  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  //form
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    setLoading(true);
    servicesApi
      .createServices(data)
      .then((res) => {
        fetchApi();
        setLoading(false);
        setSuccess(true);
        reset();

        handleClose();
      })
      .catch((error) => {
        setMessageError(typeof error.request.response === "string" ? error.request.response : "Ocorreu um erro!!");
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //Clear Form after close modal
  useEffect(() => {
    reset();
  }, [handleClose]);

  const theme = useTheme();

  return (
    <>
      <ToastSuccess alertSuccess="Criado com sucesso!!" formSuccess={success} setFormSuccess={setSuccess} />
      <ToastError errorMessage={messageError} formError={error} setFormError={setError} />
      {open && (
        <>
          <DialogModalScroll.Root handleClose={handleClose} open={open} style={style}>
            <DialogModalScroll.Close handleClose={handleClose} />

            <DialogModalScroll.Title>
              <Box flexDirection={"row"} display={"flex"} justifyContent={"space-between"} width={"100%"}>
                Criar novo Serviço
              </Box>
            </DialogModalScroll.Title>

            <DialogModalScroll.Content customStyle={{ paddingBottom: 4 }} dividers>
              <FormServices errors={errors} register={register} control={control} />
            </DialogModalScroll.Content>

            <DialogModalScroll.Footer>
              <Button
                size="large"
                sx={{
                  marginTop: 6,
                  marginBottom: 3,
                  background: theme.palette.secondary.main,
                }}
                onClick={() => handleSubmit(onSubmit)()}
              >
                {loading ? (
                  <>
                    <CircularProgress size={25} />
                  </>
                ) : (
                  <>Confirmar</>
                )}
              </Button>
            </DialogModalScroll.Footer>
          </DialogModalScroll.Root>
        </>
      )}
    </>
  );
};
