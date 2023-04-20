import React, { useContext } from "react";
import {
  Container,
  Divider,
  Stack,
  Typography,
  useTheme,
  Grid,
  Box,
  Button,
  useMediaQuery,
} from "@mui/material";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { FormContext } from "@/contexts";

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
  font-family: arial;

  @media (max-width: 1212px) {
    width: 100%;
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
  font-family: arial;
  font-size: 14px;

  @media (max-width: 1212px) {
    width: 100%;
  }
`;

//Interface
interface NameFormProps {
  formStep: number;
  nextFormStep: () => void;
  prevFormStep: () => void;
}

type Inputs = {
  equipment: string;
  model: string;
  brand: string;
  dateEntry: string;
  stats: string;
  description: string;
  observation: string;
};

const CreateOs: React.FC<NameFormProps> = ({ formStep, nextFormStep, prevFormStep }) => {
  const theme = useTheme();
  const columnMedia = useMediaQuery("(max-width:1212px)");

  const { setFormValues } = useContext(FormContext);

  //form
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = (data: Inputs) => {
    setFormValues(data);
    nextFormStep();
  };

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
            <Grid
              container
              spacing={3}
              marginTop={1}
              flexDirection={columnMedia ? "column" : "row"}
            >
              <Grid item xs>
                <Typography marginTop={2}>Equipamento*</Typography>
                <InputCustom
                  id="outlined-multiline-flexible"
                  placeholder="Digite sobre o equipamento"
                  {...register("equipment", { required: true })}
                />
                {errors.equipment?.type === "required" && (
                  <Typography color={"error"}>Digite o sobre o equipamento</Typography>
                )}
                <Typography marginTop={2}>Modelo*</Typography>
                <InputCustom
                  id="outlined-multiline-flexible"
                  placeholder="Digite o Nome"
                  {...register("model", { required: true })}
                />
                {errors.model?.type === "required" && (
                  <Typography color={"error"}>Digite o modelo</Typography>
                )}
                <Typography marginTop={2}>Status*</Typography>
                <InputCustom
                  id="outlined-multiline-flexible"
                  placeholder="Digite o Nome"
                  {...register("stats", { required: true })}
                />
                {errors.stats?.type === "required" && (
                  <Typography color={"error"}>Coloque o status</Typography>
                )}
              </Grid>
              <Grid item>
                <Box>
                  <Typography marginTop={2}>Marca*</Typography>
                  <InputCustom
                    placeholder="Digite o Nome"
                    {...register("brand", { required: true })}
                  />
                  {errors.brand?.type === "required" && (
                    <Typography color={"error"}>Digite a marca</Typography>
                  )}
                  <Typography marginTop={2}>Data de Entrada*</Typography>
                  <InputCustom
                    type="date"
                    placeholder="Digite o Nome"
                    {...register("dateEntry", { required: true })}
                  />
                  {errors.dateEntry?.type === "required" && (
                    <Typography color={"error"}>Coloque a data de entrada</Typography>
                  )}
                </Box>
              </Grid>
            </Grid>

            <Grid
              container
              spacing={3}
              marginTop={2}
              flexDirection={columnMedia ? "column" : "row"}
            >
              <Grid item xs>
                <Typography marginTop={2}>Descrição</Typography>
                <InputCustomDescription {...register("description", { required: true })} />
                {errors.description?.type === "required" && (
                  <Typography color={"error"}>Digite a descrição</Typography>
                )}
              </Grid>
              <Grid item>
                <Typography marginTop={2}>Observação</Typography>
                <InputCustomDescription {...register("observation")} />
              </Grid>
            </Grid>
          </ContainerCustom>
          <Stack flexDirection={"row"} justifyContent={"center"}>
            <Button onClick={prevFormStep} size="large">
              Prev
            </Button>
            <Button size="large" onClick={() => handleSubmit(onSubmit)()}>
              Criar
            </Button>
          </Stack>
        </form>
      )}
    </>
  );
};
export default CreateOs;
