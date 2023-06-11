import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Divider,
  Stack,
  Typography,
  useTheme,
  Grid,
  Icon,
  IconButton,
  Box,
  Button,
  useMediaQuery,
  MenuItem,
  TextField,
} from "@mui/material";
import styled from "styled-components";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { FormRegisterCostumerContext } from "@/contexts";
import { MarketSVG, OsProcessSVG, UserProcessSVG } from "../../../../public/icon/SVGS/IconsSVG";
import { TStatusData, statusApi } from "@/services/api/statusApi";
import FormSelect from "@/components/FormSelect";
import { useDebouse } from "@/hook";
import { TypeForm } from "./types";
import { IService, RootService, servicesApi } from "@/services/api/servicesApi";

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
  padding-bottom: 40px;

  @media (max-width: 800px) {
    padding: 8px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex-wrap: wrap;
  }
`;

const InputCustomDefect = styled.textarea`
  font-size: 16px;
  color: red;
  width: 100%;

  height: 114px;
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
  data: any;
  setData: any;
  typeForm: TypeForm;
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

export const DescriptionOS: React.FC<NameFormProps> = ({
  formStep,
  nextFormStep,
  prevFormStep,
  data,
  setData,
  typeForm,
}) => {
  const theme = useTheme();
  const columnMedia = useMediaQuery("(max-width:1212px)");
  const [serviceData, setServiceData] = useState<RootService | undefined>(undefined);

  console.log(serviceData);

  useEffect(() => {
    async function FetchGetStatus() {
      try {
        const serviceData = await servicesApi.getAllServices("", 0, 0);

        if (serviceData instanceof Error) {
          return console.error(serviceData.message);
        } else {
          setServiceData(serviceData);
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
    getValues,
    setValue,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      service: [{}],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "service",
  });

  const watchService = useWatch({
    control,
    name: "service", // Insira o nome do campo de seleção corretamente
  });

  const calculateTotalPrice = (selectedServices: any, serviceData: any) => {
    let totalPrice = 0;
    selectedServices.forEach((serviceId: any) => {
      console.log(serviceData.service);
      const service = serviceData?.service.find((item: any) => item._id === serviceId);

      console.log("aqui", service);
      if (service) {
        totalPrice += service.amount;
      }
    });
    return totalPrice;
  };

  const totalPrice = calculateTotalPrice(watchService, serviceData);

  useEffect(() => {
    console.log("Preço total:", totalPrice);
  }, [watchService, totalPrice]);

  const onSubmit = (data: any) => {
    setData(data);
    nextFormStep();
  };

  return (
    <>
      <form>
        <Typography variant="h3">Preço Total: R$ {totalPrice.toFixed(2)}</Typography>
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
          {fields.map((row, index) => (
            <Box key={row.id} display="flex" justifyContent="flex-start" marginTop={3}>
              <IconButton size="small" onClick={() => remove(index)}>
                {index > 0 && <Icon fontSize="small">remove</Icon>}
              </IconButton>
              <FormSelect
                name={`service[${index}]`}
                defaultValue={row.id ? row.id : ""} // Atualize aqui para o valor inicial correto
                label="Selecione o serviço"
                width="100%"
                control={control}
              >
                {serviceData?.service.map((item: IService) => (
                  <MenuItem key={item._id} value={item._id} onClick={() => console.log(item._id)}>
                    {item.title}
                  </MenuItem>
                ))}
              </FormSelect>
            </Box>
          ))}

          <Box marginTop={2}>
            <IconButton size="small" onClick={() => append({})}>
              <Icon fontSize="small">add</Icon>
            </IconButton>
          </Box>

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
                Laudo Técnico
              </Typography>
              <InputCustomDefect {...register("observation", { required: true })} />
              {errors.observation?.type === "required" && <Typography color={"error"}>Digite a descrição</Typography>}
            </Grid>
          </Grid>
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
                Valor
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
                Valor Total
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
                  Desconto
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
                  Data de Saída*
                </Typography>
                <InputCustom type="date" placeholder="Digite o Nome" {...register("dateEntry", { required: true })} />
                {errors.dateEntry?.type === "required" && (
                  <Typography color={"error"}>Coloque a data de entrada</Typography>
                )}
              </Box>
            </Grid>
          </Grid>
          <Stack flexDirection={"row"} justifyContent={"center"} marginTop={5}>
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
        </ContainerCustom>
      </form>
    </>
  );
};
