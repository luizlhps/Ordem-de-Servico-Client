import { Box, Button, CircularProgress, Grid, Stack, TextField, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { InputsFormUser } from "@/services/configApplicationApi";
import { IUser } from "../../../types/users";

interface IProps {
  handleContinueForm?: () => void;
  loading: boolean;
  setValueForm: (valueToUpdate: InputsFormUser) => void;
  handlePreviousForm?: () => void;
  notRequired?: boolean;
}

export const FormLayoutProfilePassword = ({
  handleContinueForm,
  loading,
  handlePreviousForm,
  setValueForm,
  notRequired,
}: IProps) => {
  const theme = useTheme();

  const [eyePassword, setEyePassword] = useState(true);

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<InputsFormUser>();

  const handleEyePassword = () => {
    setEyePassword((old) => !old);
  };
  const passwordWatch = watch("password");

  const onSubmit: SubmitHandler<InputsFormUser> = (data) => {
    if (handleContinueForm) handleContinueForm();
    setValueForm(data);
  };

  return (
    <>
      <Grid item width={"100%"}>
        <Typography marginTop={3} marginBottom={1}>
          Digite a senha
        </Typography>
        <Box position={"relative"} width={"100%"}>
          <Controller
            defaultValue=""
            name={"password"}
            control={control}
            rules={{ required: notRequired ? !notRequired : true, minLength: 6 }}
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
                  top={"50%"}
                  right={"10px"}
                  sx={{ cursor: "pointer", transform: "translate(-50%, -50%)" }}
                >
                  <VisibilityIcon />
                </Box>
              ) : (
                <Box
                  onClick={handleEyePassword}
                  position={"absolute"}
                  top={"50%"}
                  right={"10px"}
                  sx={{ cursor: "pointer", transform: "translate(-50%, -50%)" }}
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
      <Grid item width={"100%"}>
        <Typography marginTop={3} marginBottom={1}>
          Repita a nova senha
        </Typography>
        <Controller
          defaultValue=""
          name={"checkPassword"}
          control={control}
          rules={{
            required: notRequired ? !notRequired : true,
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
      <Stack flexDirection={"row"} gap={1} width={"100%"} alignItems={"flex-end"} flex={1}>
        {/* if exist backhandle */}
        {handlePreviousForm && (
          <>
            <Button
              onClick={handlePreviousForm}
              fullWidth
              sx={{
                marginTop: 5,
                padding: 1,
                color: `${theme.palette.primary.main}!important`,
                background: theme.palette.secondary.main,
                flex: 1,
              }}
            >
              Voltar
            </Button>
          </>
        )}

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
      </Stack>
    </>
  );
};
