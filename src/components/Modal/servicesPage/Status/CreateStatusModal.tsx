import { useState, useContext } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import * as Styled from "../../styles";
import { Icon, IconButton, Stack, useTheme, CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { statusApi } from "@/services/api/statusApi";
import TransitionsModal from "../../Modal";

interface IModal {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpen: () => void;
  handleClose: () => void;
  fetchApi: () => any;
  setNewItem: any;
  newItem: any;
  children: React.ReactNode;
  setFormSuccess: any;
}

export default function CreateStatusModal({
  open,
  handleClose,
  setNewItem,
  newItem,
  fetchApi,
  children,
  setFormSuccess,
}: IModal) {
  const [error, setError] = useState(false);
  const [errorName, setErrorName] = useState();
  const [loading, setLoading] = useState(false);

  //form
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    setLoading(true);
    statusApi
      .createStatus(data)
      .then((res) => {
        setError(false);
        setNewItem(true);
        setValue("name", "");
        setFormSuccess(true);

        fetchApi();
      })
      .catch((error) => {
        setError(true);
        if (error.response) {
          setFormSuccess(false);
          console.error(error);
          setFormSuccess(error.response.data.message);

          if (error.response.data === "Título é necessario") return setErrorName(error.response.data);
          if (error.response.data === "Descrição é necessaria") return setErrorName(error.response.data);
          if (error.response.data === "Valor é necessario") return setErrorName(error.response.data);
        } else {
          setFormSuccess(false);
          console.error(error);
          setFormSuccess(error.response.data.message);
        }
      });
    setLoading(false);
  };

  const dateEntry = new Date();
  const formattedDate = format(dateEntry, "dd/MM/yyyy");

  const theme = useTheme();
  return (
    <div>
      <TransitionsModal handleClose={handleClose} open={open} style={Styled.style}>
        <Box flexDirection={"row"} display={"flex"} justifyContent={"space-between"} width={"100%"}>
          <Typography id="transition-modal-title">Entrada {formattedDate}</Typography>
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
            <Styled.InputCustom
              placeholder="Digite o nome do Status"
              {...register("name", { required: true, minLength: 3 })}
            ></Styled.InputCustom>
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

            {newItem && <Typography textAlign={"center"}>Item criado com sucesso!!</Typography>}
            {error && (
              <Typography color="error" textAlign={"center"}>
                Ocorreu um Problema{`: ${errorName}`}
              </Typography>
            )}
          </Stack>
        </Box>
      </TransitionsModal>
      {children}
    </div>
  );
}
