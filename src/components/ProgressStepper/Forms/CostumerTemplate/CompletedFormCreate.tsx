import React from "react";
import { Divider, Typography, useTheme, Grid, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components";
import { format } from "date-fns";
import { ICustomerAndOrderData } from "../../../../../types/formOrderCustomer";
import { ICustomer } from "../../../../../types/customer";
import { TypeForm } from "../types";
import { PartySVG } from "../../../../../public/icon/SVGS/IconsSVG";

//style custom
const InputCustom = styled.input`
  height: 35px;
  font-size: 16px;
  color: #354c74;
  width: 100%;
  border-radius: 1rem;
  padding: 4px;
  border-style: none;
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

interface Iprops {
  confirmData: () => void;
  data: any;
  loading: boolean;
  handleClose: () => void;
  customer: ICustomer | ICustomerAndOrderData | undefined;
}

export const CompletedFormCreate: React.FC<Iprops> = ({ confirmData, data, loading, handleClose, customer }) => {
  const theme = useTheme();

  const Redirect = () => {
    confirmData();
  };

  return (
    <>
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
        <>
          <Typography variant="h1" fontWeight={600} marginTop={2}>
            Formulário Completo
          </Typography>
          <Typography variant="h3" fontWeight={500} marginTop={2}>
            Confirme para prosseguir
          </Typography>
          <Grid container justifyContent={"center"} marginTop={3} gap={2}>
            <Grid textAlign={"center"} width={"100%"}>
              <Typography fontWeight={500}>Nome</Typography>
              <InputCustom
                readOnly
                defaultValue={customer?.name ? customer?.name : ""}
                style={{ color: theme.palette.primary.light, width: "100%" }}
              />
            </Grid>
            <Grid textAlign={"center"} width={"100%"}>
              <Typography fontWeight={500}>Celular</Typography>
              <InputCustom
                readOnly
                defaultValue={customer?.phone ? customer?.phone : ""}
                style={{ color: theme.palette.primary.light, width: "100%" }}
              />
            </Grid>
            <Grid width={"100%"}>
              <Typography fontWeight={500} marginLeft={2}>
                Equipamento
              </Typography>
              <InputCustom
                readOnly
                defaultValue={data?.equipment ? `${data?.brand}  ${data?.model}  ${data?.equipment}` : ""}
                style={{ color: theme.palette.primary.light, width: "100%" }}
              />
            </Grid>
            <Grid width={"100%"}>
              <Typography fontWeight={500} marginLeft={2}>
                Descrição
              </Typography>
              <InputCustom
                readOnly
                defaultValue={data?.defect ? data?.defect : ""}
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
                defaultValue={data?.status ? data?.status : ""}
                style={{ color: theme.palette.primary.light, width: "100%" }}
              />
            </Grid>
            <Grid textAlign={"center"}>
              <Typography fontWeight={500}>Data</Typography>
              <InputCustom
                readOnly
                defaultValue={data?.dateEntry ? format(new Date(data?.dateEntry), "MM/dd/yyyy") : ""}
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
              color: theme.palette.background.paper,
            }}
          >
            {loading ? (
              <>
                <CircularProgress size={25} />
              </>
            ) : (
              <>Confirmar</>
            )}
          </Button>
        </>
      </ContainerCustom>
    </>
  );
};
