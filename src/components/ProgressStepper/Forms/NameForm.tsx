import React, { useContext, useEffect, useState } from "react";

//CSS Import MUI AND STYLED COMPONENTS
import { Container, Divider, Stack, Typography, useTheme, Box, Button } from "@mui/material";
import styled from "styled-components";
import { FormContext } from "@/contexts";
import useMediaQuery from "@mui/material/useMediaQuery";

//ReactHookForm
import { useForm, Controller } from "react-hook-form";
import {
  TransformForbackEndCpf,
  TransformForbackEndPhoneNumber,
  cpfOrCnpj,
  normalizePhoneNumber,
  normalizeTelPhoneNumber,
} from "@/utils/Masks";
import validator from "validator";
import {
  MarketSVG,
  OsProcessSVG,
  UserProcessSVG,
} from "../../../../public/icon/SVGS/IconsSVG";

//style custom
const InputCustom = styled.input`
  height: 35px;
  font-size: 16px;
  color: #1e2737;
  width: 300px;
  border-radius: 0.3rem;
  padding: 4px;
  border-style: none;
  border: 1px #878787 solid;
  margin-top: 4px;
  font-family: arial;

  @media (max-width: 1110px) {
    width: 100%;
  }
`;
const InputImaskCustom = styled.div`
  input {
    height: 35px;
    font-size: 16px;
    width: 300px;
    border-radius: 0.3rem;
    padding: 4px;
    border-style: none;
    border: 1px #878787 solid;
    margin-top: 4px;

    @media (max-width: 1110px) {
      width: 100%;
    }
  }
`;
const ContainerCustom = styled.div`
  padding: 60px;

  @media (max-width: 600px) {
    padding: 0px;
  }
`;

interface NameFormProps {
  formStep: number;
  nextFormStep: () => void;
}
type Inputs = {
  name: string;
  phone: string | undefined;
  contact: string | undefined;
  cpf: string | undefined;
  tel: string | undefined;
  email: string;

  phoneInput: string;
};

//code
const NameForm: React.FC<NameFormProps> = ({ formStep, nextFormStep }) => {
  const theme = useTheme();
  const columnMedia = useMediaQuery("(max-width:1110px)");

  const { setFormValues } = useContext(FormContext);
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = (data: Inputs) => {
    setFormValues(data);
    nextFormStep();
  };

  const phoneValue = watch("phone");
  const telValue = watch("tel");
  const cpf = watch("cpf");

  return (
    <>
      {formStep <= 0 && (
        <>
          <ContainerCustom>
            <Typography variant="h1" fontWeight={500}>
              Cadastro
            </Typography>
            <Divider
              sx={{
                width: 39,
                height: 5,
                background: theme.palette.secondary.main,
                marginLeft: 1,
              }}
            />
            <form>
              <Stack
                direction={columnMedia ? "column" : "row"}
                justifyContent={"space-between"}
                marginTop={4}
              >
                <Box
                  color={theme.palette.primary.main}
                  sx={{
                    input: {
                      background: theme.palette.background.paper,
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  <Typography fontWeight={500} marginTop={2}>
                    Nome*
                  </Typography>
                  <InputCustom
                    placeholder="Digite o nome"
                    {...register("name", { required: true })}
                  />
                  {errors.name?.type === "required" && (
                    <Typography color={"error"}>ruim</Typography>
                  )}

                  <Typography fontWeight={500} marginTop={2}>
                    Celular*
                  </Typography>
                  <InputImaskCustom>
                    <Controller
                      render={({ field }) => (
                        <input
                          type="text"
                          value={normalizePhoneNumber(field.value)}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                          placeholder="Ex: (11) 98765-4321"
                        />
                      )}
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
                  </InputImaskCustom>

                  <Typography marginTop={2}>Contato</Typography>
                  <InputCustom
                    id="outlined-multiline-flexible"
                    placeholder="Digite o contato"
                    {...register("contact", { minLength: 6 })}
                  />
                  {errors.contact?.type === "minLength" && (
                    <Typography color={"error"}>Digite um numero válido</Typography>
                  )}
                </Box>

                <Box
                  color={theme.palette.primary.main}
                  sx={{
                    input: {
                      background: theme.palette.background.paper,
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  <Typography marginTop={2}>CPF/CNPJ*</Typography>
                  <InputImaskCustom>
                    <Controller
                      render={({ field }) => (
                        <input
                          maxLength={15}
                          type="text"
                          value={cpfOrCnpj(field.value)}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                          placeholder="Ex: 00.000.000/0001-91"
                        />
                      )}
                      control={control}
                      name="cpf"
                      rules={{ required: true, minLength: 11 }}
                    />
                    {errors.cpf?.type === "required" && (
                      <Typography color={"error"}>Digite um numero celular</Typography>
                    )}
                    {errors.cpf?.type === "minLength" && (
                      <Typography color={"error"}>Digite um numero válido</Typography>
                    )}
                  </InputImaskCustom>

                  <Typography marginTop={2}>Telefone</Typography>
                  <InputImaskCustom>
                    <Controller
                      render={({ field }) => (
                        <input
                          maxLength={14}
                          type="text"
                          value={normalizeTelPhoneNumber(field.value)}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                          placeholder="Ex: (11) 3265-4321"
                        />
                      )}
                      control={control}
                      name="tel"
                      rules={{ required: false, minLength: 10 }}
                    />
                    {errors.tel?.type === "minLength" && (
                      <Typography color={"error"}>Digite um numero válido</Typography>
                    )}
                  </InputImaskCustom>
                  <Typography marginTop={2}>Email</Typography>
                  <InputCustom
                    placeholder="Digite o email"
                    {...register("email", {
                      validate: (value) => {
                        if (value === "") {
                          return true;
                        } else {
                          return validator.isEmail(value);
                        }
                      },
                    })}
                  />
                  {errors.email?.type === "validate" && (
                    <Typography color={"error"}>Digite um email válido</Typography>
                  )}
                </Box>
              </Stack>
              <Stack flexDirection={"row"} justifyContent={"center"} marginTop={8}>
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
              </Stack>
              <Box justifyContent={"center"} display={"flex"}>
                <Button
                  onClick={() => {
                    setValue("phone", TransformForbackEndPhoneNumber(phoneValue));
                    setValue("tel", TransformForbackEndPhoneNumber(telValue));
                    setValue("cpf", TransformForbackEndCpf(cpf));
                    handleSubmit(onSubmit)();
                    console.log("cliquei");
                  }}
                  size="large"
                  sx={{
                    marginTop: 6,
                    background: theme.palette.secondary.main,
                  }}
                >
                  Next
                </Button>
              </Box>
            </form>
          </ContainerCustom>
        </>
      )}
    </>
  );
};
export default NameForm;
