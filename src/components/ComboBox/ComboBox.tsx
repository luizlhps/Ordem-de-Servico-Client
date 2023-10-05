import { Autocomplete, Box, TextField } from "@mui/material";
import React, { CSSProperties } from "react";
import { Control, Controller } from "react-hook-form";

interface IProps {
  control: Control<any>;
  name: string;
  rules?: {
    validade?: () => void;
    required?: boolean;
  };
  data: any;
  clearErrors?: any;
  customStyle: CSSProperties;
  property: string;
  defaultValue: any;
}

export const ComboBox = ({ control, name, rules, data, clearErrors, customStyle, property, defaultValue }: IProps) => {
  const style: CSSProperties = {
    width: "100%",
  };

  const conbinedStyleWithNewAttributes = customStyle ? { ...style, ...customStyle } : style;
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue ? defaultValue : null}
      rules={rules}
      render={({ field }) => (
        <Autocomplete
          {...field}
          size="small"
          sx={conbinedStyleWithNewAttributes}
          disablePortal
          defaultValue={null}
          options={data}
          renderInput={(params) => <TextField {...params} />}
          getOptionLabel={(option) => option[property]}
          value={
            field.value
              ? data.find((item: any) => {
                  return field.value === item._id;
                }) ?? null
              : null
          }
          renderOption={(props, option) => (
            <Box component="li" {...props} key={option.id}>
              {option[property]}
            </Box>
          )}
          onChange={(event, newValue) => {
            field.onChange(newValue ? newValue._id : null);
            clearErrors;
          }}
        />
      )}
    />
  );
};
