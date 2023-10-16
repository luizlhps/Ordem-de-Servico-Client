import { Button, CircularProgress, Stack, useTheme } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { ToastSuccess } from "../Toast/ToastSuccess";
import { ToastError } from "../Toast/ToastError";

import { StoreFormLayoutName } from "./StoreFormLayoutName";
import { StoreFormLayoutAddress } from "./StoreFormLayoutAddress";
import { Slide, Slider } from "../Slider";
import useSlider from "@/hook/useSlider";
import { useRouter } from "next/router";
import { usePathname, useSearchParams } from "next/navigation";
import { InputsFormCreateStore, configApplicationApi } from "@/services/configApplicationApi";
import { AxiosError } from "axios";

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
      const params = new URLSearchParams(Array.from(searchParams.entries()));
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
  };

  const onSubmit: SubmitHandler<InputsFormCreateStore> = async (data) => {
    try {
      setLoading(true);

      const createStoreResponse = await configApplicationApi.CreateStore(data);

      if (formDataAvatar) {
        const avatarResponse = await configApplicationApi.uploudAvatarStore(formDataAvatar);
      }

      setLoadingAvatar(false);
      setSuccess(true);

      router.push(pathname + "?" + createQueryString("install", "admin"));
    } catch (err) {
      console.log(err);

      if (err instanceof AxiosError) {
        if (err.response && err.response.data.message) {
          setMessageError(err.response.data.message);
        } else {
          setMessageError("Ocorreu um erro!!");
        }
      } else {
        console.error("Ocorreu um erro desconhecido:", err);
        setMessageError("Ocorreu um erro desconhecido");
      }

      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const uploudAvatar = async (formData: FormData, blob: Blob, closeModal: () => void) => {
    setLoadingAvatar(true);

    const ext = blob.type.split("/")[1];
    formData.append("storeAvatar", blob, `store.${ext}`);
    setFormDataAvatar(formData);
    closeModal();
  };

  return (
    <>
      <ToastSuccess alertSuccess="A loja foi criada com sucesso!!" formSuccess={success} setFormSuccess={setSuccess} />
      <ToastError errorMessage={messageError} formError={error} setFormError={setError} />
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
  );
};
