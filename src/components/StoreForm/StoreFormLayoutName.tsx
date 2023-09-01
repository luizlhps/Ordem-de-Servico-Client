import { Box, Button, Grid, Stack, TextField, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { Control, Controller, FieldErrors, useForm } from "react-hook-form";
import { AvatarProfile } from "../Profile/AvatarProfile";
import { TransformForbackEndPhoneNumber, normalizePhoneNumber } from "@/utils/Masks";
import { InputsFormCreateStore } from "@/services/installApplicationApi";

interface IProps {
  setValueForm: (valueToUpdate: InputsFormCreateStore) => void;
}

export const StoreFormLayoutName = ({ setValueForm }: IProps) => {
  const [display, setDisplay] = useState("");
  const theme = useTheme();
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<InputsFormCreateStore>();

  const onSubmit = (data: InputsFormCreateStore) => {
    console.log(data);

    setValueForm(data);
  };

  return (
    <>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
        <AvatarProfile avatarLink={""} uploudAvatar={async () => {}} formRect />
      </Box>

      <Grid width={"100%"}>
        <Typography marginTop={3} marginBottom={1}>
          Nome da Empresa
        </Typography>
        <Controller
          defaultValue=""
          name={"name"}
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextField
              placeholder="Nome da empresa"
              sx={{ fontWeight: 300 }}
              onChange={onChange}
              value={value}
              size="small"
              fullWidth
            />
          )}
        />
        {errors.name?.type === "required" && <Typography color={"error"}>Digite o nome da empresa</Typography>}

        <Typography marginTop={3} marginBottom={1}>
          CNPJ
        </Typography>
        <Controller
          defaultValue=""
          name={"cnpj"}
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextField placeholder="99.999.999/0000-99" onChange={onChange} value={value} size="small" fullWidth />
          )}
        />

        {errors.cnpj?.type === "required" && <Typography color={"error"}>Digite o cnpj</Typography>}
        <Typography marginTop={3} marginBottom={1}>
          Celular
        </Typography>
        <Controller
          defaultValue=""
          name={"phone"}
          control={control}
          rules={{ required: true, minLength: 11 }}
          render={({ field: { onChange, value } }) => (
            <TextField
              inputProps={{ maxLength: 15 }}
              onChange={(e) => {
                const newValue = e.target.value;
                onChange(TransformForbackEndPhoneNumber(newValue));
                setDisplay(normalizePhoneNumber(newValue));
              }}
              value={display}
              size="small"
              placeholder="(99) 99999-9999"
              fullWidth
            />
          )}
        />
        {errors.phone?.type === "required" && <Typography color={"error"}>Digite o celular</Typography>}

        <Typography marginTop={3} marginBottom={1}>
          Digite o telefone
        </Typography>
        <Controller
          defaultValue=""
          name={"telephone"}
          control={control}
          rules={{ required: true, minLength: 6 }}
          render={({ field: { onChange, value } }) => (
            <TextField placeholder="(99) 9999-9999" onChange={onChange} value={value} size="small" fullWidth />
          )}
        />
        <Stack flexDirection={"row"} gap={1}>
          <Button
            onClick={handleSubmit(onSubmit)}
            fullWidth
            sx={{
              marginTop: 5,
              padding: 1,
              color: `${theme.palette.primary.main}!important`,
              background: theme.palette.secondary.main,
              flex: 1,
            }}
          >
            <>Completar</>
          </Button>
        </Stack>
      </Grid>
    </>
  );
};
