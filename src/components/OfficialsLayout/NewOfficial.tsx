import { CSSProperties, useState } from "react";
import DialogContent from "@mui/material/DialogContent";

import { Box, DialogTitle, Typography } from "@mui/material";
import { FormLayoutProfile } from "../Profile/FormLayoutProfile";
import { CloseModal } from "../Modal/financePage/FormCrudModals";
import { usersApi } from "@/services/api/usersApi";
import { Slide, Slider } from "../Slider";
import useSlider from "@/hook/useSlider";
import { FormLayoutProfilePassword } from "../Profile/FormLayoutProfilePassword";
import { InputsFormUser } from "@/services/configApplicationApi";
import { ToastSuccess } from "../Toast/ToastSuccess";
import { ToastError } from "../Toast/ToastError";
import { DialogModalScroll } from "../Modal/DialogModalScroll";

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
          <DialogModalScroll.Root handleClose={handleClose} open={open} style={style}>
            <CloseModal handleClose={handleClose} />
            <DialogModalScroll.Content customStyle={{ padding: 5 }}>
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
                    <DialogModalScroll.Title>
                      <Typography variant="h1">Novo Funcionario</Typography>
                      <Typography>Preencha os dados do seu funcionario</Typography>
                    </DialogModalScroll.Title>
                    <FormLayoutProfilePassword
                      setValueForm={setValueForm}
                      handlePreviousForm={handlePreviousForm}
                      loading={loading}
                    />
                  </Box>
                </Slide>
              </Slider>
            </DialogModalScroll.Content>
          </DialogModalScroll.Root>
        </>
      )}
    </>
  );
};
