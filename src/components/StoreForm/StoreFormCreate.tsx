import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { usersApi } from "@/services/api/users";
import { useContext, useEffect, useState } from "react";
import { ToastSuccess } from "../Toast/ToastSuccess";
import { ToastError } from "../Toast/ToastError";
import { SessionContext } from "@/auth/SessionProvider";
import { TransformForbackEndPhoneNumber, normalizePhoneNumber } from "@/utils/Masks";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { InputsFormCreateStore, InputsFormCreateUserAdmin } from "@/services/installApplicationApi";
import { AvatarProfile } from "../Profile/AvatarProfile";

interface IProps {}

export const FormStoreCreate = ({}: IProps) => {
  const theme = useTheme();
  const { fetchMyInfo } = useContext(SessionContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [messageError, setMessageError] = useState("");

  const [display, setDisplay] = useState("");
  const [eyePassword, setEyePassword] = useState(true);

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<InputsFormCreateStore>();

  const handleEyePassword = () => {
    setEyePassword((old) => !old);
  };

  const onSubmit: SubmitHandler<InputsFormCreateStore> = (data) => {
    console.log(data);

    /*  setLoading(true);
    /*     usersApi
      .updateProfile(data)
      .then((res) => {
        setSuccess(true);
        fetchMyInfo();
      })
      .catch((err) => {
        setMessageError(typeof err.request.response === "string" ? err.request.response : "Ocorreu um erro!!");
        setError(true);
      })
      .finally(() => setLoading(false)); */
  };

  const columnMedia = useMediaQuery("(max-width:1110px)");

  return (
    <>
      <>
        <Stack justifyContent={"center"} alignItems={"center"}>
          <AvatarProfile avatarLink={""} uploudAvatar={async () => {}} formRect />
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
              Nome da Empresa
            </Typography>
            <Controller
              name={"name"}
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField sx={{ fontWeight: 300 }} onChange={onChange} value={value} size="small" fullWidth />
              )}
            />
            {errors.name?.type === "required" && <Typography color={"error"}>Digite o sobre o nome</Typography>}
          </Grid>
          <Grid item>
            <Typography marginTop={3} marginBottom={1}>
              CNPJ
            </Typography>
            <Controller
              name={"cnpj"}
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField onChange={onChange} value={value} size="small" fullWidth />
              )}
            />

            {errors.cnpj?.type === "required" && <Typography color={"error"}>Digite o cnpj</Typography>}
            <Grid>
              <Grid>
                <Box>
                  <Typography marginTop={3} marginBottom={1}>
                    Celular
                  </Typography>
                  <Controller
                    name={"phone"}
                    control={control}
                    rules={{ required: true, minLength: 11 }}
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
                  {errors.phone?.type === "required" && <Typography color={"error"}>Digite o celular</Typography>}
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Box position={"relative"} width={"100%"}>
              <Typography marginTop={3} marginBottom={1}>
                Digite o telefone
              </Typography>
              <Controller
                defaultValue=""
                name={"telephone"}
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
            </Box>
          </Grid>
          <Stack direction={"column"} justifyContent={"space-between"} marginTop={4}>
            <Typography fontWeight={500} marginTop={3} marginBottom={1}>
              CEP*
            </Typography>
            <Controller
              name="cep"
              defaultValue={""}
              rules={{ required: true, minLength: 8, validate: (value) => !errorForm }}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  onBlur={searchCep}
                  error={!!errors.cep}
                  inputProps={{ maxLength: 8, pattern: "/d+/" }}
                  fullWidth
                  value={numbersOnly(value).replace(/^(\d{5})(\d{3})$/, "$1-$2")}
                  onChange={(e) => {
                    onChange(e.target.value);
                  }}
                  size="small"
                  placeholder="Digite o Nome"
                />
              )}
            />
            {errors.cep?.type === "required" && <Typography color={"error"}>Digite um cep</Typography>}
            {errorForm === true && <Typography color={"error"}>Digite um cep válido</Typography>}

            <Typography marginTop={3} marginBottom={1}>
              Cidade*
            </Typography>
            <Controller
              name="city"
              defaultValue={""}
              rules={{ required: true }}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  size="small"
                  error={!!errors.city}
                  value={value}
                  onChange={(e) => {
                    onChange(e.target.value);
                  }}
                  fullWidth
                  id="outlined-multiline-flexible"
                  placeholder="Digite o Nome"
                />
              )}
            />
            {errors.city?.type === "required" && <Typography color={"error"}>Digite a cidade</Typography>}
            <Typography marginTop={3} marginBottom={1}>
              Bairro*
            </Typography>
            <Controller
              rules={{ required: true }}
              name="neighborhood"
              defaultValue={""}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  size="small"
                  fullWidth
                  error={!!errors.neighborhood}
                  value={value}
                  onChange={(e) => {
                    onChange(e.target.value);
                  }}
                  id="outlined-multiline-flexible"
                  placeholder="Digite o Nome"
                />
              )}
            />
            {errors.neighborhood?.type === "required" && <Typography color={"error"}>Digite o bairro</Typography>}
            <Typography marginTop={3} marginBottom={1}>
              Complemento
            </Typography>

            <Controller
              name="complement"
              defaultValue={""}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  error={!!errors.complement}
                  value={value}
                  onChange={(e) => {
                    onChange(e.target.value);
                  }}
                  id="outlined-multiline-flexible"
                  placeholder="Digite o Nome"
                />
              )}
            />

            <Typography marginTop={3} marginBottom={1}>
              Estado*
            </Typography>
            <Controller
              rules={{ required: true }}
              name="state"
              defaultValue={""}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  error={!!errors.state}
                  value={value}
                  onChange={(e) => {
                    onChange(e.target.value);
                  }}
                  placeholder="Digite o Nome"
                />
              )}
            />
            {errors.state?.type === "required" && <Typography color={"error"}>Digite o estado</Typography>}

            <Stack flexDirection={!columnMedia ? "row" : "column"} gap={1}>
              <Box flex={1}>
                <Typography marginTop={3} marginBottom={1}>
                  Rua*
                </Typography>
                <Controller
                  rules={{ required: true }}
                  name="address.street"
                  defaultValue={""}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      size="small"
                      error={!!errors.address?.street}
                      value={value}
                      onChange={(e) => {
                        onChange(e.target.value);
                      }}
                      placeholder="Digite o Nome"
                    />
                  )}
                />
                {errors.street?.type === "required" && <Typography color={"error"}>Digite a rua</Typography>}
              </Box>
              <Box>
                <Typography marginTop={3} marginBottom={1}>
                  Numero*
                </Typography>
                <Controller
                  rules={{ required: true }}
                  name="number"
                  defaultValue={""}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      size="small"
                      error={!!errors.number}
                      value={value}
                      onChange={(e) => {
                        onChange(e.target.value);
                      }}
                      type="text"
                      placeholder="Digite o Nome"
                    />
                  )}
                />
                {errors.number?.type === "required" && <Typography color={"error"}>Digite o numero</Typography>}
              </Box>
            </Stack>
          </Stack>

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
