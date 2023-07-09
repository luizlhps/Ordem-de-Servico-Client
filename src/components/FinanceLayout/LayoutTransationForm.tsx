import React, { useState, useEffect } from "react";
import { ICustomerAndOrderData } from "@/contexts";
import { useForm, Controller } from "react-hook-form";

import styled from "styled-components";
import FormSelect from "../FormSelect";

import {
  Box,
  Stack,
  TextField,
  Button,
  useTheme,
  Typography,
  Grid,
  useMediaQuery,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { DateTimeField, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/pt-br";
import { IFinance } from "../../../types/finance";

export interface IsetValueData {
  confirmData: any;
  data: any | undefined;
  setFormValues: any;
  loading: boolean;
}

const TextArea = styled.textarea`
  font-size: 16px;
  width: 100%;

  height: 114px;
  border-radius: 0.3rem;
  padding: 14px;
  border-style: none;
  border: 0.1px solid rgba(255, 255, 255, 0.26);
  margin-top: 14px;
  resize: none;
  font-family: arial;
  background-color: transparent;
`;

export interface ILayoutTransactionForm {
  setValueData: any;
  loading: boolean;
  dataValue?: IFinance | undefined;
}

export const LayoutTransactionForm: React.FC<ILayoutTransactionForm> = ({ setValueData, loading, dataValue }) => {
  const [dateEntry, setDateEntry] = React.useState<Dayjs | null>(dayjs(undefined));
  const [dateExit, setDateExit] = React.useState<Dayjs | null>();
  const [datePayDay, setDatePayDay] = React.useState<Dayjs | null>();

  const theme = useTheme();

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<IFinance>({
    defaultValues: {
      title: dataValue?.title,
      entryDate: dataValue ? dataValue.entryDate : dateEntry?.format(),
      description: dataValue?.description,
      payDay: dataValue ? dataValue.payDay : dateEntry?.format(),
      dueDate: dataValue ? dataValue.dueDate : dateEntry?.format(),
      status: dataValue?.status,
      amount: dataValue?.amount,
      type: dataValue?.type,
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
    setValueData(data);
  };

  const kk = watch("status");
  console.log(dataValue?.title);

  const columnMedia = useMediaQuery("(max-width:602px)");

  return (
    <>
      <Grid width={"100%"} height={"100%"} padding={1}>
        <Grid container spacing={2} marginTop={1} justifyContent="space-between">
          <Grid item>
            <Typography fontSize={14} fontWeight={300}>
              Data de entrada:
            </Typography>
            <Grid item color={theme.palette.primary.dark} fontSize={14} fontWeight={300}>
              <Controller
                name="entryDate"
                control={control}
                rules={{ required: true, validate: (value) => (value === "Invalid Date" ? false : true) }}
                render={({ field }) => (
                  <>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                      <DateTimeField
                        sx={{
                          ".MuiOutlinedInput-notchedOutline": {
                            border: "none",
                          },
                          ".MuiInputBase-input": {
                            padding: "0px!important",
                            fontSize: "14px",
                            color: theme.palette.primary.dark,
                          },
                        }}
                        {...field}
                        size="small"
                        value={dateEntry}
                        onChange={(newValue) => {
                          if (newValue !== null) {
                            setDateEntry(newValue);
                            field.onChange(dayjs(newValue).format());
                          } else {
                            field.onChange("");
                          }
                        }}
                      />
                    </LocalizationProvider>
                  </>
                )}
              />
              {errors.entryDate?.type === "required" && (
                <Typography fontSize={14} color={"error"}>
                  Coloque a data de entrada
                </Typography>
              )}
              {errors.entryDate?.type === "validate" && (
                <Typography fontSize={14} color={"error"}>
                  Coloque uma data valida
                </Typography>
              )}
            </Grid>
          </Grid>
          <Grid item>
            <Typography fontSize={14} fontWeight={300}>
              Data de Vencimento:
            </Typography>
            <Grid item color={theme.palette.primary.dark} fontSize={14} fontWeight={300}>
              <Controller
                name="dueDate"
                control={control}
                render={({ field }) => (
                  <>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                      <DateTimeField
                        sx={{
                          ".MuiOutlinedInput-notchedOutline": {
                            border: "none",
                          },
                          ".MuiInputBase-input": {
                            padding: "0px!important",
                            fontSize: "14px",
                            color: theme.palette.primary.dark,
                          },
                        }}
                        {...field}
                        size="small"
                        value={dateExit}
                        onChange={(newValue) => {
                          if (newValue !== null) {
                            setDateExit(newValue);
                            field.onChange(dayjs(newValue).format());
                          } else {
                            field.onChange("");
                          }
                        }}
                      />
                    </LocalizationProvider>
                  </>
                )}
              />
            </Grid>
          </Grid>
        </Grid>
        <Typography marginTop={5} fontWeight={500} variant="h1" textAlign={"center"}>
          Novo Serviço #001
        </Typography>

        <Grid marginTop={4}>
          <Grid container flexDirection={"row"} gap={2} justifyContent={"space-between"}>
            <Grid item width={columnMedia ? "100%" : "none"}>
              <Typography fontWeight={500}>Status</Typography>
              <Box sx={{ minWidth: 250 }}>
                <FormSelect
                  name={"status"}
                  rules={{ required: true }}
                  defaultValue={dataValue?.status}
                  control={control}
                  width={"100%"}
                >
                  <MenuItem value={"open"}>{"Aberto"}</MenuItem>
                  <MenuItem value={"finished"}>{"Finalizado"}</MenuItem>
                </FormSelect>
                {errors.status?.type === "required" && <Typography color={"error"}>Coloque o status</Typography>}
              </Box>
            </Grid>

            <Grid item width={columnMedia ? "100%" : "none"}>
              <Typography fontWeight={500}>Tipo</Typography>
              <Box sx={{ minWidth: 250 }}>
                <FormSelect
                  name={"type"}
                  rules={{ required: true }}
                  defaultValue={dataValue?.type}
                  control={control}
                  width={"100%"}
                >
                  <MenuItem value={"credit"}>{"Crédito"}</MenuItem>
                  <MenuItem value={"debit"}>{"Débito"}</MenuItem>
                </FormSelect>
                {errors.type?.type === "required" && <Typography color={"error"}>Coloque o Tipo</Typography>}
              </Box>
            </Grid>
          </Grid>

          <Typography marginTop={2} fontWeight={500}>
            Título
          </Typography>

          <TextField
            size="small"
            defaultValue={dataValue ? dataValue.description : ""}
            fullWidth
            {...register("title", { required: true })}
          />
          <Typography marginTop={2} fontWeight={500}>
            Descrição
          </Typography>
          <TextArea
            defaultValue={dataValue ? dataValue.description : ""}
            style={{ color: theme.palette.primary.main }}
            {...register("description", { required: true })}
          />

          <Typography marginTop={2} fontWeight={500}>
            Valor
          </Typography>
          <TextField type="number" size="small" fullWidth {...register("amount", { required: true })} />
          <Typography marginTop={2} fontWeight={500}>
            Data de pagamento
          </Typography>
          <Grid item color={theme.palette.primary.dark}>
            <Controller
              name="payDay"
              control={control}
              render={({ field }) => (
                <>
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                    <DateTimeField
                      {...field}
                      disabled
                      size="small"
                      value={datePayDay}
                      onChange={(newValue) => {
                        if (newValue !== null) {
                          setDatePayDay(newValue);
                          field.onChange(dayjs(newValue).format());
                        } else {
                          field.onChange("");
                        }
                      }}
                    />
                  </LocalizationProvider>
                </>
              )}
            />
          </Grid>
          <Box display={"flex"} justifyContent={"center"}>
            <Button
              sx={{
                width: "300px",
                borderRadius: "10px",
                marginTop: 9,
                marginBottom: 3,
                background: theme.palette.secondary.main,
              }}
              onClick={() => handleSubmit(onSubmit)()}
            >
              {loading ? <CircularProgress size={25} /> : "Confirmar"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
