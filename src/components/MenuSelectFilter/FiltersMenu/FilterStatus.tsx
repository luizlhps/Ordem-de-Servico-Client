import { Box, Divider, InputProps, Stack, Typography, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import { Control, UseFormSetValue } from "react-hook-form";
import { useGetFetchStatus } from "@/hook/useGetFetchStatus";
import { ComboBox } from "@/components/ComboBox";

interface IProps {
  control: Control<any, any>;
  setValue: UseFormSetValue<any>;
}

export const FilterStatus = ({ control, setValue }: IProps) => {
  const theme = useTheme();
  const { fetchApi, loading, statusData } = useGetFetchStatus();

  useEffect(() => {
    fetchApi({ search: "" }, 0, 0);
  }, []);

  return (
    <>
      <Stack flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
        <Typography marginTop={1} padding={"6px 14px"}>
          Status
        </Typography>
        <Box onClick={() => setValue("status", "")} sx={{ cursor: "pointer" }}>
          <Typography fontSize={12} marginTop={1} padding={"6px 14px"} color={theme.palette.secondary.main}>
            Resetar
          </Typography>
        </Box>
      </Stack>

      <ComboBox
        defaultValue={""}
        control={control}
        customStyle={{ padding: "6px 14px", marginBottom: 1 }}
        data={statusData.status}
        name="status"
        property="name"
      />

      <Divider />
    </>
  );
};
