import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import { Icon, IconButton, Stack, TextareaAutosize, useTheme } from "@mui/material";
import { useForm } from "react-hook-form";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { servicesApi } from "@/services/api/servicesApi";

interface IModal {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpen: () => void;
  handleClose: () => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  maxWidth: "980px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const InputCustom = styled.input`
  height: 38px;
  font-size: 16px;
  color: #1e2737;
  width: 100%;
  border-radius: 0.3rem;
  padding: 8px;
  border-style: none;
  border: 1px #878787 solid;
  margin-top: 4px;
  font-family: arial;


`;

const ValueInputCustom = styled.input`
  height: 38px;
  font-size: 16px;
  color: #1e2737;
  width: 150px;

  border-radius: 0.3rem;
  padding: 8px;
  border-style: none;
  border: 1px #878787 solid;
  margin-top: 4px;
  font-family: arial;
`;

const InputCustomDescription = styled.textarea`
  font-size: 16px;
  color: #1e2737;
  width: 100%;
  height: 140px;
  border-radius: 0.3rem;
  padding: 6px;
  border-style: none;
  border: 1px #878787 solid;
  margin-top: 14px;
  resize: none;
  font-family: arial;

  @media (max-width: 1212px) {
    width: 100%;
  }
`;

export default function TransitionsModal({ open, handleOpen, handleClose, setOpen }: IModal) {
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
    servicesApi.createServices(data)
  };

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
          <Box sx={style}>
            <Box flexDirection={"row"} display={"flex"} justifyContent={"space-between"} width={"100%"}>
              <Typography id="transition-modal-title">Entrada</Typography>
              <IconButton onClick={handleClose}>
                <Icon>close</Icon>
              </IconButton>
            </Box>
            <Box marginTop={4} width={"80%"}>
              <Typography id="transition-modal-title" variant="h1" textAlign={"center"}>
                Novo Serviço #001
              </Typography>
              <Stack marginTop={4}>
                <Typography fontWeight={600}>Título</Typography>
                <InputCustom placeholder="Digite seu email" {...register('title', {required:true, minLength:3})}></InputCustom>

                <Typography marginTop={2} fontWeight={600}>
                  Descrição
                </Typography>
                <InputCustomDescription {...register('description', {required:true, minLength:3})}></InputCustomDescription>
                <Typography marginTop={2} fontWeight={600}>
                  Valor
                </Typography>
                <ValueInputCustom type="number"{...register('amount', {required:true})} />

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
    </div>
  );
}
