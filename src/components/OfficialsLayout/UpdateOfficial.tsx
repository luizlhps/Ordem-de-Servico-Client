import React, { CSSProperties, useState } from "react";
import { IUser } from "../../../types/users";
import { usersApi } from "@/services/api/usersApi";
import { ToastSuccess } from "../Toast/ToastSuccess";
import { ToastError } from "../Toast/ToastError";

import { Slide, Slider } from "../Slider";
import useSlider from "@/hook/useSlider";
import { Box, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { FormLayoutProfile } from "../Profile/FormLayoutProfile";
import { FormLayoutProfilePassword } from "../Profile/FormLayoutProfilePassword";
import { InputsFormUser } from "@/services/configApplicationApi";
import { DialogModalScroll } from "../Modal/DialogModalScroll";

interface IProps {
  handleClose: () => void;
  fetchApi: () => void;
  style: CSSProperties;
  open: boolean;
  selectItem: IUser | undefined;
}

export const UpdateOfficial = ({ handleClose, fetchApi, style, open, selectItem }: IProps) => {
  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [data, setData] = useState<InputsFormUser>();
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const { handleContinueForm, handlePreviousForm, setSlideLength, setWidthSlide, slideIndex, widthSlide, slideLength } =
    useSlider(open);
  const setValueForm = (valueToUpdate: InputsFormUser) => {
    setData((oldValue) => {
      const newData = { ...oldValue, ...valueToUpdate };
      const lastSlide = slideLength - 1;

      if (lastSlide === slideIndex) {
        onSubmit(newData);
      }
      return newData;
    });
  };

  const onSubmit = (data: InputsFormUser) => {
    if (!selectItem?._id) {
      setMessageError("O ID é necessário!!");
      setError(true);
      return;
    }
    setLoading(true);
    usersApi
      .updateOffcialsUser(data, selectItem._id)
      .then((res) => {
        setSuccess(true);
        fetchApi();
      })
      .catch((err) => {
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
      <ToastSuccess alertSuccess="Atualizado com sucesso!!" formSuccess={success} setFormSuccess={setSuccess} />
      <ToastError errorMessage={messageError} formError={error} setFormError={setError} />
      {open && (
        <>
          <DialogModalScroll.Root handleClose={handleClose} open={open} style={style}>
            <DialogModalScroll.Close handleClose={handleClose} />
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
                    <Typography variant="h1">Atualizar Funcionário</Typography>
                    <Typography>Preencha os dados do seu funcionario</Typography>
                    <FormLayoutProfile
                      data={selectItem}
                      loading={loading}
                      setValueForm={setValueForm}
                      handleContinueForm={handleContinueForm}
                    />
                  </Box>
                </Slide>

                <Slide minWidth={widthSlide}>
                  <Box height={"100%"} sx={{ alignItems: "center", display: "flex", flexDirection: "column" }}>
                    <Typography variant="h1">Atualizar Funcionário</Typography>
                    <Typography>Preencha os dados do seu funcionario</Typography>
                    <FormLayoutProfilePassword
                      notRequired
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
