import { IDetailsStatus } from "@/services/api/statusApi";
import { Box, Button, CircularProgress, Stack, TextField, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

interface IPropsNewOfficials {
  fetchApi: () => void;
  loading: boolean;
  submitFunction: (data: any) => void;
  data?: IDetailsStatus;
}

export const FormStatus = ({ loading, submitFunction, data }: IPropsNewOfficials) => {
  //form
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("name", data?.name);
  }, [data]);

  const theme = useTheme();
  return (
    <>
      <Box marginTop={4} width={"80%"}>
        <Typography id="transition-modal-title" variant="h1" textAlign={"center"}>
          Novo Status
        </Typography>

        <Stack marginTop={4}>
          <Typography fontWeight={600}>Nome do status</Typography>
          <Controller
            defaultValue=""
            name={"name"}
            control={control}
            rules={{ required: true, minLength: 3 }}
            render={({ field: { onChange, value } }) => (
              <TextField sx={{ fontWeight: 300 }} onChange={onChange} value={value} size="small" fullWidth />
            )}
          />

          {errors.name?.type === "required" && <Typography color={"error"}>Digite o `título`.</Typography>}
          {errors.name?.type === "minLength" && (
            <Typography color={"error"}>Digite um titulo com até 3 caracteres.</Typography>
          )}

          <Button
            size="large"
            sx={{
              marginTop: 6,
              marginBottom: 3,
              background: theme.palette.secondary.main,
            }}
            onClick={() => handleSubmit(submitFunction)()}
          >
            {loading ? (
              <>
                <CircularProgress size={25} />
              </>
            ) : (
              <>Confirmar</>
            )}
          </Button>
        </Stack>
      </Box>
    </>
  );
};
