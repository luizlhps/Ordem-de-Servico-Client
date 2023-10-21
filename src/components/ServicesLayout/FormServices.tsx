import { IDetailsStatus } from "@/services/api/statusApi";
import { numbersOnly } from "@/utils/Masks";
import { InputAdornment, TextField, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { Control, Controller, FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface IProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  control: Control<FieldValues, any>;
}

export const FormServices = ({ register, errors, control }: IProps) => {
  return (
    <>
      <Typography fontWeight={600} alignSelf={"flex-start"} marginBottom={1}>
        Título
      </Typography>
      <TextField
        fullWidth
        placeholder="Digite o título"
        {...register("title", { required: true, minLength: 3 })}
      ></TextField>
      {errors.title?.type === "required" && (
        <Typography alignSelf={"flex-start"} color={"error"}>
          Digite o título.
        </Typography>
      )}
      {errors.title?.type === "minLength" && (
        <Typography alignSelf={"flex-start"} color={"error"}>
          Digite um titulo com até 3 caracteres.
        </Typography>
      )}

      <Typography alignSelf={"flex-start"} marginTop={2} fontWeight={600} marginBottom={1}>
        Descrição
      </Typography>
      <TextField
        multiline
        rows={6}
        fullWidth
        placeholder="Digite a descrição do serviço"
        {...register("description", { required: true, minLength: 3 })}
      ></TextField>
      {errors.description?.type === "required" && (
        <Typography alignSelf={"flex-start"} color={"error"}>
          Digite a descrição.
        </Typography>
      )}
      {errors.description?.type === "minLength" && (
        <Typography alignSelf={"flex-start"} color={"error"}>
          Digite a descrição com até 3 caracteres.
        </Typography>
      )}

      <Typography alignSelf={"flex-start"} marginTop={2} fontWeight={600} marginBottom={1}>
        Valor
      </Typography>

      <Controller
        name="amount"
        control={control}
        defaultValue={"00,00"}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextField
            InputProps={{
              startAdornment: <InputAdornment position="start">R$</InputAdornment>,
            }}
            fullWidth
            type="number"
            value={value}
            onChange={(e) => {
              const newValue = e.target.value;
              const valueSplitAfterPoint = newValue.split(".");

              console.log(newValue);

              if (
                valueSplitAfterPoint.length === 1 ||
                (valueSplitAfterPoint.length === 2 && valueSplitAfterPoint[1].length <= 2)
              ) {
                if (newValue !== "") {
                  onChange(parseFloat(newValue));
                  return;
                } else {
                  onChange(newValue);
                }
              }

              console.log(value);
            }}
          />
        )}
      />

      {errors.amount?.type === "required" && (
        <Typography alignSelf={"flex-start"} color={"error"}>
          Digite o valor.
        </Typography>
      )}
      {errors.amount?.type === "validate" && (
        <Typography alignSelf={"flex-start"} color={"error"}>
          O número após o ponto deve ter no máximo 2 dígitos..
        </Typography>
      )}
    </>
  );
};
