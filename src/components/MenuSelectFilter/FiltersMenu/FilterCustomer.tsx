import { Box, Button, Divider, Menu, Typography, useMediaQuery, Stack, useTheme, InputProps } from "@mui/material";
import React, { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { useGetFetchCustomers } from "@/hook/useGetFetchCustomers";
import { Control, UseFormSetValue } from "react-hook-form";
import { ComboBox } from "@/components/ComboBox";

interface IProps {
  control: Control<any, any>;
  setValue: UseFormSetValue<any>;
}

export const FilterCustomer = ({ control, setValue }: IProps) => {
  const theme = useTheme();

  const { customerData, error, fetchApi } = useGetFetchCustomers();

  useEffect(() => {
    fetchApi({ search: "" }, 0, 0);
  }, []);

  return (
    <>
      <Stack flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
        <Typography marginTop={1} padding={"6px 14px"}>
          Cliente
        </Typography>
        <Box onClick={() => setValue("customer", "")} sx={{ cursor: "pointer" }}>
          <Typography fontSize={12} marginTop={1} padding={"6px 14px"} color={theme.palette.secondary.main}>
            Resetar
          </Typography>
        </Box>
      </Stack>

      <ComboBox
        defaultValue={""}
        control={control}
        customStyle={{ padding: "6px 14px", marginBottom: 1 }}
        data={customerData.customer}
        name="customer"
        property="name"
      />
      <Divider />
    </>
  );
};
