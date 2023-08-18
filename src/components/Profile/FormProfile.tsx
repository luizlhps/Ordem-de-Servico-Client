import { Box, Button, Grid, Stack, TextField, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Control, Controller, FieldErrors, FieldValues } from "react-hook-form";
import { AvatarProfile } from "./AvatarProfile";
import { usersApi } from "@/services/api/users";
import { RootUser } from "../../../types/users";

interface IProps {
  control: Control<FieldValues, any>;
  errors: FieldErrors<FieldValues>;
}

interface InputsFormProfile {
  name: string;
  email: string;
  phone: string;
  group: string;
}

export const FormProfile = ({ control, errors }: IProps) => {
  const theme = useTheme();

  return (
    <>
      <Stack justifyContent={"center"} alignItems={"center"}>
        <AvatarProfile control={control} />
      </Stack>

      <Grid container maxWidth={600} justifyContent={"center"} flexDirection={"column"}>
        <Grid item>
          <Typography marginTop={3} marginBottom={1}>
            Nome
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
            Email
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
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Box>
              <Typography marginTop={3} marginBottom={1}>
                Celular
              </Typography>
              <Controller
                name={"brand"}
                control={control}
                rules={{ required: true }}
                defaultValue={""}
                render={({ field: { onChange, value } }) => (
                  <TextField onChange={onChange} value={value} size="small" fullWidth />
                )}
              />
              {errors.brand?.type === "required" && <Typography color={"error"}>Digite a marca</Typography>}
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box>
              <Typography marginTop={3} marginBottom={1}>
                Cargo
              </Typography>
              <Controller
                name={"brand"}
                control={control}
                rules={{ required: true }}
                defaultValue={""}
                render={({ field: { onChange, value } }) => (
                  <TextField onChange={onChange} value={value} size="small" fullWidth />
                )}
              />
              {errors.brand?.type === "required" && <Typography color={"error"}>Digite a marca</Typography>}
            </Box>
          </Grid>
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
