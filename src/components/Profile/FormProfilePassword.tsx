import { usersApi } from "@/services/api/usersApi";
import { Box, Button, CircularProgress, Grid, Stack, TextField, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { Control, Controller, FieldErrors, FieldValues, SubmitHandler, useForm } from "react-hook-form";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { ToastSuccess } from "../Toast/ToastSuccess";
import { ToastError } from "../Toast/ToastError";

interface IProps {}

interface InputsFormProfile {
  checkPassword: string;
  password: string;
}

export const FormProfilePassword = ({}: IProps) => {
  const theme = useTheme();
  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<InputsFormProfile>();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [messageError, setMessageError] = useState("");

  const [eyePassword, setEyePassword] = useState(true);

  const handleEyePassword = () => {
    setEyePassword((old) => !old);
  };

  const passwordWatch = watch("password");

  const onSubmit: SubmitHandler<InputsFormProfile> = (data: InputsFormProfile) => {
    setLoading(true);
    usersApi
      .updateProfilePassword(data)
      .then((res) => {
        setSuccess(true);
      })
      .catch((err) => {
        setMessageError(typeof err.request.response === "string" ? err.request.response : "Ocorreu um erro!!");
        setError(true);
      })
      .finally(() => setLoading(false));
  };
  return (
    <>
      <ToastSuccess alertSuccess="Atualizado com sucesso" formSuccess={success} setFormSuccess={setSuccess} />
      <ToastError errorMessage={messageError} formError={error} setFormError={setError} />
      <Stack marginTop={10} justifyContent={"center"} alignItems={"center"}>
        <Typography variant="h1">Mudar senha</Typography>
        <Typography fontWeight={300} fontSize={14}>
          Digite sua nova senha
        </Typography>
      </Stack>

      <Grid
        container
        maxWidth={600}
        marginTop={4}
        justifyContent={"center"}
        flexDirection={"column"}
        display={"flex"}
        justifyItems={"flex-end"}
      >
        <Grid item>
          <Typography marginTop={3} marginBottom={1}>
            Nova Senha
          </Typography>
          <Box position={"relative"} width={"100%"}>
            <Controller
              defaultValue=""
              name={"password"}
              control={control}
              rules={{ required: true, minLength: 6 }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  onChange={onChange}
                  value={value}
                  size="small"
                  fullWidth
                  type={!eyePassword ? "text" : "password"}
                />
              )}
            />
            {passwordWatch && (
              <>
                {eyePassword ? (
                  <Box
                    onClick={handleEyePassword}
                    position={"absolute"}
                    top={6}
                    right={"10px"}
                    sx={{ cursor: "pointer" }}
                  >
                    <VisibilityIcon />
                  </Box>
                ) : (
                  <Box
                    onClick={handleEyePassword}
                    position={"absolute"}
                    top={6}
                    right={"10px"}
                    sx={{ cursor: "pointer" }}
                  >
                    <VisibilityOffIcon />
                  </Box>
                )}
              </>
            )}
          </Box>
          {errors.password?.type === "required" && <Typography color={"error"}>Digite a senha</Typography>}
          {errors.password?.type === "minLength" && (
            <Typography color={"error"}>A senha deve ter no minimo 6 caracteres</Typography>
          )}
        </Grid>
        <Grid item>
          <Typography marginTop={3} marginBottom={1}>
            Repita a nova senha
          </Typography>
          <Controller
            defaultValue=""
            name={"checkPassword"}
            control={control}
            rules={{
              required: true,
              validate: (val) => {
                return val === passwordWatch;
              },
            }}
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={onChange}
                value={value}
                size="small"
                fullWidth
                type={!eyePassword ? "text" : "password"}
              />
            )}
          />

          {errors?.checkPassword?.type === "required" && (
            <Typography color="error">Confirmação de senha é obrigatoria.</Typography>
          )}
          {errors?.checkPassword?.type === "validate" && <Typography color="error">As senhas não conferem.</Typography>}
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
  );
};
