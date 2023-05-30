import react, { useContext, useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import * as Styled from "../../styles";
import { Icon, IconButton, Stack, TextareaAutosize, useTheme } from "@mui/material";
import { useForm } from "react-hook-form";
import { servicesApi } from "@/services/api/servicesApi";
import { format } from "date-fns";
import { FormSucessOrErrorContext } from "@/contexts/formSuccessOrErrorContext";

interface IModal {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpen: () => void;
  handleClose: () => void;
  fetchApi: () => any;

  selectedItemUpdate: any;
  children: react.ReactNode;
}

export default function UpdateServiceModal({
  open,
  handleClose,

  fetchApi,
  selectedItemUpdate,
  children,
}: IModal) {
  const [error, setError] = useState(false);

  const { setFormSuccess, setFormSucessoValue, setErrorMessageValue } = useContext(FormSucessOrErrorContext);

  //form
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (selectedItemUpdate.title && selectedItemUpdate.title !== undefined) setValue("title", selectedItemUpdate.title);
    if (selectedItemUpdate.description !== undefined) setValue("description", selectedItemUpdate.description);
    if (selectedItemUpdate.amount !== undefined) setValue("amount", selectedItemUpdate.amount);
  }, [selectedItemUpdate.description, selectedItemUpdate.title]);

  useEffect(() => {
    setTimeout(() => {
      setValue("title", selectedItemUpdate.title);
    }, 200);
  }, [handleClose]);

  const onSubmit = (data: any) => {
    servicesApi
      .updateServices(data, selectedItemUpdate._id)
      .then((res) => {
        fetchApi();
        setError(false);
        setValue("title", data.title);
        setValue("description", data.description);
        setValue("amount", data.amount);
        setFormSucessoValue(true);
        handleClose();
      })
      .catch((error) => {
        setError(true);
        if (error.response) {
          setFormSucessoValue(false);
          console.error(error);
          setErrorMessageValue(error.response.data.message);
        } else {
          setFormSucessoValue(false);
          console.error(error);
          setErrorMessageValue(error.response.data.message);
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
                Atualizar Serviço
              </Typography>
              <Stack marginTop={4}>
                <Typography fontWeight={600}>Título</Typography>
                <Styled.InputCustom
                  placeholder="Digite o título"
                  {...register("title", { required: true, minLength: 3 })}
                ></Styled.InputCustom>
                {errors.title?.type === "required" && <Typography color={"error"}>Digite o título</Typography>}
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
              </Stack>
            </Box>
          </Box>
        </Fade>
      </Modal>
      {children}
    </div>
  );
}
