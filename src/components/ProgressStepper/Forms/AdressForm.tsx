import React from "react";
import { Container, Divider, Stack, Typography, useTheme, Grid, Button } from "@mui/material";
import styled from "styled-components";

//style custom
const InputCustom = styled.input`
  height: 35px;
  font-size: 16px;
  color: #1e2737;
  width: 300px;
  border-radius: 0.3rem;
  padding: 4px;
  border-style: none;
  border: 1px #878787 solid;
  margin-top: 4px;
`;
const ContainerCustom = styled.div`
  padding: 60px;

  @media (max-width: 600px) {
    padding: 0px;
  }
`;

//Interface
interface NameFormProps {
  formStep: number;
  nextFormStep: () => void;
}

const AdressForm: React.FC<NameFormProps> = ({ formStep, nextFormStep }) => {
  const theme = useTheme();

  return (
    <>
      {formStep <= 1 && (
        <form>
          <ContainerCustom>
            <Typography variant="h1" fontWeight={500}>
              Andress
            </Typography>
            <Divider
              sx={{
                width: 39,
                height: 5,
                background: theme.palette.secondary.main,
                marginLeft: 1,
              }}
            />
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent={"space-between"}
              marginTop={4}
            >
              <div>
                <Typography fontWeight={500} marginTop={2}>
                  CEP
                </Typography>
                <InputCustom placeholder="Digite o Nome" />
                <Typography marginTop={2}>Cidade</Typography>
                <InputCustom id="outlined-multiline-flexible" placeholder="Digite o Nome" />
                <Typography marginTop={2}>Bairro</Typography>
                <InputCustom id="outlined-multiline-flexible" placeholder="Digite o Nome" />
                <Typography marginTop={2}>Complemento</Typography>
                <InputCustom id="outlined-multiline-flexible" placeholder="Digite o Nome" />
              </div>
              <div>
                <Typography marginTop={2}>Estado</Typography>
                <InputCustom placeholder="Digite o Nome" />
                <Typography marginTop={2}>Rua</Typography>
                <InputCustom placeholder="Digite o Nome" />
                <Typography marginTop={2}>Numero</Typography>
                <InputCustom placeholder="Digite o Nome" />
              </div>
            </Stack>
          </ContainerCustom>
          <Button onClick={nextFormStep} size="large">
            Next
          </Button>
        </form>
      )}
    </>
  );
};
export default AdressForm;
