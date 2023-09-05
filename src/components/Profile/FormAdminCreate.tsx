import { Box, Button, CircularProgress, Grid, Stack, TextField, Typography, useTheme } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { AvatarProfile } from "./AvatarProfile";
import { usersApi } from "@/services/api/users";
import { useContext, useEffect, useState } from "react";
import { ToastSuccess } from "../Toast/ToastSuccess";
import { ToastError } from "../Toast/ToastError";
import { SessionContext } from "@/auth/SessionProvider";
import { TransformForbackEndPhoneNumber, normalizePhoneNumber } from "@/utils/Masks";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { InputsFormCreateUserAdmin, installApplicationApi } from "@/services/installApplicationApi";
import { useRouter } from "next/router";

interface IProps {}

export const FormAdminCreate = ({}: IProps) => {
  const theme = useTheme();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [data, setData] = useState();
  const [formDataAvatar, setFormDataAvatar] = useState<FormData>();

  const [display, setDisplay] = useState("");
  const [eyePassword, setEyePassword] = useState(true);

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<InputsFormCreateUserAdmin>();

  const handleEyePassword = () => {
    setEyePassword((old) => !old);
  };

  const passwordWatch = watch("password");

  const uploudAvatar = async (formData: FormData, blob: Blob, closeModal: () => void) => {
    setLoadingAvatar(true);

    const ext = blob.type.split("/")[1];
    formData.append("storeAvatar", blob, `avatar.${ext}`);
    setFormDataAvatar(formData);
    closeModal();
  };

  const onSubmit: SubmitHandler<InputsFormCreateUserAdmin> = (data) => {
    console.log(data);

    setLoading(true);
    installApplicationApi
      .CreateAdmin(data)
      .then((res) => {
        setSuccess(true);

        if (formDataAvatar) {
          console.log("oi");
          installApplicationApi
            .uploudAvatarUserAdmin(formDataAvatar)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
              typeof err.response.data === "string" ? err.response.data : "Ocorreu um erro!!";
            })
            .finally(async () => {
              setLoadingAvatar(false);
            });
        }
      })
      .catch((err) => {
        console.log(err);
        setMessageError(
          typeof err.response.data.message === "string" ? err.response.data.message : "Ocorreu um erro!!"
        );
        setError(true);
      })
      .finally(() => {
        setLoading(false);
        setTimeout(() => {
          router.push("./login");
        }, 1000);
      });
  };

  return (
    <>
      <>
        <Stack justifyContent={"center"} alignItems={"center"}>
          <AvatarProfile avatarLink="" uploudAvatar={uploudAvatar} />
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
              defaultValue={""}
              name={"name"}
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  placeholder="Nome"
                  sx={{ fontWeight: 300 }}
                  onChange={onChange}
                  value={value}
                  size="small"
                  fullWidth
                />
              )}
            />
            {errors.name?.type === "required" && <Typography color={"error"}>Digite o sobre o nome</Typography>}
          </Grid>
          <Grid item>
            <Typography marginTop={3} marginBottom={1}>
              Email
            </Typography>
            <Controller
              defaultValue={""}
              name={"email"}
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField onChange={onChange} value={value} size="small" placeholder="Email" fullWidth />
              )}
            />

            {errors.email?.type === "required" && <Typography color={"error"}>Digite o email</Typography>}
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
                  defaultValue={""}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      inputProps={{ maxLength: 15 }}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        onChange(TransformForbackEndPhoneNumber(newValue));
                        setDisplay(normalizePhoneNumber(newValue));
                      }}
                      placeholder="(99) 99999-9999"
                      value={display}
                      size="small"
                      fullWidth
                    />
                  )}
                />
                {errors.phone?.type === "required" && <Typography color={"error"}>Digite o celular</Typography>}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box>
                <Typography marginTop={3} marginBottom={1}>
                  Cargo
                </Typography>

                <TextField defaultValue={"adminMaster"} disabled size="small" fullWidth />
              </Box>
            </Grid>
          </Grid>

          <Grid item>
            <Box position={"relative"} width={"100%"}>
              <Typography marginTop={3} marginBottom={1}>
                Digite a senha
              </Typography>
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
                      top={40}
                      right={"10px"}
                      sx={{ cursor: "pointer" }}
                    >
                      <VisibilityIcon />
                    </Box>
                  ) : (
                    <Box
                      onClick={handleEyePassword}
                      position={"absolute"}
                      top={40}
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
            {errors?.checkPassword?.type === "validate" && (
              <Typography color="error">As senhas não conferem.</Typography>
            )}
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
    </>
  );
};