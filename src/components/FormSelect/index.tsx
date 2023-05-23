import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Control, Controller } from "react-hook-form";

interface IProps {
  children: React.ReactNode;
  control: Control<any>;
  name: string;
  defaultValue: string;
  label: string;
}

export default function FormSelect({ children, control, name, defaultValue, label }: IProps) {
  return (
    <Box sx={{ minWidth: 120, marginTop: 6 }}>
      <FormControl size="small" sx={{ width: "100%" }}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Controller
          control={control}
          name={name}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error },
            formState,
          }) => (
            <Select
              defaultValue={defaultValue}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              onChange={onChange}
            >
              {children}
            </Select>
          )}
        ></Controller>
      </FormControl>
    </Box>
  );
}
