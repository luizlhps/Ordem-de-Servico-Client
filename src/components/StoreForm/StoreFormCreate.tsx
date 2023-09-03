import { Button, CircularProgress, Stack, useTheme } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { ToastSuccess } from "../Toast/ToastSuccess";
import { ToastError } from "../Toast/ToastError";

import { InputsFormCreateStore, installApplicationApi } from "@/services/installApplicationApi";
import { StoreFormLayoutName } from "./StoreFormLayoutName";
import { StoreFormLayoutAddress } from "./StoreFormLayoutAddress";
import { Slide, Slider } from "../Slider";
import useSlider from "@/hook/useSlider";
import { useRouter } from "next/router";
import { usePathname, useSearchParams } from "next/navigation";

interface IProps {}

export const StoreFormCreate = ({}: IProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const [loading, setLoading] = useState(false);
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [data, setData] = useState<InputsFormCreateStore>();
  const [formDataAvatar, setFormDataAvatar] = useState<FormData>();

  const { handleContinueForm, handlePreviousForm, setSlideLength, setWidthSlide, slideIndex, widthSlide, slideLength } =
    useSlider();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const setValueForm = (valueToUpdate: InputsFormCreateStore) => {
    setData((oldValue) => {
      const newData = { ...oldValue, ...valueToUpdate };
      const lastSlide = slideLength - 1;
      handleContinueForm();

      if (lastSlide === slideIndex) {
        onSubmit(newData);
      }
      return newData;
    });
    console.log(data);
  };

  const onSubmit: SubmitHandler<InputsFormCreateStore> = (data) => {
    console.log(data);

    setLoading(true);
    installApplicationApi
      .CreateStore(data)
      .then((res) => {
        setSuccess(true);

        if (formDataAvatar) {
          console.log("oi");
          installApplicationApi
            .uploudAvatarStore(formDataAvatar)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
              typeof err.response.data === "string" ? err.response.data : "Ocorreu um erro!!";
            })
            .finally(async () => {
              setLoadingAvatar(false);
            });
        }
      })
      .catch((err) => {
        console.log(err);
        setMessageError(
          typeof err.response.data.message === "string" ? err.response.data.message : "Ocorreu um erro!!"
        );
        setError(true);
      })
      .finally(() => {
        setLoading(false);
        setTimeout(() => {
          router.push(pathname + "?" + createQueryString("install", "admin"));
        }, 1000);
      });
  };

  const uploudAvatar = async (formData: FormData, blob: Blob, closeModal: () => void) => {
    setLoadingAvatar(true);

    const ext = blob.type.split("/")[1];
    formData.append("storeAvatar", blob, `avatar.${ext}`);
    setFormDataAvatar(formData);
    closeModal();
  };

  return (
    <>
      <ToastSuccess alertSuccess="A loja foi criada com sucesso!!" formSuccess={success} setFormSuccess={setSuccess} />
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
            <StoreFormLayoutName uploudAvatar={uploudAvatar} setValueForm={setValueForm} />
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
