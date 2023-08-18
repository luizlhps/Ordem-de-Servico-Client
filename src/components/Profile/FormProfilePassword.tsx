import { Box, Button, Grid, Stack, TextField, Typography, useTheme } from "@mui/material";
import React from "react";
import { Control, Controller, FieldErrors, FieldValues } from "react-hook-form";

interface IProps {
  control: Control<FieldValues, any>;
  errors: FieldErrors<FieldValues>;
}

export const FormProfilePassword = ({ control, errors }: IProps) => {
  const theme = useTheme();
  return (
    <>
      <Stack marginTop={10} justifyContent={"center"} alignItems={"center"}>
        <Typography variant="h1">Mudar senha</Typography>
        <Typography fontWeight={300} fontSize={14}>
          Digite sua nova senha
        </Typography>
      </Stack>

      <Grid container maxWidth={600} marginTop={4} justifyContent={"center"} flexDirection={"column"}>
        <Grid item>
          <Typography marginTop={3} marginBottom={1}>
            Senha Antiga
          </Typography>
          <Controller
            defaultValue=""
            name={"equipment"}
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextField sx={{ fontWeight: 300 }} onChange={onChange} value={value} size="small" fullWidth />
            )}
          />
          {errors.equipment?.type === "required" && (
            <Typography color={"error"}>Digite o sobre o equipamento</Typography>
          )}
        </Grid>
        <Grid item>
          <Typography marginTop={3} marginBottom={1}>
            Nova Senha
          </Typography>
          <Controller
            defaultValue=""
            name={"model"}
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextField onChange={onChange} value={value} size="small" fullWidth />
            )}
          />

          {errors.model?.type === "required" && <Typography color={"error"}>Digite o modelo</Typography>}
        </Grid>
        <Grid item>
          <Typography marginTop={3} marginBottom={1}>
            Repita a nova senha
          </Typography>
          <Controller
            defaultValue=""
            name={"model"}
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextField onChange={onChange} value={value} size="small" fullWidth />
            )}
          />

          {errors.model?.type === "required" && <Typography color={"error"}>Digite o modelo</Typography>}
        </Grid>

        <Button
          fullWidth
          sx={{
            marginTop: 5,
            padding: 1,
            color: `${theme.palette.primary.main}!important`,
            background: theme.palette.secondary.main,
            flex: 1,
          }}
        >
          Salvar
        </Button>
      </Grid>
    </>
  );
};
