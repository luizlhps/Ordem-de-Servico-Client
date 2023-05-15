import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import { Stack, useTheme } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

interface IModal {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpen: () => void;
  handleClose: () => void;
}

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

export default function TransitionsModal({ open, handleOpen, handleClose, setOpen }: IModal) {
  const theme = useTheme();
  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
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
              <Typography id="transition-modal-title">aaa</Typography>
              <Typography id="transition-modal-title">aaa</Typography>
            </Box>
            <Box marginTop={4}>
              <Typography id="transition-modal-title" variant="h1">
                Novo Serviço #001
              </Typography>
              <Stack marginTop={4}>
                <Typography fontWeight={600}>Email</Typography>
                <InputCustom placeholder="Digite seu email"></InputCustom>

                <Typography marginTop={2} fontWeight={600}>
                  Senha
                </Typography>
                <InputCustom placeholder="Digite sua senha" type="password"></InputCustom>
              </Stack>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
