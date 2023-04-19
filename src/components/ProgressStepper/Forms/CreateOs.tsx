import React from "react";
import {
  Container,
  Divider,
  Stack,
  Typography,
  useTheme,
  Grid,
  Box,
  Button,
} from "@mui/material";
import styled from "styled-components";

//style custom
const InputCustom = styled.input`
  height: 35px;
  font-size: 16px;
  color: #1e2737;
  width: 350px;
  border-radius: 0.3rem;
  padding: 4px;
  border-style: none;
  border: 1px #878787 solid;
  margin-top: 4px;

  @media (max-width: 600px) {
    width: 250px;
  }
`;
const ContainerCustom = styled.div`
  padding: 60px;

  @media (max-width: 600px) {
    padding: 8px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex-wrap: wrap;
  }
`;

const InputCustomDescription = styled.textarea`
  font-size: 16px;
  color: #1e2737;
  width: 350px;
  height: 140px;
  border-radius: 0.3rem;
  padding: 4px;
  border-style: none;
  border: 1px #878787 solid;
  margin-top: 14px;
  font-size: 16px;
  resize: none;

  @media (max-width: 600px) {
    width: 250px;
  }
`;

//Interface
interface NameFormProps {
  formStep: number;
  nextFormStep: () => void;
}

const CreateOs: React.FC<NameFormProps> = ({ formStep, nextFormStep }) => {
  const theme = useTheme();

  return (
    <>
      {formStep <= 2 && (
        <form>
          <ContainerCustom>
            <Typography variant="h1" fontWeight={500}>
              Criar O.S
            </Typography>
            <Divider
              sx={{
                width: 39,
                height: 5,
                background: theme.palette.secondary.main,
                marginLeft: 1,
              }}
            />
            <Grid container spacing={3} marginTop={1}>
              <Grid item xs>
                <Typography marginTop={2}>Equipamento</Typography>
                <InputCustom id="outlined-multiline-flexible" placeholder="Digite o Nome" />
                <Typography marginTop={2}>Modelo</Typography>
                <InputCustom id="outlined-multiline-flexible" placeholder="Digite o Nome" />
                <Typography marginTop={2}>Status</Typography>
                <InputCustom id="outlined-multiline-flexible" placeholder="Digite o Nome" />
              </Grid>
              <Grid item>
                <Box>
                  <Typography marginTop={2}>Marca</Typography>
                  <InputCustom placeholder="Digite o Nome" />
                  <Typography marginTop={2}>Data de Entrada</Typography>
                  <InputCustom placeholder="Digite o Nome" />
                </Box>
              </Grid>
            </Grid>

            <Grid container spacing={3} marginTop={2}>
              <Grid item xs>
                <Typography marginTop={2}>Descrição</Typography>
                <InputCustomDescription />
              </Grid>
              <Grid item>
                <Typography marginTop={2}>Observação</Typography>
                <InputCustomDescription />
              </Grid>
            </Grid>
          </ContainerCustom>
          <Button onClick={nextFormStep} size="large">
            Criar
          </Button>
        </form>
      )}
    </>
  );
};
export default CreateOs;
