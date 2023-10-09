import { CSSProperties, useState } from "react";

import { Box, Button, CircularProgress, Icon, IconButton, Stack, TextField, Typography, useTheme } from "@mui/material";
import { ToastSuccess } from "../Toast/ToastSuccess";
import { ToastError } from "../Toast/ToastError";
import TransitionsModal from "../Modal/Modal";
import { statusApi } from "@/services/api/statusApi";
import { format } from "date-fns";
import { Controller, useForm } from "react-hook-form";

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
  const theme = useTheme();

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

  //form
  const {
    register,
    handleSubmit,

    control,
    setValue,
    formState: { errors },
  } = useForm();

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
            <Box marginTop={4} width={"80%"}>
              <Typography id="transition-modal-title" variant="h1" textAlign={"center"}>
                Novo Status
              </Typography>

              <Stack marginTop={4}>
                <Typography fontWeight={600}>Nome do status</Typography>
                <Controller
                  defaultValue=""
                  name={"name"}
                  control={control}
                  rules={{ required: true, minLength: 3 }}
                  render={({ field: { onChange, value } }) => (
                    <TextField sx={{ fontWeight: 300 }} onChange={onChange} value={value} size="small" fullWidth />
                  )}
                />

                {errors.title?.type === "required" && <Typography color={"error"}>Digite o `título`.</Typography>}
                {errors.title?.type === "minLength" && (
                  <Typography color={"error"}>Digite um titulo com até 3 caracteres.</Typography>
                )}

                <Button
                  size="large"
                  sx={{
                    marginTop: 6,
                    marginBottom: 3,
                    background: theme.palette.secondary.main,
                  }}
                  onClick={() => handleSubmit(createNewStatus)()}
                >
                  {loading ? (
                    <>
                      <CircularProgress size={25} />
                    </>
                  ) : (
                    <>Confirmar</>
                  )}
                </Button>

                {error && (
                  <Typography color="error" textAlign={"center"}>
                    Ocorreu um Problema{`: ${messageError}`}
                  </Typography>
                )}
              </Stack>
            </Box>
          </TransitionsModal>
        </>
      )}
    </>
  );
};
