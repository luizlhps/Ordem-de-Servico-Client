import React, { CSSProperties, useEffect } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Typography } from "@mui/material";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("pt-br");

interface IDataTimePickerProps {
  data?: any;
  control: Control<any, any>;
  errors: FieldErrors<any>;
  nameField: string;
  required?: boolean;
  dateNow?: boolean;
  customStyle?: CSSProperties | any;
}

export const DatePickerControlled = ({
  data,
  control,
  errors,
  nameField,
  required,
  dateNow,
  customStyle,
}: IDataTimePickerProps) => {
  const style: CSSProperties | any = { marginTop: 0, "& .MuiInputBase-input": { padding: "8.5px" } };

  const conbinedStyleWithNewAttributes = customStyle ? { ...style, ...customStyle } : style;
  return (
    <>
      <Controller
        name={nameField}
        defaultValue={data && data[nameField] ? dayjs(data[nameField]).format() : null}
        control={control}
        rules={{
          required: required ? required : false,
          validate: (value) => (value === "Invalid Date" ? false : true),
        }}
        render={({ field }) => (
          <>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
              <DatePicker
                {...field}
                sx={conbinedStyleWithNewAttributes}
                value={field.value !== null ? dayjs(field.value) : null}
                onChange={(newValue) => {
                  field.onChange(dayjs(newValue).format());
                }}
              />
            </LocalizationProvider>
          </>
        )}
      />
      {errors[nameField]?.type === "required" && <Typography color={"error"}>Coloque a data</Typography>}
      {errors[nameField]?.type === "validate" && <Typography color={"error"}>Coloque a data correta</Typography>}
    </>
  );
};
