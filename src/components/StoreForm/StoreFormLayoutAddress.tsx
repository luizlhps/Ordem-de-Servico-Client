import { Box, Button, Grid, Stack, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Control, Controller, FieldErrors, UseFormSetValue, useForm } from "react-hook-form";
import { AvatarProfile } from "../Profile/AvatarProfile";
import { TransformForbackEndPhoneNumber, normalizePhoneNumber } from "@/utils/Masks";
import { InputsFormCreateStore } from "@/services/installApplicationApi";
import useSearchCep from "@/hook/useSearchCep";
import { SearchCep } from "../SearchCep";

interface IProps {
  setValueForm: (valueToUpdate: InputsFormCreateStore) => void;
  handlePreviousForm: () => void;
  loading: boolean;
}

export const StoreFormLayoutAddress = ({ setValueForm, handlePreviousForm, loading }: IProps) => {
  const theme = useTheme();
  const [valueCepField, setValueCepField] = useState<string>();
  const { cepError, cepData } = useSearchCep(valueCepField);

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<InputsFormCreateStore>();

  const columnMedia = useMediaQuery("(max-width:1110px)");

  useEffect(() => {
    console.log(cepData);
    if (cepData) {
      setValue("address.city", cepData.localidade);
      setValue("address.neighborhood", cepData.bairro);
      setValue("address.complement", cepData.complemento);
      setValue("address.state", cepData.uf);
      setValue("address.street", cepData.logradouro);
    }
  }, [cepData]);

  const onSubmit = (data: InputsFormCreateStore) => {
    console.log(data);

    setValueForm(data);
  };

  return (
    <>
      <Box display={"flex"} alignItems={"center"} flexDirection={"column"} height={221} justifyContent={"center"}>
        <Typography variant="h1" marginTop={1}>
          Endereço
        </Typography>
        <Typography fontWeight={300} fontSize={14}>
          Complete o formulário de endereço da loja
        </Typography>
      </Box>

      <SearchCep cepError={cepError} control={control} errors={errors} setValueCepField={setValueCepField} />
      <Typography marginTop={3} marginBottom={1}>
        Cidade*
      </Typography>
      <Controller
        defaultValue=""
        name="address.city"
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
            placeholder="Digite a cidade"
          />
        )}
      />
      {errors.address?.city?.type === "required" && <Typography color={"error"}>Digite a cidade</Typography>}
      <Typography marginTop={3} marginBottom={1}>
        Bairro*
      </Typography>
      <Controller
        defaultValue=""
        rules={{ required: true }}
        name="address.neighborhood"
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
            placeholder="Digite o bairro"
          />
        )}
      />
      {errors.address?.neighborhood?.type === "required" && <Typography color={"error"}>Digite o bairro</Typography>}
      <Typography marginTop={3} marginBottom={1}>
        Complemento
      </Typography>

      <Controller
        defaultValue=""
        name="address.complement"
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
            placeholder="Digite o complemento"
          />
        )}
      />

      <Typography marginTop={3} marginBottom={1}>
        Estado*
      </Typography>
      <Controller
        defaultValue=""
        rules={{ required: true }}
        name="address.state"
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
            placeholder="Digite o estado"
          />
        )}
      />
      {errors.address?.type === "required" && <Typography color={"error"}>Digite o estado</Typography>}

      <Stack flexDirection={!columnMedia ? "row" : "column"} gap={1}>
        <Box flex={1}>
          <Typography marginTop={3} marginBottom={1}>
            Rua*
          </Typography>
          <Controller
            defaultValue=""
            rules={{ required: true }}
            name="address.street"
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
                placeholder="Digite a rua"
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
            defaultValue=""
            rules={{ required: true }}
            name="address.number"
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
                placeholder="Digite o numero"
              />
            )}
          />
          {errors.address?.type === "required" && <Typography color={"error"}>Digite o numero</Typography>}
        </Box>
      </Stack>
      <Stack flexDirection={"row"} gap={1}>
        <Button
          onClick={handlePreviousForm}
          fullWidth
          sx={{
            marginTop: 5,
            padding: 1,
            color: `${theme.palette.primary.main}!important`,
            background: theme.palette.secondary.main,
            flex: 1,
          }}
        >
          <>Voltar</>
        </Button>
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
    </>
  );
};
