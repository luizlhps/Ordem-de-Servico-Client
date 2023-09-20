import { Box, Button, Grid, Stack, TextField, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Control, Controller, FieldErrors, useForm } from "react-hook-form";
import { AvatarProfile } from "../Profile/AvatarProfile";
import {
  Cnpj,
  TransformForbackEndCpf,
  TransformForbackEndPhoneNumber,
  normalizePhoneNumber,
  normalizeTelPhoneNumber,
} from "@/utils/Masks";
import { InputsFormCreateStore } from "@/services/configApplicationApi";
import { RootStore } from "../../../types/store";

interface IProps {
  data?: RootStore;
  setValueForm: (valueToUpdate: InputsFormCreateStore) => void;
  uploudAvatar: (formData: FormData, blob: Blob, closeModal: () => void) => Promise<void>;
}

export const StoreFormLayoutName = ({ uploudAvatar, setValueForm, data }: IProps) => {
  const [display, setDisplay] = useState("");
  const [CNPJDisplay, setCNPJDisplay] = useState("");
  const [telephoneDisplay, setTelephoneDisplay] = useState("");
  const theme = useTheme();

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<InputsFormCreateStore>();

  useEffect(() => {
    if (data) {
      setValue("telephone", data.telephone);
      setValue("cnpj", data.cnpj);
      setValue("name", data.name);
      setValue("phone", data.phone);

      setCNPJDisplay(Cnpj(data.cnpj));
      setTelephoneDisplay(normalizeTelPhoneNumber(data.telephone));
      setDisplay(normalizePhoneNumber(data.phone));
    }
  }, [data]);

  const onSubmit = (data: InputsFormCreateStore) => {
    setValueForm(data);
  };

  return (
    <>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
        <AvatarProfile avatarLink={data?.avatar} uploudAvatar={uploudAvatar} formRect />
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
          rules={{ required: true, minLength: 11 }}
          render={({ field: { onChange, value } }) => (
            <TextField
              inputProps={{ maxLength: 18 }}
              onChange={(e) => {
                const newValue = e.target.value;
                onChange(TransformForbackEndCpf(newValue));
                setCNPJDisplay(Cnpj(newValue));
              }}
              value={CNPJDisplay}
              size="small"
              placeholder="00.000.000/0001-00"
              fullWidth
            />
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
          rules={{ required: true, minLength: 10 }}
          render={({ field: { onChange, value } }) => (
            <TextField
              inputProps={{ maxLength: 15 }}
              onChange={(e) => {
                const newValue = e.target.value;
                onChange(TransformForbackEndPhoneNumber(newValue));
                setTelephoneDisplay(normalizeTelPhoneNumber(newValue));
              }}
              value={telephoneDisplay}
              size="small"
              placeholder="(99) 9999-9999"
              fullWidth
            />
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
            <>Proximo</>
          </Button>
        </Stack>
      </Grid>
    </>
  );
};
