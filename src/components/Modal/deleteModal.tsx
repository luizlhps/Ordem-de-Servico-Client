import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import * as Styled from "./styles";
import { Button, Typography, useTheme } from "@mui/material";
import { format } from "date-fns";

interface IModal {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpen: () => void;
  handleClose: () => void;
  fetchApi: () => any;
  children: React.ReactNode;
  HandleDeleted: (id: string) => Promise<void>;
  selectedItemUpdate: any;
  deleteError: boolean;
}

export default function DeleteModal({
  open,
  handleClose,
  children,
  HandleDeleted,
  selectedItemUpdate,
  deleteError,
}: IModal) {
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
            <Typography marginBottom={3} marginTop={3} variant="h2" fontWeight={600}>
              Tem certeza que quer apagar ?
            </Typography>
            <Button
              onClick={() => {
                HandleDeleted(selectedItemUpdate._id);
              }}
              size="large"
              color="error"
              sx={{ border: "1px red solid" }}
            >
              Continuar
            </Button>
            {deleteError && (
              <Typography marginTop={2} color={"error"}>
                Ocorreu um erro ao deletar
              </Typography>
            )}
          </Box>
        </Fade>
      </Modal>
      {children}
    </div>
  );
}