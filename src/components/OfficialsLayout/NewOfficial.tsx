import { CSSProperties, useState } from "react";
import DialogModalScroll from "../Modal/DialogModalScroll";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import { Box, DialogTitle, Typography } from "@mui/material";
import { FormLayoutProfile } from "../Profile/FormLayoutProfile";
import { CloseModal } from "../Modal/financePage/FormCrudModals";
import { IUser } from "../../../types/users";
import { usersApi } from "@/services/api/usersApi";
import { Slide, Slider } from "../Slider";
import useSlider from "@/hook/useSlider";
import { FormProfilePassword } from "../Profile";
import { FormLayoutProfilePassword } from "../Profile/FormLayoutProfilePassword";
import { InputsFormUser } from "@/services/configApplicationApi";
import { ToastSuccess } from "../Toast/ToastSuccess";
import { ToastError } from "../Toast/ToastError";

interface IPropsNewOfficials {
  handleClose: () => void;
  fetchApi: () => void;
  style: CSSProperties;
  open: boolean;
}

export const NewOfficial = ({ fetchApi, handleClose, open, style }: IPropsNewOfficials) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<InputsFormUser>();
  const [messageError, setMessageError] = useState("");
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const { handleContinueForm, handlePreviousForm, setSlideLength, setWidthSlide, slideIndex, widthSlide, slideLength } =
    useSlider(open);

  const setValueForm = (valueToUpdate: InputsFormUser) => {
    setData((oldValue) => {
      const newData = { ...oldValue, ...valueToUpdate };
      const lastSlide = slideLength - 1;

      if (lastSlide === slideIndex) {
        createNewOfficials(newData);
      }
      return newData;
    });
    console.log(data);
  };

  const createNewOfficials = (data: InputsFormUser) => {
    setLoading(true);
    usersApi
      .createOfficials(data)
      .then(() => {
        fetchApi();
        setSuccess(true);
      })
      .catch((err) => {
        console.error(typeof err.request.response === "string" ? err.request.response : "Ocorreu um erro!!"),
          setMessageError(typeof err.request.response === "string" ? err.request.response : "Ocorreu um erro!!");
        setError(true);
      })
      .finally(() => {
        setLoading(false);
        handleClose();
      });
  };

  return (
    <>
      <ToastSuccess alertSuccess="Criado com sucesso!!" formSuccess={success} setFormSuccess={setSuccess} />
      <ToastError errorMessage={messageError} formError={error} setFormError={setError} />
      {open && (
        <>
          <DialogModalScroll handleClose={handleClose} open={open} style={style}>
            <CloseModal handleClose={handleClose} />

            <DialogContent dividers={false} sx={{ alignItems: "center", display: "flex", flexDirection: "column" }}>
              <Slider
                widthSlide={widthSlide}
                maxWidthSlide={650}
                setSlideLength={setSlideLength}
                slideIndex={slideIndex}
                setWidthSlide={setWidthSlide}
              >
                <Slide minWidth={widthSlide}>
                  <Box sx={{ alignItems: "center", display: "flex", flexDirection: "column" }}>
                    <Typography variant="h1">Novo Funcionario</Typography>
                    <Typography>Preencha os dados do seu funcionario</Typography>
                    <FormLayoutProfile
                      loading={loading}
                      setValueForm={setValueForm}
                      handleContinueForm={handleContinueForm}
                    />
                  </Box>
                </Slide>

                <Slide minWidth={widthSlide}>
                  <Box height={"100%"} sx={{ alignItems: "center", display: "flex", flexDirection: "column" }}>
                    <DialogTitle>
                      <Typography variant="h1">Novo Funcionario</Typography>
                      <Typography>Preencha os dados do seu funcionario</Typography>
                    </DialogTitle>
                    <FormLayoutProfilePassword
                      setValueForm={setValueForm}
                      handlePreviousForm={handlePreviousForm}
                      loading={loading}
                    />
                  </Box>
                </Slide>
              </Slider>
            </DialogContent>
          </DialogModalScroll>
        </>
      )}
    </>
  );
};
