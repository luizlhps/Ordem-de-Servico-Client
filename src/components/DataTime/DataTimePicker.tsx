import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Typography } from "@mui/material";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("pt-br");

interface IDataTimePickerProps {
  data: any;
  control: Control<any, any>;
  errors: FieldErrors<any>;
  nameField: string;
}

export const DataTimePicker = ({ data, control, errors, nameField }: IDataTimePickerProps) => {
  return (
    <>
      <Controller
        name={nameField}
        defaultValue={data ? dayjs(data[nameField]).format() : dayjs().format()}
        control={control}
        rules={{ required: true, validate: (value) => (value === "Invalid Date" ? false : true) }}
        render={({ field }) => (
          <>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
              <DateTimePicker
                {...field}
                sx={{ marginTop: 0, "& .MuiInputBase-input": { padding: "8.5px" } }}
                value={dayjs(field.value)}
                onChange={(newValue) => {
                  field.onChange(dayjs(newValue).format());
                  console.log(newValue);
                }}
              />
            </LocalizationProvider>
          </>
        )}
      />
      {errors.dateEntry?.type === "required" && <Typography color={"error"}>Coloque a data de entrada</Typography>}
      {errors.dateEntry?.type === "validate" && <Typography color={"error"}>Coloque a data correta</Typography>}
    </>
  );
};
