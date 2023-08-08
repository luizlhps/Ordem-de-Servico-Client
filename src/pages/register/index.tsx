import { ReactElement, useContext, useState } from "react";
import { useForm } from "react-hook-form";

import styled from "@emotion/styled";
import { Box, Container, Stack, Typography, useTheme, Button } from "@mui/material";

import Image from "next/image";
import Link from "next/link";

import validator from "validator";
import { SessionContext } from "@/auth/SessionProvider";

//style custom
const InputCustom = styled.input`
  height: 38px;
  font-size: 16px;
  color: #1e2737;
  width: 100%;
  border-radius: 0.3rem;
  padding: 8px;
  border-style: none;
  border: 1px #878787 solid;
  margin-top: 4px;
  font-family: arial;
`;

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const passwordWatch = watch("password");

  const [selectedItems, setSelectedItems] = useState<any>([]);
  const { signIn } = useContext(SessionContext);

  const onSubmit = async (data: any) => {
    await signIn({
      email: data.email,
      password: data.password,
    });
  };

  const handleSelect = (value: any) => {
    const isPresent = selectedItems.indexOf(value);
    if (isPresent !== -1) {
      const remaining = selectedItems.filter((item: any) => item !== value);
      setSelectedItems(remaining);
    } else {
      setSelectedItems((prevItems: any) => [...prevItems, value]);
    }
  };

  const theme = useTheme();
  return (
    <>
      <Box sx={{ height: "100vh", justifyContent: "center", display: "flex" }}>
        <Container
          disableGutters={true}
          sx={{
            marginTop: "auto",
            marginBottom: "auto",
            background: theme.palette.background.paper,
          }}
        >
          <Stack flexDirection={"row"}>
            <Box flex={1} display={"flex"} flexDirection={"column"} alignItems={"center"} padding={"40px 0 90px 0"}>
              <Box marginBottom={10} alignSelf={"flex-start"} marginLeft={6}>
                <Image src={"/img/logo.png"} width={113} height={24} alt="logo" unoptimized={true}></Image>
              </Box>
              <Box minWidth={400}>
                <Typography variant="h2" fontSize={24} fontWeight={600}>
                  registrar-se
                </Typography>
                <Typography variant="h1" fontSize={48} fontWeight={600} marginTop={-1}>
                  Bem-Vindo
                </Typography>
                <Typography marginTop={1}>A melhor ordem de serviço em suas mãos</Typography>

                <Stack marginTop={4}>
                  <Typography fontWeight={600}>Email</Typography>
                  <InputCustom
                    {...register("email", { required: true /* validate: (value) => validator.isEmail(value) */ })}
                    placeholder="Digite seu email"
                  ></InputCustom>
                  {errors?.email?.type === "required" && <Typography color="error">Email é obrigatorio.</Typography>}
                  {errors?.email?.type === "validate" && <Typography color="error">Email não é válido.</Typography>}

                  <Typography marginTop={2} fontWeight={600}>
                    Senha
                  </Typography>
                  <InputCustom
                    {...register("password", { minLength: 6, required: true })}
                    placeholder="Digite sua senha"
                    type="password"
                  ></InputCustom>
                  {errors?.password?.type === "required" && <Typography color="error">Senha é obrigatoria.</Typography>}

                  {errors?.password?.type === "minLength" && (
                    <Typography color="error">Senha precisa no minimo 7 caracteres.</Typography>
                  )}

                  <Typography marginTop={2} fontWeight={600}>
                    Repita a Senha
                  </Typography>
                  {/* <InputCustom
                    {...register("passwordConfirmation", {
                      minLength: 6,
                      required: true,
                      validate: (value) => value === passwordWatch,
                    })}
                    placeholder="Digite sua senha"
                    type="password"
                  ></InputCustom>
                  {errors?.passwordConfirmation?.type === "required" && (
                    <Typography color="error">Confirmação de senha é obrigatoria.</Typography>
                  )}
                  {errors?.passwordConfirmation?.type === "validate" && (
                    <Typography color="error">Senha não é igual.</Typography>
                  )} */}
                </Stack>
                <Stack marginTop={1} flexDirection={"row"} justifyContent={"space-between"}></Stack>
                <Button
                  onClick={() => handleSubmit(onSubmit)()}
                  sx={{
                    width: "100%",
                    background: theme.palette.secondary.main,
                    color: theme.palette.background.paper,
                    marginTop: 4,
                  }}
                >
                  Login
                </Button>
                <Stack flexDirection={"row"} marginTop={5} justifyContent={"center"}>
                  <Typography marginRight={1} color={theme.palette.primary.light}>
                    Já tem conta ?
                  </Typography>
                  <Link href={"/login"} style={{ textDecoration: "none", color: theme.palette.primary.main }}>
                    <Typography fontWeight={500}> Logar-se</Typography>
                  </Link>
                </Stack>
              </Box>
            </Box>
            <Box
              flex={1}
              sx={{
                backgroundImage: `url(img/background-login.png)`,
                backgroundSize: "cover",
                backgroundPosition: "60% 50%",
              }}
            ></Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Login;

Login.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};
