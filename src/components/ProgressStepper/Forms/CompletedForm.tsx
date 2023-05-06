import React, { useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  Container,
  Divider,
  Stack,
  Typography,
  useTheme,
  Grid,
  Box,
  Button,
  ButtonBase,
} from "@mui/material";
import styled from "styled-components";

import party from "../../../../public/icon/party.svg";
import { HeaderLayout } from "@/components/HeaderLayout/HeaderLayout";
import { FormContext } from "@/contexts";
import { PartySVG } from "../../../../public/icon/SVGS/IconsSVG";
//style custom
const InputCustom = styled.input`
  height: 35px;
  font-size: 16px;
  color: #354c74;
  width: 100%;
  border-radius: 1rem;
  padding: 4px;
  border-style: none;
  border: 1px solid;
  margin-top: 4px;

  text-align: center;

  @media (max-width: 600px) {
    width: 100%;
  }
`;
const ContainerCustom = styled.div`
  padding: 60px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (max-width: 600px) {
    padding: 6px;
    padding-top: 60px;
    padding-bottom: 60px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex-wrap: wrap;
  }
`;

const CompletedForm: React.FC = () => {
  const theme = useTheme();
  const { data } = useContext(FormContext);

  const router = useRouter();
  const Redirect = () => {
    router.push("/clients");
  };

  return (
    <>
      <HeaderLayout subTitle="Digite os dados do novo cliente" title="Novo Cliente" />
      <Container
        maxWidth={"sm"}
        sx={{
          justifyContent: "center",
          backgroundColor: theme.palette.background.paper,
          borderRadius: "1rem",
          marginTop: "60px",
          color: theme.palette.primary.main,
          border: `1px solid ${theme.palette.primary.light}`,
        }}
      >
        <ContainerCustom>
          <PartySVG color={theme.palette.secondary.main} />
          <Divider
            sx={{
              width: 39,
              height: 5,
              background: theme.palette.secondary.main,
              marginTop: 2,
            }}
          />
          <Typography variant="h1" fontWeight={600} marginTop={2}>
            Formulário Completo
          </Typography>
          <Typography variant="h3" fontWeight={500} marginTop={2}>
            O Registro Do Cliente Foi um Sucesso !!
          </Typography>
          <Grid container justifyContent={"center"} marginTop={3} gap={2}>
            <Grid textAlign={"center"} width={"100%"}>
              <Typography fontWeight={500}>Nome</Typography>
              <InputCustom
                readOnly
                defaultValue={data.name !== undefined ? data.name : ""}
                style={{ color: theme.palette.primary.light, width: "100%" }}
              />
            </Grid>
            <Grid textAlign={"center"} width={"100%"}>
              <Typography fontWeight={500}>Celular</Typography>
              <InputCustom
                readOnly
                defaultValue={data.phone !== undefined ? data.phone : ""}
                style={{ color: theme.palette.primary.light, width: "100%" }}
              />
            </Grid>
            <Grid width={"100%"}>
              <Typography fontWeight={500} marginLeft={2}>
                Equipamento
              </Typography>
              <InputCustom
                readOnly
                defaultValue={
                  data.equipment !== undefined
                    ? `${data.brand}  ${data.model}  ${data.equipment}`
                    : ""
                }
                style={{ color: theme.palette.primary.light, width: "100%" }}
              />
            </Grid>
            <Grid width={"100%"}>
              <Typography fontWeight={500} marginLeft={2}>
                Descrição
              </Typography>
              <InputCustom
                readOnly
                defaultValue={data.description !== undefined ? data.description : ""}
                style={{
                  color: theme.palette.primary.light,
                  width: "100%",
                  borderColor: theme.palette.primary.light,
                }}
              />
            </Grid>
            <Grid textAlign={"center"}>
              <Typography fontWeight={500}>Status</Typography>
              <InputCustom
                readOnly
                defaultValue={data.stats !== undefined ? data.stats : ""}
                style={{ color: theme.palette.primary.light, width: "100%" }}
              />
            </Grid>
            <Grid textAlign={"center"}>
              <Typography fontWeight={500}>Data</Typography>
              <InputCustom
                readOnly
                defaultValue={data.dateEntry !== undefined ? data.dateEntry : ""}
                style={{ color: theme.palette.primary.light, width: "100%" }}
              />
            </Grid>
          </Grid>
          <Button
            size="large"
            onClick={Redirect}
            sx={{
              marginTop: 7,
              width: "100%",
              background: theme.palette.secondary.main,
              ":hover": { backgroundColor: theme.palette.secondary.main },
              borderRadius: "1rem",
            }}
          >
            Ir Para Ordens de Serviço
          </Button>
        </ContainerCustom>
      </Container>
    </>
  );
};
export default CompletedForm;
