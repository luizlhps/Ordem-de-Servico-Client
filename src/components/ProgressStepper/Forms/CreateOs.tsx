import React, { useContext, useEffect, useState } from "react";
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
  MenuItem,
  TextField,
} from "@mui/material";
import styled from "styled-components";
import { Controller, useForm } from "react-hook-form";
import { FormContext } from "@/contexts";
import { MarketSVG, OsProcessSVG, UserProcessSVG } from "../../../../public/icon/SVGS/IconsSVG";
import { TStatusData, statusApi } from "@/services/api/statusApi";
import FormSelect from "@/components/FormSelect";

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
  ::-webkit-calendar-picker-indicator {
    background-color: #fff;
    border-radius: 1rem;
    padding: 5px;
  }

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

const InputCustomDefect = styled.textarea`
  font-size: 16px;
  color: #1e2737;
  width: 100%;

  height: 200px;
  border-radius: 0.3rem;
  padding: 14px;
  border-style: none;
  border: 0.1px #878787 solid;
  margin-top: 14px;
  resize: none;
  font-family: arial;
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
  status: string;
  defect: string;
  observation: string;
};

const CreateOs: React.FC<NameFormProps> = ({ formStep, nextFormStep, prevFormStep }) => {
  const theme = useTheme();
  const columnMedia = useMediaQuery("(max-width:1212px)");
  const [statusData, setStatusData] = useState<TStatusData | undefined>(undefined);

  const { setFormValues } = useContext(FormContext);
  useEffect(() => {
    async function FetchGetStatus() {
      try {
        const data = await statusApi.getAllStatus("", 0, 0);

        if (data instanceof Error) {
          return console.error(data.message);
        } else {
          setStatusData(data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    FetchGetStatus();
  }, []);

  //form
  const {
    register,
    handleSubmit,
    watch,
    control,
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
            <Box display={"flex"} justifyContent={"flex-start"}>
              <FormSelect name={"status"} defaultValue={""} label={"status"} control={control}>
                {statusData?.status.map((item) => (
                  <MenuItem key={item._id} value={[item._id, item.name]}>
                    {item.name}
                  </MenuItem>
                ))}
              </FormSelect>
            </Box>
            <Grid
              color={theme.palette.primary.main}
              sx={{
                input: {
                  background: theme.palette.background.paper,
                  color: theme.palette.primary.main,
                },
              }}
              container
              spacing={3}
              marginTop={1}
              flexDirection={columnMedia ? "column" : "row"}
            >
              <Grid item xs>
                <Typography marginTop={3} marginBottom={1}>
                  Equipamento*
                </Typography>
                <Controller
                  defaultValue=""
                  name={"equipment"}
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <TextField sx={{ fontWeight: 300 }} onChange={onChange} value={value} size="small" fullWidth />
                  )}
                />
                {errors.equipment?.type === "required" && (
                  <Typography color={"error"}>Digite o sobre o equipamento</Typography>
                )}
                <Typography marginTop={3} marginBottom={1}>
                  Modelo*
                </Typography>
                <Controller
                  defaultValue=""
                  name={"model"}
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <TextField onChange={onChange} value={value} size="small" fullWidth />
                  )}
                />
                {errors.model?.type === "required" && <Typography color={"error"}>Digite o modelo</Typography>}
              </Grid>
              <Grid item>
                <Box>
                  <Typography marginTop={3} marginBottom={1}>
                    Marca*
                  </Typography>
                  <Controller
                    name={"brand"}
                    control={control}
                    rules={{ required: true }}
                    defaultValue={""}
                    render={({ field: { onChange, value } }) => (
                      <TextField onChange={onChange} value={value} size="small" fullWidth />
                    )}
                  />
                  {errors.brand?.type === "required" && <Typography color={"error"}>Digite a marca</Typography>}

                  <Typography marginTop={3} marginBottom={1}>
                    Data de Entrada*
                  </Typography>
                  <InputCustom type="date" placeholder="Digite o Nome" {...register("dateEntry", { required: true })} />
                  {errors.dateEntry?.type === "required" && (
                    <Typography color={"error"}>Coloque a data de entrada</Typography>
                  )}
                </Box>
              </Grid>
            </Grid>

            <Grid
              sx={{
                input: {
                  background: theme.palette.background.paper,
                  color: theme.palette.primary.main,
                },
                textarea: {
                  background: theme.palette.background.paper,
                  color: theme.palette.primary.main,
                },
              }}
              container
              spacing={3}
              marginTop={2}
              flexDirection={"column"}
            >
              <Grid item xs>
                <Typography marginTop={3} marginBottom={1}>
                  Defeito
                </Typography>
                <InputCustomDefect {...register("defect", { required: true })} />
                {errors.defect?.type === "required" && <Typography color={"error"}>Digite a descrição</Typography>}
              </Grid>
              <Grid item>
                <Typography marginTop={3} marginBottom={1}>
                  Observação
                </Typography>
                <InputCustomDefect {...register("observation")} />

                {errors.status?.type === "required" && <Typography color={"error"}>Coloque o status</Typography>}
              </Grid>
            </Grid>
          </ContainerCustom>
          <Stack flexDirection={"row"} justifyContent={"center"} marginTop={5}>
            <UserProcessSVG color={theme.palette.secondary.main} />
            <Box
              sx={{
                width: 22,
                margin: "auto 10px",
                height: 3,
                alignContent: "center",
                background: theme.palette.secondary.main,
              }}
            />
            <MarketSVG color={theme.palette.secondary.main} />
            <Box
              sx={{
                width: 22,
                margin: "auto 10px",
                height: 3,
                alignContent: "center",
                background: theme.palette.secondary.main,
              }}
            />
            <OsProcessSVG color={theme.palette.secondary.main} />
          </Stack>
          <Box justifyContent={"center"} display={"flex"}>
            <Stack flexDirection={"row"} justifyContent={"center"} gap={3}>
              <Button
                onClick={prevFormStep}
                size="large"
                sx={{
                  marginTop: 6,
                  background: theme.palette.secondary.main,
                  color: theme.palette.background.paper,
                }}
              >
                Prev
              </Button>
              <Button
                size="large"
                sx={{
                  marginTop: 6,
                  background: theme.palette.secondary.main,
                  color: theme.palette.background.paper,
                }}
                onClick={() => handleSubmit(onSubmit)()}
              >
                Criar
              </Button>
            </Stack>
          </Box>
        </form>
      )}
    </>
  );
};
export default CreateOs;
