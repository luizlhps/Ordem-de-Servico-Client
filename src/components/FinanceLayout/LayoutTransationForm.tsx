import React, { useState } from "react";
import { ICustomerAndOrderData } from "@/contexts";
import { Box, Stack, TextField, Button, useTheme, Typography, Grid, useMediaQuery } from "@mui/material";
import { useForm } from "react-hook-form";

import styled from "styled-components";

export interface IConfigContext {
  confirmData: any;
  data: ICustomerAndOrderData | undefined;
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
  ConfigContext: IConfigContext;
  costumer: any;
  handleClose: () => void;
  setCostumerId: React.Dispatch<any | undefined>;
}

export const LayoutTransactionForm: React.FC<ILayoutTransactionForm> = ({
  ConfigContext,
  handleClose,
  setCostumerId,
  costumer,
}) => {
  const { confirmData, data, setFormValues, loading } = ConfigContext;

  const theme = useTheme();

  const onSubmit = (data: any) => {};

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const columnMedia = useMediaQuery("(max-width:602px)");

  return (
    <>
      <Grid width={"100%"} height={"100%"} padding={1}>
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item>
            <Typography fontSize={14} fontWeight={300}>
              Data de entrada:
            </Typography>
            <Grid item color={theme.palette.primary.dark} fontSize={14} fontWeight={300}>
              16/16/1616
            </Grid>
          </Grid>
          <Grid item>
            <Typography fontSize={14} fontWeight={300}>
              Data de entrada:
            </Typography>
            <Grid item color={theme.palette.primary.dark} fontSize={14} fontWeight={300}>
              16/16/1616
            </Grid>
          </Grid>
        </Grid>
        <Typography marginTop={6} fontWeight={500} variant="h1" textAlign={"center"}>
          Novo Serviço #001
        </Typography>

        <Grid marginTop={4}>
          <Grid container flexDirection={"row"} gap={2} justifyContent={"space-between"}>
            <Grid item width={columnMedia ? "100%" : "none"}>
              <Typography fontWeight={500}>Status</Typography>
              <TextField size="small" fullWidth />
            </Grid>

            <Grid item width={columnMedia ? "100%" : "none"}>
              <Typography fontWeight={500}>Tipo</Typography>
              <TextField size="small" fullWidth />
            </Grid>
          </Grid>

          <Typography marginTop={2} fontWeight={500}>
            Título
          </Typography>

          <TextField size="small" fullWidth />
          <Typography marginTop={2} fontWeight={500}>
            Descrição
          </Typography>
          <TextArea style={{ color: theme.palette.primary.main }} />

          <Typography marginTop={2} fontWeight={500}>
            Valor
          </Typography>
          <TextField size="small" fullWidth />

          <Box display={"flex"} justifyContent={"center"}>
            <Button
              sx={{
                width: "400px",
                borderRadius: "40px",
                marginTop: 19,
                marginBottom: 3,
                background: theme.palette.secondary.main,
              }}
              onClick={() => handleSubmit(onSubmit)()}
            >
              Criar Transação
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
