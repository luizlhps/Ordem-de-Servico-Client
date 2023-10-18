import { cpfOrCnpj, normalizePhoneNumber, normalizeTelPhoneNumber } from "@/utils/Masks";
import { Box, Stack, TextField, Typography, useTheme } from "@mui/material";
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import validator from "validator";

export interface IInputsNameForm {
  name: string;
  phone: string | undefined;
  contact: string | undefined;
  cpfOrCnpj: string | undefined;
  tel: string | undefined;
  email: string;

  phoneInput: string;
}

interface IProps {
  control: Control<IInputsNameForm, any>;
  errors: FieldErrors<IInputsNameForm>;
  wrapColumn: boolean;
}

export const LayoutName = ({ control, errors, wrapColumn }: IProps) => {
  const theme = useTheme();

  return (
    <>
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
          <Typography fontWeight={500} marginBottom={1}>
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
          <Stack flexDirection={wrapColumn ? "column" : "row"} justifyContent={"space-between"} gap={1}>
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
              {errors.cpfOrCnpj?.type === "required" && <Typography color={"error"}>Digite um CPF ou CNPJ*</Typography>}
              {errors.cpfOrCnpj?.type === "minLength" && (
                <Typography color={"error"}>Digite um numero válido*</Typography>
              )}
            </Box>
          </Stack>
          <Stack flexDirection={wrapColumn ? "column" : "row"} justifyContent={"space-between"} gap={1}>
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
              {errors.phone?.type === "required" && <Typography color={"error"}>Digite um numero celular</Typography>}
              {errors.phone?.type === "minLength" && <Typography color={"error"}>Digite um numero válido</Typography>}
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
    </>
  );
};
