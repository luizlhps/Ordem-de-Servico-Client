import { ReactElement, useContext, useState } from "react";
import { useForm } from "react-hook-form";

import styled from "@emotion/styled";
import { Box, Container, Stack, Typography, useTheme, Button, TextField } from "@mui/material";

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
  const { signIn, errorLogin } = useContext(SessionContext);

  const onSubmit = async (data: any) => {
    await signIn({
      email: data.email,
      password: data.password,
    }).catch((err) => {
      console.log("aq", err);
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
      <Box sx={{ height: "100%", justifyContent: "center", display: "flex" }}>
        <Stack flexDirection={"row"} width={"100%"} maxWidth={450}>
          <Box
            flex={1}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            padding={2}
          >
            <Box alignSelf={"center"} marginBottom={5}>
              <Image src={"/img/logo.png"} width={113} height={24} alt="logo" unoptimized={true}></Image>
            </Box>
            <Box width={"100%"}>
              <Typography variant="h2" fontSize={24} fontWeight={700}>
                Conectar-se
              </Typography>
              <Typography variant="h1" fontSize={48} fontWeight={700} marginTop={-1}>
                Bem-Vindo
              </Typography>
              <Typography marginTop={1}>A melhor ordem de serviço em suas mãos</Typography>

              <Stack marginTop={1}>
                <Typography marginTop={3} marginBottom={1}>
                  Email
                </Typography>
                <TextField
                  {...register("email", { required: true /* validate: (value) => validator.isEmail(value) */ })}
                  placeholder="Digite seu email"
                ></TextField>
                {errors?.email?.type === "required" && <Typography color="error">Email é obrigatorio.</Typography>}
                {errors?.email?.type === "validate" && <Typography color="error">Email não é válido.</Typography>}

                <Typography marginTop={3} marginBottom={1}>
                  Senha
                </Typography>
                <TextField
                  {...register("password", { minLength: 6, required: true })}
                  placeholder="Digite sua senha"
                  type="password"
                ></TextField>
                {errors?.password?.type === "required" && <Typography color="error">Senha é obrigatoria.</Typography>}

                {errors?.password?.type === "minLength" && (
                  <Typography color="error">Senha precisa no minimo 6 caracteres.</Typography>
                )}
              </Stack>
              <Stack marginTop={1} flexDirection={"row"} justifyContent={"space-between"}></Stack>
              <Button
                onClick={() => handleSubmit(onSubmit)()}
                sx={{
                  fontWeight: 600,
                  height: "52px",
                  fontSize: "14px",
                  width: "100%",
                  background: theme.palette.secondary.main,
                  marginTop: 4,
                }}
              >
                Login
              </Button>
              {errorLogin && (
                <Typography textAlign={"center"} color="error">
                  Senha ou Email inválidos.
                </Typography>
              )}

              {/*               <Stack flexDirection={"row"} marginTop={3} justifyContent={"center"}>
                <Typography marginRight={1} color={theme.palette.primary.light}>
                  Esqueceu sua senha?
                </Typography>
                <Link href={"/login"} style={{ textDecoration: "none", color: theme.palette.primary.main }}>
                  <Typography fontWeight={500}> Recupera-la</Typography>
                </Link>
              </Stack> */}
            </Box>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default Login;

Login.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};
