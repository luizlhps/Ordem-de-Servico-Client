import React, { useEffect, useState } from "react";

//CSS Import MUI AND STYLED COMPONENTS
import { Button, Stack, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MarketSVG, OrdensSVG, OsProcessSVG, UserProcessSVG } from "../../../../../public/icon/SVGS/IconsSVG";

//OTHERS
import { useForm } from "react-hook-form";
import useSearchCep from "@/hook/useSearchCep";
import { numbersOnly } from "@/utils/Masks";
import { DialogModalScroll } from "@/components/Modal/DialogModalScroll";
import { IInputsAddressForm, LayoutAddress } from "../LayoutsForm/LayoutAddress";
import { Stepper } from "../../Stepper";

//Interface
interface NameFormProps {
  formStep: number;
  nextFormStep: () => void;
  prevFormStep: () => void;
  setData: any;
  data: any;
}

export const AdressFormCreate: React.FC<NameFormProps> = ({ formStep, nextFormStep, prevFormStep, setData, data }) => {
  const [valueCepField, setValueCepField] = useState<string>();
  const { cepError, cepData } = useSearchCep(valueCepField);

  const theme = useTheme();
  const columnMedia = useMediaQuery("(max-width:1110px)");

  const {
    handleSubmit,
    watch,
    control,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<IInputsAddressForm>();

  //Loading Default Values
  useEffect(() => {
    if (cepData) {
      setValue("address.cep", numbersOnly(cepData.cep));
      setValue("address.city", cepData.localidade);
      setValue("address.neighborhood", cepData.bairro);
      setValue("address.complement", cepData.complemento);
      setValue("address.state", cepData.uf);
      setValue("address.street", cepData.logradouro);
    }
  }, [cepData]);

  useEffect(() => {
    if (data.address) {
      setValue("address.cep", numbersOnly(data.address[0].cep));
      setValue("address.city", data.address[0].city);
      setValue("address.neighborhood", data.address[0].neighborhood);
      setValue("address.state", data.address[0].state);
      setValue("address.street", data.address[0].street);
      setValue("address.number", data.address[0].number);
      setValue("address.complement", data.address[0].complement);
    }
  }, [data?.address, formStep]);

  //Submit Form
  const onSubmit = (data: IInputsAddressForm) => {
    setData({ address: [data.address] });
  };

  const handlePrev = () => {
    handleSubmit(onSubmit)();
    prevFormStep();
  };

  const handleNext = () => {
    handleSubmit((data) => {
      onSubmit(data);

      nextFormStep();
    })();
  };
  return (
    <>
      <DialogModalScroll.Title>Endereço</DialogModalScroll.Title>

      <DialogModalScroll.Content dividers={true} customStyle={{ borderBottom: "none" }}>
        <LayoutAddress
          cepError={cepError}
          clearErrors={clearErrors}
          control={control}
          errors={errors}
          setValueCepField={setValueCepField}
          wrapColumn={columnMedia}
        />
      </DialogModalScroll.Content>

      <DialogModalScroll.Footer>
        <Stepper stepCurrent={formStep} margin={4}>
          <UserProcessSVG color={theme.palette.secondary.main} />
          <MarketSVG color={theme.palette.secondary.main} />
          <OsProcessSVG color={theme.palette.secondary.main} />
        </Stepper>
        <Stack flexDirection={"row"} width={"100%"} justifyContent={"center"} gap={3} margin={"0!important"}>
          <Button
            fullWidth
            onClick={() => {
              handlePrev();
            }}
            size="large"
            sx={{
              background: theme.palette.secondary.main,
              color: theme.palette.background.paper,
            }}
          >
            Prev
          </Button>
          <Button
            fullWidth
            onClick={() => {
              handleNext();
            }}
            size="large"
            sx={{
              background: theme.palette.secondary.main,
              color: theme.palette.background.paper,
            }}
          >
            Next
          </Button>
        </Stack>
      </DialogModalScroll.Footer>
    </>
  );
};
