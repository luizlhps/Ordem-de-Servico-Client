import React, { useContext, useEffect } from "react";

//CSS Import MUI AND STYLED COMPONENTS
import { Divider, Stack, Typography, useTheme, Box, Button, TextField } from "@mui/material";
import styled from "styled-components";

import useMediaQuery from "@mui/material/useMediaQuery";

//ReactHookForm
import { useForm, Controller } from "react-hook-form";

//utils
import {
  TransformForbackEndCpf,
  TransformForbackEndPhoneNumber,
  cpfOrCnpj,
  normalizePhoneNumber,
  normalizeTelPhoneNumber,
} from "@/utils/Masks";
import validator from "validator";
import { MarketSVG, OsProcessSVG, UserProcessSVG } from "../../../../public/icon/SVGS/IconsSVG";
import { TypeForm } from "./types";
import { DialogModalScroll } from "@/components/Modal/DialogModalScroll";

//style custom

const ContainerCustom = styled.div`
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 600px) {
    padding: 6px;
  }
`;

interface NameFormProps {
  formStep: number;
  nextFormStep: () => void;
  typeForm: TypeForm;
  setData: any;
  data: any;
}

type Inputs = {
  name: string;
  phone: string | undefined;
  contact: string | undefined;
  cpfOrCnpj: string | undefined;
  tel: string | undefined;
  email: string;

  phoneInput: string;
};

//code
export const NameForm: React.FC<NameFormProps> = ({ formStep, nextFormStep, typeForm, setData, data }) => {
  const theme = useTheme();
  const columnMedia = useMediaQuery("(max-width:720px)");

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = (data: Inputs) => {
    setData(data);
    nextFormStep();
  };

  useEffect(() => {
    if (data) {
      setValue("name", data.name);
      setValue("email", data.email);
      setValue("contact", data.contact);
      setValue("cpfOrCnpj", data.cpfOrCnpj);
      setValue("phone", data.phone);
      setValue("tel", data.tel);
    }
  }, [data]);

  const phoneValue = watch("phone");
  const telValue = watch("tel");
  const cpf = watch("cpfOrCnpj");

  return (
    <>
      <>
        <DialogModalScroll.Title>Cadastro</DialogModalScroll.Title>
        <DialogModalScroll.Content dividers={true} customStyle={{ borderBottom: "none" }}>
          <Stack direction={"column"} justifyContent={"space-between"} marginTop={2} width={"100%"}>
            <Box
              color={theme.palette.primary.main}
              sx={{
                input: {
                  background: theme.palette.background.paper,
                  color: theme.palette.primary.main,
                },
              }}
            >
              <Typography fontWeight={500} marginTop={3} marginBottom={1}>
                Nome*
              </Typography>
              <Controller
                name={"name"}
                control={control}
                rules={{ required: true }}
                defaultValue={""}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    error={!!errors.name}
                    onChange={onChange}
                    value={value}
                    size="small"
                    placeholder="Digite seu nome"
                    fullWidth
                  />
                )}
              />
              {errors.name?.type === "required" && <Typography color={"error"}>Digite um nome*</Typography>}

              <Typography marginTop={3} marginBottom={1}>
                Email
              </Typography>

              <Controller
                name={"email"}
                control={control}
                rules={{
                  required: false,
                  validate: (value) => {
                    if (value.length > 0) {
                      return validator.isEmail(value);
                    }
                    return true;
                  },
                }}
                defaultValue={""}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    error={!!errors.email}
                    onChange={onChange}
                    value={value}
                    size="small"
                    placeholder="Digite seu email"
                    fullWidth
                  />
                )}
              />
              {errors.email?.type === "validate" && <Typography color={"error"}>Digite um email válido*</Typography>}
              <Stack flexDirection={columnMedia ? "column" : "row"} justifyContent={"space-between"} gap={1}>
                <Box flex={1}>
                  <Typography marginTop={3} marginBottom={1}>
                    Contato
                  </Typography>
                  <Controller
                    name={"contact"}
                    control={control}
                    rules={{ required: false }}
                    defaultValue={""}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        error={!!errors.contact}
                        onChange={onChange}
                        value={value}
                        size="small"
                        placeholder="Robson celular: 99+ 99999-9999"
                        fullWidth
                      />
                    )}
                  />
                  {errors.contact?.type === "minLength" && (
                    <Typography color={"error"}>Digite um numero válido*</Typography>
                  )}
                </Box>

                <Box>
                  <Typography marginTop={3} marginBottom={1}>
                    CPF/CNPJ*
                  </Typography>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        error={!!errors.cpfOrCnpj}
                        fullWidth
                        inputProps={{ maxLength: 16 }}
                        size="small"
                        value={cpfOrCnpj(field.value)}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                        placeholder="Ex: 00.000.000/0001-91"
                      />
                    )}
                    defaultValue=""
                    control={control}
                    name="cpfOrCnpj"
                    rules={{ required: true, minLength: 11 }}
                  />
                  {errors.cpfOrCnpj?.type === "required" && (
                    <Typography color={"error"}>Digite um CPF ou CNPJ*</Typography>
                  )}
                  {errors.cpfOrCnpj?.type === "minLength" && (
                    <Typography color={"error"}>Digite um numero válido*</Typography>
                  )}
                </Box>
              </Stack>
              <Stack flexDirection={columnMedia ? "column" : "row"} justifyContent={"space-between"} gap={1}>
                <Box flex={1}>
                  <Typography fontWeight={500} marginTop={3} marginBottom={1}>
                    Celular*
                  </Typography>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        error={!!errors.phone}
                        type="text"
                        fullWidth
                        inputProps={{ maxLength: 15 }}
                        size="small"
                        value={normalizePhoneNumber(field.value)}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                        placeholder="Ex: (11) 98765-4321"
                      />
                    )}
                    defaultValue=""
                    control={control}
                    name="phone"
                    rules={{ required: true, minLength: 11 }}
                  />
                  {errors.phone?.type === "required" && (
                    <Typography color={"error"}>Digite um numero celular</Typography>
                  )}
                  {errors.phone?.type === "minLength" && (
                    <Typography color={"error"}>Digite um numero válido</Typography>
                  )}
                </Box>

                <Box>
                  <Typography marginTop={3} marginBottom={1}>
                    Telefone
                  </Typography>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        error={!!errors.tel}
                        inputProps={{ maxLength: 14 }}
                        size="small"
                        fullWidth
                        type="text"
                        value={normalizeTelPhoneNumber(field.value)}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                        placeholder="Ex: (11) 3265-4321"
                      />
                    )}
                    defaultValue=""
                    control={control}
                    name="tel"
                    rules={{ required: false, minLength: 10 }}
                  />
                  {errors.tel?.type === "minLength" && <Typography color={"error"}>Digite um numero válido</Typography>}
                </Box>
              </Stack>
            </Box>
          </Stack>

          {/* footer */}
        </DialogModalScroll.Content>

        <DialogModalScroll.Footer>
          <Stack flexDirection={"row"} justifyContent={"center"} margin={2}>
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
            <MarketSVG color={theme.palette.primary.light} />

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
                <OsProcessSVG color={theme.palette.primary.light} />{" "}
              </>
            )}
          </Stack>
          <Button
            fullWidth
            onClick={() => {
              setValue("phone", TransformForbackEndPhoneNumber(phoneValue));
              setValue("tel", TransformForbackEndPhoneNumber(telValue));
              setValue("cpfOrCnpj", TransformForbackEndCpf(cpf));
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
        </DialogModalScroll.Footer>
      </>
    </>
  );
};
