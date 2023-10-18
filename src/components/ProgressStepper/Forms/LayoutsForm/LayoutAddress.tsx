import { SearchCep } from "@/components/SearchCep";
import { Box, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { Control, Controller, FieldErrors, UseFormClearErrors } from "react-hook-form";
import { IAddress } from "../../../../../types/customer";

interface IProps {
  control: Control<IInputsAddressForm, any>;
  errors: FieldErrors<IInputsAddressForm>;
  wrapColumn: boolean;
  cepError: boolean;
  setValueCepField: React.Dispatch<React.SetStateAction<string | undefined>>;
  clearErrors: UseFormClearErrors<IInputsAddressForm>;
}

export interface IInputsAddressForm {
  address: IAddress;
}

export const LayoutAddress = ({ control, errors, cepError, wrapColumn, setValueCepField, clearErrors }: IProps) => {
  return (
    <>
      <Stack direction={"column"} justifyContent={"space-between"} marginTop={4} width={"100%"}>
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
          name="address.city"
          defaultValue={""}
          rules={{ required: true }}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              size="small"
              error={!!errors.address?.city}
              value={value}
              onChange={(e) => {
                onChange(e.target.value);
              }}
              fullWidth
              placeholder="Digite o Nome"
            />
          )}
        />
        {errors.address?.city?.type === "required" && <Typography color={"error"}>Digite a cidade</Typography>}
        <Typography marginTop={3} marginBottom={1}>
          Bairro*
        </Typography>
        <Controller
          rules={{ required: true }}
          name="address.neighborhood"
          defaultValue={""}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              size="small"
              fullWidth
              error={!!errors.address?.neighborhood}
              value={value}
              onChange={(e) => {
                onChange(e.target.value);
              }}
              placeholder="Digite o Nome"
            />
          )}
        />
        {errors.address?.neighborhood?.type === "required" && <Typography color={"error"}>Digite o bairro</Typography>}
        <Typography marginTop={3} marginBottom={1}>
          Complemento
        </Typography>

        <Controller
          name="address.complement"
          defaultValue={""}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              fullWidth
              size="small"
              error={!!errors.address?.complement}
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
          name="address.state"
          defaultValue={""}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              fullWidth
              size="small"
              error={!!errors.address?.state}
              value={value}
              onChange={(e) => {
                onChange(e.target.value);
              }}
              placeholder="Digite o Nome"
            />
          )}
        />
        {errors.address?.state?.type === "required" && <Typography color={"error"}>Digite o estado</Typography>}

        <Stack flexDirection={!wrapColumn ? "row" : "column"} gap={1}>
          <Box flex={1}>
            <Typography marginTop={3} marginBottom={1}>
              Rua*
            </Typography>
            <Controller
              rules={{ required: true }}
              name="address.street"
              defaultValue={""}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  error={!!errors.address?.street}
                  value={value}
                  onChange={(e) => {
                    onChange(e.target.value);
                  }}
                  placeholder="Digite o Nome"
                />
              )}
            />
            {errors.address?.street?.type === "required" && <Typography color={"error"}>Digite a rua</Typography>}
          </Box>
          <Box>
            <Typography marginTop={3} marginBottom={1}>
              Numero*
            </Typography>
            <Controller
              rules={{ required: true }}
              name="address.number"
              defaultValue={""}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  error={!!errors.address?.number}
                  value={value}
                  onChange={(e) => {
                    onChange(e.target.value);
                  }}
                  type="text"
                  placeholder="Digite o Nome"
                />
              )}
            />
            {errors.address?.number?.type === "required" && <Typography color={"error"}>Digite o numero</Typography>}
          </Box>
        </Stack>
      </Stack>
    </>
  );
};
