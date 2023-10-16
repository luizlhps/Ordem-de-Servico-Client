import { Box, Button, CircularProgress, Stack, useTheme } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";

import useSlider from "@/hook/useSlider";
import { useRouter } from "next/router";
import { usePathname, useSearchParams } from "next/navigation";
import { ToastSuccess } from "@/components/Toast/ToastSuccess";
import { ToastError } from "@/components/Toast/ToastError";
import { Slide, Slider } from "@/components/Slider";
import { StoreFormLayoutName } from "@/components/StoreForm/StoreFormLayoutName";
import { StoreFormLayoutAddress } from "@/components/StoreForm/StoreFormLayoutAddress";
import { AxiosError } from "axios";
import { InputsFormCreateStore, configApplicationApi } from "@/services/configApplicationApi";
import { useGetFetchStore } from "@/hook/useGetFetchStore";

interface IProps {}

const Store = ({}: IProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const [submitLoading, setsubmitLoading] = useState(false);
  const [submitLoadingAvatar, setsubmitLoadingAvatar] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [data, setData] = useState<InputsFormCreateStore>();
  const [formDataAvatar, setFormDataAvatar] = useState<FormData>();

  const { handleContinueForm, handlePreviousForm, setSlideLength, setWidthSlide, slideIndex, widthSlide, slideLength } =
    useSlider();

  const { fetchApi, loading, storeData } = useGetFetchStore();

  useEffect(() => {
    fetchApi();
  }, []);

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
    console.log(data);

    setsubmitLoading(true);
    try {
      setsubmitLoading(true);
      await configApplicationApi.updateStore(data);

      if (formDataAvatar) {
        console.log(formDataAvatar);

        const avatarRes = await configApplicationApi.updateAvatarStore(formDataAvatar);
      }

      setSuccess(true);
      router.replace("/");
    } catch (err) {
      if (err instanceof AxiosError) {
        setMessageError(
          typeof err.response?.data.message === "string" ? err.response.data.message : "Ocorreu um erro!!"
        );
        setError(true);
      }
    } finally {
      setsubmitLoadingAvatar(false);
      setsubmitLoading(false);
    }
  };

  const uploudAvatar = async (formData: FormData, blob: Blob, closeModal: () => void) => {
    setsubmitLoadingAvatar(true);

    const ext = blob.type.split("/")[1];
    formData.append("storeAvatar", blob, `avatar.${ext}`);
    setFormDataAvatar(formData);
    closeModal();
  };

  return (
    <>
      <ToastSuccess
        alertSuccess="A loja foi atualizada com sucesso!!"
        formSuccess={success}
        setFormSuccess={setSuccess}
      />
      <ToastError errorMessage={messageError} formError={error} setFormError={setError} />
      <Box margin={"auto auto"} display={"flex"} flexDirection={"column"} alignItems={"center"}>
        <Slider
          widthSlide={widthSlide}
          maxWidthSlide={650}
          setSlideLength={setSlideLength}
          slideIndex={slideIndex}
          setWidthSlide={setWidthSlide}
        >
          <Slide minWidth={widthSlide}>
            <StoreFormLayoutName data={storeData} uploudAvatar={uploudAvatar} setValueForm={setValueForm} />
          </Slide>

          <Slide minWidth={widthSlide}>
            <StoreFormLayoutAddress
              data={storeData}
              handlePreviousForm={handlePreviousForm}
              loading={submitLoading}
              setValueForm={setValueForm}
            />
          </Slide>
        </Slider>
      </Box>
    </>
  );
};

export default Store;
