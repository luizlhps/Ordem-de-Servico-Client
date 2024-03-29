import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import * as Styled from "../../styles";
import { CircularProgress, Icon, IconButton, Stack, useTheme } from "@mui/material";
import { useForm } from "react-hook-form";
import { servicesApi } from "@/services/api/servicesApi";
import { format } from "date-fns";
import TransitionsModal from "../../Modal";
import { DialogModalScroll } from "../../DialogModalScroll";

interface IModal {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  fetchApi: () => any;
  children: React.ReactNode;
  setMessageForm: React.Dispatch<React.SetStateAction<string | undefined>>;
  setFormSucessoValue: any;
}

export default function CreateServiceModal({
  open,
  handleClose,
  fetchApi,
  children,
  setMessageForm,
  setFormSucessoValue,
}: IModal) {
  const [loading, setLoading] = useState(false);

  //form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    setLoading(true);
    servicesApi
      .createServices(data)
      .then((res) => {
        setValue("title", "");
        setValue("description", "");
        setValue("amount", "");
        setMessageForm("Serviço criado com sucesso!!");

        fetchApi();
        setLoading(false);
        handleClose();
      })
      .catch((error) => {
        if (error.response) {
          console.error(error);
          /*  setErrorMessage(error.response.data.message); */
        } else {
          console.error(error);
          /*  setErrorMessage(error.response.data.message); */
        }
        setLoading(false);
      });
  };

  const dateEntry = new Date();
  const formattedDate = format(dateEntry, "dd/MM/yyyy");

  const theme = useTheme();
  return (
    <>
      <TransitionsModal handleClose={handleClose} open={open} style={Styled.style}>
        <Box flexDirection={"row"} display={"flex"} justifyContent={"space-between"} width={"100%"}>
          <Typography id="transition-modal-title">Entrada {formattedDate}</Typography>
          <DialogModalScroll.Close handleClose={handleClose} />
        </Box>
        <Box marginTop={4} width={"80%"} height={"80%"}>
          <Typography id="transition-modal-title" variant="h1" textAlign={"center"}>
            Novo Serviço
          </Typography>

          <Stack marginTop={4}>
            <Typography fontWeight={600}>Título</Typography>
            <Styled.InputCustom
              placeholder="Digite o título"
              {...register("title", { required: true, minLength: 3 })}
            ></Styled.InputCustom>
            {errors.title?.type === "required" && <Typography color={"error"}>Digite o título.</Typography>}
            {errors.title?.type === "minLength" && (
              <Typography color={"error"}>Digite um titulo com até 3 caracteres.</Typography>
            )}

            <Typography marginTop={2} fontWeight={600}>
              Descrição
            </Typography>
            <Styled.InputCustomDescription
              placeholder="Digite a descrição do serviço"
              {...register("description", { required: true, minLength: 3 })}
            ></Styled.InputCustomDescription>
            {errors.description?.type === "required" && <Typography color={"error"}>Digite a descrição.</Typography>}
            {errors.description?.type === "minLength" && (
              <Typography color={"error"}>Digite a descrição com até 3 caracteres.</Typography>
            )}

            <Typography marginTop={2} fontWeight={600}>
              Valor
            </Typography>
            <Styled.ValueInputCustom
              placeholder="0000"
              type="number"
              {...register("amount", {
                required: true,
                validate: (currentValue) => {
                  const isValid = /^\d+(\.\d{1,2})?$/.test(currentValue);
                  return isValid;
                },
              })}
            />
            {errors.amount?.type === "required" && <Typography color={"error"}>Digite o valor.</Typography>}
            {errors.amount?.type === "validate" && (
              <Typography color={"error"}>O número após o ponto deve ter no máximo 2 dígitos..</Typography>
            )}

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
          </Stack>
        </Box>
      </TransitionsModal>
      {children}
    </>
  );
}
