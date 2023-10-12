import { DatePickerControlled } from "@/components/DataTime";
import { Box, Divider, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Control, UseFormSetValue, FieldErrors } from "react-hook-form";

interface IProps {
  control: Control<any, any>;
  setValue: UseFormSetValue<any>;
  errors: FieldErrors<any>;
}

export interface IRangeDateFilter {
  dateFrom?: string | null | undefined;
  dateTo?: string | null | undefined;
}

export const FilterRangeDate = ({ control, setValue, errors }: IProps) => {
  const theme = useTheme();
  const smallphoneMedia = useMediaQuery("(max-width:370px)");

  return (
    <>
      <Stack flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
        <Typography marginTop={1} padding={"6px 14px"}>
          Intervalo
        </Typography>
        <Box
          onClick={() => {
            setValue("dateFrom", undefined);
            setValue("dateTo", undefined);
          }}
          sx={{ cursor: "pointer" }}
        >
          <Typography fontSize={12} marginTop={1} padding={"6px 14px"} color={theme.palette.secondary.main}>
            Resetar
          </Typography>
        </Box>
      </Stack>

      <Stack
        padding={"0px 14px"}
        paddingBottom={"4px"}
        flexDirection={"row"}
        gap={1}
        marginBottom={1}
        flexWrap={smallphoneMedia ? "wrap" : "nowrap"}
      >
        <Stack>
          <Typography color={theme.palette.grey[600]} fontSize={12} marginBottom={1}>
            De
          </Typography>
          <DatePickerControlled
            customStyle={{
              width: smallphoneMedia ? "100%" : 150,
              "& .MuiInputBase-input": {
                paddingTop: "10px",
                paddingBottom: "10px",
              },
            }}
            control={control}
            nameField="dateFrom"
            errors={errors}
          />
        </Stack>
        <Stack>
          <Typography color={theme.palette.grey[600]} fontSize={12} marginBottom={1}>
            Para
          </Typography>
          <DatePickerControlled
            customStyle={{
              width: smallphoneMedia ? "100%" : 150,
              "& .MuiInputBase-input": {
                paddingTop: "10px",
                paddingBottom: "10px",
              },
            }}
            control={control}
            nameField="dateTo"
            errors={errors}
          />
        </Stack>
      </Stack>

      <Divider />
    </>
  );
};
