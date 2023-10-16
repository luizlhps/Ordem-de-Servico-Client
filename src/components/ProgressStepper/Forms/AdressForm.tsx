import React, { useEffect, useState } from "react";

//CSS Import MUI AND STYLED COMPONENTS
import { Button, Divider, Stack, Typography, useTheme, Box, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import styled from "styled-components";
import { MarketSVG, OsProcessSVG, UserProcessSVG } from "../../../../public/icon/SVGS/IconsSVG";

//OTHERS
import { Controller, useForm } from "react-hook-form";
import { TypeForm } from "./types";
import useSearchCep from "@/hook/useSearchCep";
import { SearchCep } from "@/components/SearchCep";
import { numbersOnly } from "@/utils/Masks";

const ContainerCustom = styled.div`
  padding: 60px;

  @media (max-width: 600px) {
    padding: 0px;
  }
`;

//Interface
interface NameFormProps {
  formStep: number;
  nextFormStep: () => void;
  prevFormStep: () => void;
  setData: any;
  typeForm: TypeForm;
  data: any;
}
type Inputs = {
  cep: any;
  city: string | undefined;
  neighborhood: string | undefined;
  complement: string | undefined;
  state: string | undefined;
  street: string;
  number: string;
};

export const AdressForm: React.FC<NameFormProps> = ({
  formStep,
  nextFormStep,
  prevFormStep,
  setData,
  typeForm,
  data,
}) => {
  const [valueCepField, setValueCepField] = useState<string>();
  const theme = useTheme();
  const columnMedia = useMediaQuery("(max-width:1110px)");

  const {
    handleSubmit,
    watch,
    control,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const { cepError, cepData } = useSearchCep(valueCepField);

  useEffect(() => {
    if (cepData) {
      setValue("cep", numbersOnly(cepData.cep));
      setValue("city", cepData.localidade);
      setValue("neighborhood", cepData.bairro);
      setValue("complement", cepData.complemento);
      setValue("state", cepData.uf);
      setValue("street", cepData.logradouro);
    }
  }, [cepData]);

  useEffect(() => {
    if (data && data.address) {
      setValue("cep", numbersOnly(data.address[0].cep));
      setValue("city", data.address[0].city);
      setValue("neighborhood", data.address[0].neighborhood);
      setValue("state", data.address[0].state);
      setValue("street", data.address[0].street);
      setValue("number", data.address[0].number);
      setValue("complement", data.address[0].complement);
    }
  }, [data, prevFormStep]);

  const onSubmit = (data: Inputs) => {
    setData({ address: [data] });
    nextFormStep();
  };
  return (
    <>
      <form>
        <ContainerCustom>
          <Typography variant="h1" fontWeight={500}>
            Endereço
          </Typography>
          <Divider
            sx={{
              width: 39,
              height: 5,
              background: theme.palette.secondary.main,
              marginLeft: 1,
            }}
          />

          <Stack direction={"column"} justifyContent={"space-between"} marginTop={4}>
            <SearchCep
              cepError={cepError}
              control={control}
              errors={errors}
              setValueCepField={setValueCepField}
              clearErrors={clearErrors}
            />
            <Typography marginTop={3} marginBottom={1}>
              Cidade*
            </Typography>
            <Controller
              name="city"
              defaultValue={""}
              rules={{ required: true }}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  size="small"
                  error={!!errors.city}
                  value={value}
                  onChange={(e) => {
                    onChange(e.target.value);
                  }}
                  fullWidth
                  placeholder="Digite o Nome"
                />
              )}
            />
            {errors.city?.type === "required" && <Typography color={"error"}>Digite a cidade</Typography>}
            <Typography marginTop={3} marginBottom={1}>
              Bairro*
            </Typography>
            <Controller
              rules={{ required: true }}
              name="neighborhood"
              defaultValue={""}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  size="small"
                  fullWidth
                  error={!!errors.neighborhood}
                  value={value}
                  onChange={(e) => {
                    onChange(e.target.value);
                  }}
                  placeholder="Digite o Nome"
                />
              )}
            />
            {errors.neighborhood?.type === "required" && <Typography color={"error"}>Digite o bairro</Typography>}
            <Typography marginTop={3} marginBottom={1}>
              Complemento
            </Typography>

            <Controller
              name="complement"
              defaultValue={""}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  error={!!errors.complement}
                  value={value}
                  onChange={(e) => {
                    onChange(e.target.value);
                  }}
                  placeholder="Digite o Nome"
                />
              )}
            />

            <Typography marginTop={3} marginBottom={1}>
              Estado*
            </Typography>
            <Controller
              rules={{ required: true }}
              name="state"
              defaultValue={""}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  error={!!errors.state}
                  value={value}
                  onChange={(e) => {
                    onChange(e.target.value);
                  }}
                  placeholder="Digite o Nome"
                />
              )}
            />
            {errors.state?.type === "required" && <Typography color={"error"}>Digite o estado</Typography>}

            <Stack flexDirection={!columnMedia ? "row" : "column"} gap={1}>
              <Box flex={1}>
                <Typography marginTop={3} marginBottom={1}>
                  Rua*
                </Typography>
                <Controller
                  rules={{ required: true }}
                  name="street"
                  defaultValue={""}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      size="small"
                      error={!!errors.street}
                      value={value}
                      onChange={(e) => {
                        onChange(e.target.value);
                      }}
                      placeholder="Digite o Nome"
                    />
                  )}
                />
                {errors.street?.type === "required" && <Typography color={"error"}>Digite a rua</Typography>}
              </Box>
              <Box>
                <Typography marginTop={3} marginBottom={1}>
                  Numero*
                </Typography>
                <Controller
                  rules={{ required: true }}
                  name="number"
                  defaultValue={""}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      size="small"
                      error={!!errors.number}
                      value={value}
                      onChange={(e) => {
                        onChange(e.target.value);
                      }}
                      type="text"
                      placeholder="Digite o Nome"
                    />
                  )}
                />
                {errors.number?.type === "required" && <Typography color={"error"}>Digite o numero</Typography>}
              </Box>
            </Stack>
          </Stack>
          <Stack flexDirection={"row"} justifyContent={"center"} marginTop={5}>
            <UserProcessSVG color={theme.palette.secondary.main} />
            <Box
              sx={{
                width: 22,
                margin: "auto 10px",
                height: 3,
                alignContent: "center",
                background: theme.palette.secondary.main,
              }}
            />
            <MarketSVG color={theme.palette.secondary.main} />

            {typeForm === "createCustomer" && (
              <>
                <Box
                  sx={{
                    width: 22,
                    margin: "auto 10px",
                    height: 3,
                    alignContent: "center",
                    background: theme.palette.primary.light,
                  }}
                />
                <OsProcessSVG color={theme.palette.primary.light} />
              </>
            )}
          </Stack>
          <Box justifyContent={"center"} display={"flex"}>
            <Stack flexDirection={"row"} justifyContent={"center"} gap={3}>
              <Button
                onClick={() => {
                  handleSubmit(onSubmit)();
                  prevFormStep();
                }}
                size="large"
                sx={{
                  marginTop: 6,
                  background: theme.palette.secondary.main,
                  color: theme.palette.background.paper,
                }}
              >
                Prev
              </Button>
              <Button
                onClick={() => {
                  handleSubmit(onSubmit)();
                }}
                size="large"
                sx={{
                  marginTop: 6,
                  background: theme.palette.secondary.main,
                  color: theme.palette.background.paper,
                }}
              >
                Next
              </Button>
            </Stack>
          </Box>
        </ContainerCustom>
      </form>
    </>
  );
};
