import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import * as Styled from "./styles";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface IModal {
  open: boolean;
  handleClose: () => void;
  HandleDeleted: ((id: string | undefined) => Promise<void>) | ((id: string | undefined) => void);
  id: string | undefined;
  loading: boolean;
}

import styled from "styled-components";
import { Button, CircularProgress, Typography } from "@mui/material";

export const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  maxWidth: "980px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 6,

  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  overflow: "auto",
  "@media (max-width: 768px)": {
    textAlign: "center",
    width: "98%",
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

export default function DeleteModal({ open, handleClose, HandleDeleted, id, loading }: IModal) {
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
            <DeleteForeverIcon sx={{ width: 40, height: 40 }}></DeleteForeverIcon>
            <Typography marginBottom={3} marginTop={3} variant="h2" fontWeight={600}>
              Tem certeza que quer apagar ?
            </Typography>
            <Button
              onClick={() => {
                HandleDeleted(id);
              }}
              size="large"
              color="error"
              sx={{ border: "1px red solid" }}
            >
              {loading ? <CircularProgress size={25} /> : "Confirmar"}
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
