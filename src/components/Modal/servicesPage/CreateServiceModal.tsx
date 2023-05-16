import react, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import * as Styled from "./styles";
import { Icon, IconButton, Stack, TextareaAutosize, useTheme } from "@mui/material";
import { useForm } from "react-hook-form";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { servicesApi } from "@/services/api/servicesApi";
import { IServices } from "@/components/ServicesPage/Services";
import { format } from "date-fns";

interface IModal {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpen: () => void;
  handleClose: () => void;
  fetchApi: () => any;
  setNewService: any;
  newItem: any;
  children: React.ReactNode;
}

export default function CreateServiceModal({ open, handleClose, setNewService, newItem, fetchApi, children }: IModal) {
  const [error, setError] = useState(false);
  const [errorName, setErrorName] = useState();

  const batata = "frango";
  //form
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);

    servicesApi
      .createServices(data)
      .then((res) => {
        setError(false);
        setNewService(true);
        setValue("title", "");
        setValue("description", "");
        setValue("amount", "");

        fetchApi();
      })
      .catch((error) => {
        setError(true);
        if (error.response) {
          console.log(error.response.data); // erro do backend

          if (error.response.data === "Título é necessario") return setErrorName(error.response.data);
          if (error.response.data === "Descrição é necessaria") return setErrorName(error.response.data);
          if (error.response.data === "Valor é necessario") return setErrorName(error.response.data);
        } else {
          console.log(error.message); //erro do Axios
        }
      });
  };

  const dateEntry = new Date();
  const formattedDate = format(dateEntry, "dd/MM/yyyy");

  const theme = useTheme();
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={Styled.style}>
            <Box flexDirection={"row"} display={"flex"} justifyContent={"space-between"} width={"100%"}>
              <Typography id="transition-modal-title">Entrada {formattedDate}</Typography>
              <IconButton onClick={handleClose}>
                <Icon>close</Icon>
              </IconButton>
            </Box>
            <Box marginTop={4} width={"80%"}>
              <Typography id="transition-modal-title" variant="h1" textAlign={"center"}>
                Novo Serviço
              </Typography>

              <Stack marginTop={4}>
                <Typography fontWeight={600}>Título</Typography>
                <Styled.InputCustom
                  placeholder="Digite seu email"
                  {...register("title", { required: true, minLength: 3 })}
                ></Styled.InputCustom>
                {errors.title?.type === "required" && <Typography color={"error"}>Digite o `título`.</Typography>}
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
                {errors.description?.type === "required" && (
                  <Typography color={"error"}>Digite a descrição.</Typography>
                )}
                {errors.description?.type === "minLength" && (
                  <Typography color={"error"}>Digite a descrição com até 3 caracteres.</Typography>
                )}

                <Typography marginTop={2} fontWeight={600}>
                  Valor
                </Typography>
                <Styled.ValueInputCustom
                  placeholder="00.00"
                  type="number"
                  {...register("amount", { required: true })}
                />
                {errors.amount?.type === "required" && <Typography color={"error"}>Digite o valor.</Typography>}

                <Button
                  size="large"
                  sx={{
                    marginTop: 6,
                    marginBottom: 3,
                    background: theme.palette.secondary.main,
                  }}
                  onClick={() => handleSubmit(onSubmit)()}
                >
                  Criar
                </Button>

                {newItem && <Typography textAlign={"center"}>Item criado om sucesso!!</Typography>}
                {error && (
                  <Typography color="error" textAlign={"center"}>
                    Ocorreu um Problema{`: ${errorName}`}
                  </Typography>
                )}
              </Stack>
            </Box>
          </Box>
        </Fade>
      </Modal>
      {children}
    </div>
  );
}
