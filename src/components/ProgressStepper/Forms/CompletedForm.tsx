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
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

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

const CompletedForm: React.FC = () => {
  const theme = useTheme();

  return (
    <>
      <ContainerCustom>
        <Typography variant="h1" fontWeight={500}>
          Formulario Completo
        </Typography>
        <Divider
          sx={{
            width: 39,
            height: 5,
            background: theme.palette.secondary.main,
            marginLeft: 1,
          }}
        />
      </ContainerCustom>
    </>
  );
};
export default CompletedForm;
