import React, { useContext, useEffect, useState } from "react";
import { Container, Divider, Stack, Typography, useTheme, Grid, Button } from "@mui/material";
import styled from "styled-components";
import { FormContext } from "@/contexts";
import { useForm, Controller } from "react-hook-form";
import {
  TransformForbackEndCpf,
  TransformForbackEndPhoneNumber,
  cpfOrCnpj,
  normalizePhoneNumber,
  normalizeTelPhoneNumber,
} from "@/utils/Masks";
import validator from "validator";

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
`;
const InputImaskCustom = styled.div`
  input {
    height: 35px;
    font-size: 16px;
    color: #1e2737;
    width: 300px;
    border-radius: 0.3rem;
    padding: 4px;
    border-style: none;
    border: 1px #878787 solid;
    margin-top: 4px;
  }
`;
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

const NameForm: React.FC<NameFormProps> = ({ formStep, nextFormStep }) => {
  const theme = useTheme();

  const { setFormValues } = useContext(FormContext);
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = (data: any) => {
    console.log(data);
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
                direction={{ xs: "column", sm: "row" }}
                justifyContent={"space-between"}
                marginTop={4}
              >
                <div>
                  <Typography fontWeight={500} marginTop={2}>
                    Nome*
                  </Typography>
                  <InputCustom
                    placeholder="Digite o Nome"
                    {...register("name", { required: true })}
                  />
                  {errors.name?.type === "required" && <p>ruim</p>}

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
                    {errors.phone?.type === "required" && <p>Digite um numero celular</p>}
                    {errors.phone?.type === "minLength" && <p>Digite um numero válido</p>}
                  </InputImaskCustom>

                  <Typography marginTop={2}>Contato</Typography>
                  <InputCustom id="outlined-multiline-flexible" placeholder="Digite o Nome" />
                </div>

                <div>
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
                    {errors.cpf?.type === "required" && <p>Digite um numero celular</p>}
                    {errors.cpf?.type === "minLength" && <p>Digite um numero válido</p>}
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
                          placeholder="Ex: (11) 98765-4321"
                        />
                      )}
                      control={control}
                      name="tel"
                      rules={{ required: false, minLength: 10 }}
                    />
                    {errors.tel?.type === "minLength" && <p>Digite um numero válido</p>}
                  </InputImaskCustom>
                  <Typography marginTop={2}>Email</Typography>
                  <InputCustom
                    placeholder="Digite o Nome"
                    {...register("email", { validate: (value) => validator.isEmail(value) })}
                  />
                  {errors.email?.type === "validate" && (
                    <Typography color={"error"}>Digite um email válido</Typography>
                  )}
                </div>
              </Stack>
              <Button
                onClick={() => {
                  setValue("phone", TransformForbackEndPhoneNumber(phoneValue));
                  setValue("tel", TransformForbackEndPhoneNumber(telValue));
                  setValue("cpf", TransformForbackEndCpf(cpf));
                  handleSubmit(onSubmit)();
                  console.log("cliquei");
                }}
                size="large"
              >
                Next
              </Button>
            </form>
          </ContainerCustom>
        </>
      )}
    </>
  );
};
export default NameForm;
