import { numbersOnly } from "@/utils/Masks";
import { TextField, Typography } from "@mui/material";
import React from "react";
import { Control, Controller, FieldErrors, UseFormClearErrors } from "react-hook-form";

interface SearchCepProps {
  control: Control<any, any>;
  setValueCepField: React.Dispatch<React.SetStateAction<string | undefined>>;
  cepError: boolean;
  errors: FieldErrors<any>;
  clearErrors: UseFormClearErrors<any>;
}

export const SearchCep: React.FC<SearchCepProps> = ({ control, setValueCepField, cepError, errors, clearErrors }) => {
  return (
    <>
      <Typography fontWeight={500} marginBottom={1}>
        CEP*
      </Typography>
      <Controller
        name="address.cep"
        defaultValue={""}
        rules={{ required: true, minLength: 8, validate: (value) => !cepError }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            onBlur={() => {
              setValueCepField(value);
              clearErrors();
            }}
            error={!!errors.cep}
            inputProps={{ maxLength: 8, pattern: "/d+/" }}
            fullWidth
            value={numbersOnly(value).replace(/^(\d{5})(\d{3})$/, "$1-$2")}
            onChange={(e) => {
              onChange(numbersOnly(e.target.value));
            }}
            size="small"
            placeholder="Digite o Nome"
          />
        )}
      />
      {errors.cep?.type === "required" && <Typography color={"error"}>Digite um cep</Typography>}
      {cepError === true && <Typography color={"error"}>Digite um cep válido</Typography>}
    </>
  );
};
