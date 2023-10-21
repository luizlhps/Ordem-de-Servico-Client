import { CSSProperties, useEffect, useState } from "react";
import { ToastSuccess } from "../Toast/ToastSuccess";
import { ToastError } from "../Toast/ToastError";
import { Box, Button, CircularProgress, useTheme } from "@mui/material";
import { FormServices } from "./FormServices";
import { DialogModalScroll } from "../Modal/DialogModalScroll";
import { useForm } from "react-hook-form";
import { servicesApi } from "@/services/api/servicesApi";
import { IServices } from "../../../types/services";

interface IProps {
  handleClose: () => void;
  fetchApi: () => void;
  style: CSSProperties;
  open: boolean;
  selectItem: IServices;
}

export const UpdateServices = ({ fetchApi, handleClose, open, style, selectItem }: IProps) => {
  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  //form
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (selectItem) {
      setValue("title", selectItem?.title);
      setValue("description", selectItem?.description);
      setValue("amount", selectItem?.amount?.toFixed(2));
    }
  }, [selectItem?.description, selectItem?.title]);

  const onSubmit = (data: any) => {
    if (selectItem)
      servicesApi
        .updateServices(data, selectItem?._id)
        .then((res) => {
          fetchApi();

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
              <FormServices control={control} errors={errors} register={register} />
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
