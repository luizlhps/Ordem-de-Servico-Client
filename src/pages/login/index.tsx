import { ReactElement, useState } from "react";

import styled from "@emotion/styled";
import { Box, Container, Stack, Typography, useTheme, InputLabel, Button } from "@mui/material";

import Image from "next/image";
import Link from "next/link";

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

const CheckBoxCustom = styled.input`
  appearance: none;
  background: white;
  margin-right: 0.5rem;
  border: 1px solid;

  width: 1rem;
  height: 1rem;
  display: inline-block;

  position: relative;

  :checked {
    ::before {
      content: "✓";
      color: white;
      position: absolute;
      top: -12%;
      left: 10%;
    }
  }
`;

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Login = () => {
  const [selectedItems, setSelectedItems] = useState<any>([]);

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
                  conectar-se
                </Typography>
                <Typography variant="h1" fontSize={48} fontWeight={600} marginTop={-1}>
                  Bem-Vindo
                </Typography>
                <Typography marginTop={1}>A melhor ordem de serviço em suas mãos</Typography>

                <Stack marginTop={4}>
                  <Typography fontWeight={600}>Email</Typography>
                  <InputCustom placeholder="Digite seu email"></InputCustom>

                  <Typography marginTop={2} fontWeight={600}>
                    Senha
                  </Typography>
                  <InputCustom placeholder="Digite sua senha" type="password"></InputCustom>
                </Stack>
                <Stack marginTop={1} flexDirection={"row"} justifyContent={"space-between"}>
                  <InputLabel
                    sx={{
                      display: "flex",
                      alignItems: "center",

                      input: {
                        background: theme.palette.background.paper,
                        border: "1px solid",
                        borderColor: theme.palette.primary.light,
                        "&:checked": {
                          background: theme.palette.secondary.main,
                          borderColor: theme.palette.secondary.main,
                        },
                      },
                    }}
                  >
                    <CheckBoxCustom type="checkbox" />
                    Lembre-me
                  </InputLabel>
                  <Link href={"/"} style={{ textDecoration: "none" }}>
                    <Typography color={theme.palette.secondary.main}>Esqueceu sua Senha ?</Typography>
                  </Link>
                </Stack>
                <Button
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
                    Não tem conta ?
                  </Typography>
                  <Link href={"/register"} style={{ textDecoration: "none", color: theme.palette.primary.main }}>
                    <Typography fontWeight={500}> Registrar-se</Typography>
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
