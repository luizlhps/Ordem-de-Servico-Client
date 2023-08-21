import { Box, Button, CircularProgress, Grid, Stack, TextField, Typography, useTheme } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { AvatarProfile } from "./AvatarProfile";
import { usersApi } from "@/services/api/users";
import { useContext, useEffect, useState } from "react";
import { ToastSuccess } from "../Toast/ToastSuccess";
import { ToastError } from "../Toast/ToastError";
import { SessionContext } from "@/auth/SessionProvider";
import { TransformForbackEndPhoneNumber, normalizePhoneNumber } from "@/utils/Masks";

interface IProps {
  data: any;
}

interface InputsFormProfile {
  name: string;
  email: string;
  phone: string;
}

export const FormProfile = ({ data }: IProps) => {
  const theme = useTheme();
  const { fetchMyInfo } = useContext(SessionContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [messageError, setMessageError] = useState("");

  const [display, setDisplay] = useState("");

  useEffect(() => {
    setDisplay(normalizePhoneNumber(data?.phone));
  }, [data]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<InputsFormProfile>();

  const onSubmit: SubmitHandler<InputsFormProfile> = (data) => {
    setLoading(true);
    usersApi
      .updateProfile(data)
      .then((res) => {
        setSuccess(true);
        fetchMyInfo();
      })
      .catch((err) => {
        setMessageError(typeof err.request.response === "string" ? err.request.response : "Ocorreu um erro!!");
        setError(true);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      {data ? (
        <>
          <Stack justifyContent={"center"} alignItems={"center"}>
            <AvatarProfile />
          </Stack>

          <ToastSuccess
            alertSuccess="Perfil atualizado com sucesso!!"
            formSuccess={success}
            setFormSuccess={setSuccess}
          />
          <ToastError errorMessage={messageError} formError={error} setFormError={setError} />
          <Grid container maxWidth={600} justifyContent={"center"} flexDirection={"column"}>
            <Grid item>
              <Typography marginTop={3} marginBottom={1}>
                Nome
              </Typography>
              <Controller
                defaultValue={data?.name}
                name={"name"}
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <TextField sx={{ fontWeight: 300 }} onChange={onChange} value={value} size="small" fullWidth />
                )}
              />
              {errors.name?.type === "required" && (
                <Typography color={"error"}>Digite o sobre o equipamento</Typography>
              )}
            </Grid>
            <Grid item>
              <Typography marginTop={3} marginBottom={1}>
                Email
              </Typography>
              <Controller
                defaultValue={data?.email}
                name={"email"}
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <TextField onChange={onChange} value={value} size="small" fullWidth />
                )}
              />

              {errors.email?.type === "required" && <Typography color={"error"}>Digite o modelo</Typography>}
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Box>
                  <Typography marginTop={3} marginBottom={1}>
                    Celular
                  </Typography>
                  <Controller
                    name={"phone"}
                    control={control}
                    rules={{ required: true, minLength: 11 }}
                    defaultValue={data?.phone}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        inputProps={{ maxLength: 15 }}
                        onChange={(e) => {
                          const newValue = e.target.value;
                          onChange(TransformForbackEndPhoneNumber(newValue));
                          setDisplay(normalizePhoneNumber(newValue));
                        }}
                        value={display}
                        size="small"
                        fullWidth
                      />
                    )}
                  />
                  {errors.phone?.type === "required" && <Typography color={"error"}>Digite a marca</Typography>}
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box>
                  <Typography marginTop={3} marginBottom={1}>
                    Cargo
                  </Typography>

                  <TextField defaultValue={data?.group?.name} disabled size="small" fullWidth />
                </Box>
              </Grid>
            </Grid>
            <Button
              onClick={handleSubmit(onSubmit)}
              fullWidth
              sx={{
                marginTop: 5,
                padding: 1,
                color: `${theme.palette.primary.main}!important`,
                background: theme.palette.secondary.main,
                flex: 1,
              }}
            >
              {loading ? <CircularProgress size={25} /> : <>Salvar</>}
            </Button>
          </Grid>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
