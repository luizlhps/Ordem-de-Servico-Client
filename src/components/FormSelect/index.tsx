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
  setState?: React.Dispatch<React.SetStateAction<any | undefined>>;
}

export default function FormSelect({ children, control, name, defaultValue, label, setState }: IProps) {
  const [first, setfirst] = React.useState("");

  return (
    <Box sx={{ minWidth: 120, marginTop: 6 }}>
      <FormControl size="small" sx={{ width: "100%" }}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Controller
          defaultValue={first[0]}
          control={control}
          name={name}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error },
            formState,
          }) => (
            <Select
              defaultValue={first[0]}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              onChange={(event) => {
                const selectedValue = event.target.value;
                onChange(selectedValue);
                setfirst(selectedValue);
                console.log(first);
              }}
            >
              {children}
            </Select>
          )}
        ></Controller>
      </FormControl>
    </Box>
  );
}
