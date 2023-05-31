import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import * as Styled from "./styles";
import { Button, Typography } from "@mui/material";

interface IModal {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpen: () => void;
  handleClose: () => void;
  fetchApi: () => any;
  HandleDeleted: (id: string) => Promise<void>;
  selectedItemUpdate: any;
}

import styled from "styled-components";

export const style = {
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

  overflow: "auto",
  "@media (max-width: 768px)": {
    textAlign: "center",
    width: "90%",
    overflow: "auto",
    justifyContent: "center",
  },
};

export const InputCustom = styled.input`
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

export const ValueInputCustom = styled.input`
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

export const InputCustomDescription = styled.textarea`
  font-size: 16px;
  color: #1e2737;
  width: 100%;
  height: 140px;
  border-radius: 0.3rem;
  padding: 8px;
  border-style: none;
  border: 1px #878787 solid;
  margin-top: 14px;
  resize: none;
  font-family: arial;

  @media (max-width: 1212px) {
    width: 100%;
  }
`;

export default function DeleteModal({ open, handleClose, HandleDeleted, selectedItemUpdate }: IModal) {
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
          <Box sx={style} width={"80%"}>
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
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
