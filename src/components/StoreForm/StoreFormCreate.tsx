import { Button, CircularProgress, Stack, useTheme } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { ToastSuccess } from "../Toast/ToastSuccess";
import { ToastError } from "../Toast/ToastError";

import { InputsFormCreateStore } from "@/services/installApplicationApi";
import { StoreFormLayoutName } from "./StoreFormLayoutName";
import { StoreFormLayoutAddress } from "./StoreFormLayoutAddress";
import { Slide, Slider } from "../Slider";
import useSlider from "@/hook/useSlider";

interface IProps {}

export const StoreFormCreate = ({}: IProps) => {
  const theme = useTheme();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [data, setData] = useState<InputsFormCreateStore>();

  const { handleContinueForm, handlePreviousForm, setSlideLength, setWidthSlide, slideIndex, widthSlide, slideLength } =
    useSlider();

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<InputsFormCreateStore>();

  const setValueForm = (valueToUpdate: InputsFormCreateStore) => {
    setData((oldValue) => {
      return { ...oldValue, ...valueToUpdate };
    });

    const lastSlide = slideLength - 1;

    if (lastSlide === slideIndex) {
      console.log(data);
      return;
    }
    console.log(data);

    handleContinueForm();
  };

  const onSubmit: SubmitHandler<InputsFormCreateStore> = (data) => {
    console.log(data);

    /*  setLoading(true);
    /*     usersApi
      .updateProfile(data)
      .then((res) => {
        setSuccess(true);
        fetchMyInfo();
      })
      .catch((err) => {
        setMessageError(typeof err.request.response === "string" ? err.request.response : "Ocorreu um erro!!");
        setError(true);
      })
      .finally(() => setLoading(false)); */
  };

  return (
    <>
      <ToastSuccess alertSuccess="Perfil atualizado com sucesso!!" formSuccess={success} setFormSuccess={setSuccess} />
      <ToastError errorMessage={messageError} formError={error} setFormError={setError} />
      <>
        <Slider
          widthSlide={widthSlide}
          maxWidthSlide={650}
          setSlideLength={setSlideLength}
          slideIndex={slideIndex}
          setWidthSlide={setWidthSlide}
        >
          <Slide minWidth={widthSlide}>
            <StoreFormLayoutName setValueForm={setValueForm} />
          </Slide>

          <Slide minWidth={widthSlide}>
            <StoreFormLayoutAddress
              handlePreviousForm={handlePreviousForm}
              loading={loading}
              setValueForm={setValueForm}
            />
          </Slide>
        </Slider>
      </>
    </>
  );
};
