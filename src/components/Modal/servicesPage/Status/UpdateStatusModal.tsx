import react, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import * as Styled from "../../styles";
import { Icon, IconButton, Stack, TextareaAutosize, useTheme } from "@mui/material";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { statusApi } from "@/services/api/statusApi";

interface IModal {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpen: () => void;
  handleClose: () => void;
  fetchApi: () => any;
  setNewItem: any;
  newItem: any;
  selectedItemUpdate: any;
  children: react.ReactNode;
}

export default function UpdateStatusModal({
  open,
  handleClose,
  setNewItem,
  newItem,
  fetchApi,
  selectedItemUpdate,
  children,
}: IModal) {
  const [error, setError] = useState(false);
  const [errorName, setErrorName] = useState();

  //form
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (selectedItemUpdate.name && selectedItemUpdate.name !== undefined) setValue("name", selectedItemUpdate.name);
  }, [selectedItemUpdate.name]);

  useEffect(() => {
    setTimeout(() => {
      setValue("name", selectedItemUpdate.name);
    }, 200);
  }, [handleClose]);

  const onSubmit = (data: any) => {
    statusApi
      .updateStatus(data, selectedItemUpdate._id)
      .then((res) => {
        fetchApi();

        setError(false);
        setNewItem(true);
        setValue("name", data.name);
      })
      .catch((error) => {
        setError(true);
        if (error.response) {
          console.log(error.response.data); // erro do backend
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
        aria-labelledby="transition-modal-name"
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
              <Typography id="transition-modal-name">Entrada {formattedDate}</Typography>
              <IconButton onClick={handleClose}>
                <Icon>close</Icon>
              </IconButton>
            </Box>
            <Box marginTop={4} width={"80%"}>
              <Typography id="transition-modal-name" variant="h1" textAlign={"center"}>
                Atualizar Status
              </Typography>

              <Stack marginTop={4}>
                <Typography fontWeight={600}>Título</Typography>
                <Styled.InputCustom
                  placeholder="Digite o título"
                  {...register("name", { required: true, minLength: 3 })}
                ></Styled.InputCustom>
                {errors.name?.type === "required" && <Typography color={"error"}>Digite o título</Typography>}
                {errors.name?.type === "minLength" && (
                  <Typography color={"error"}>Digite um titulo com até 3 caracteres.</Typography>
                )}

                <Button
                  disabled={
                    selectedItemUpdate.name === "Fechado" || selectedItemUpdate.name === "Aberto" ? true : false
                  }
                  size="large"
                  sx={{
                    marginTop: 6,
                    marginBottom: 3,
                    background: theme.palette.secondary.main,
                  }}
                  onClick={() => handleSubmit(onSubmit)()}
                >
                  Atualizar
                </Button>

                {newItem && <Typography textAlign={"center"}>Item atualizado com sucesso!!</Typography>}
                {error && (
                  <Typography color="error" textAlign={"center"}>
                    Ocorreu um Problema{`: ${errorName}`}
                  </Typography>
                )}
                {(selectedItemUpdate.name === "Fechado" || selectedItemUpdate.name === "Aberto") && (
                  <Typography color="error" textAlign={"center"}>
                    Não é possivel Editar os Status Aberto ou Fechado
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
