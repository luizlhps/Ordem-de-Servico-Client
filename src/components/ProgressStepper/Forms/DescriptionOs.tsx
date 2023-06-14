import React, { SetStateAction, useContext, useEffect, useState } from "react";
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
  Skeleton,
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
  const [descontField, setDescontField] = useState<SetStateAction<Number | undefined>>(0);

  useEffect(() => {
    if (data && data.descont) {
      setValue("exitDate", data.exitDate);
      setValue("descont", data.descont);
      setValue("technicalOpinion", data.technicalOpinion);
    }
  }, [data, prevFormStep]);

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

  const defaultValueService = () => {
    if (data.service) {
      const service = data.service?.map((item: any) => item);
      console.log({ service });
      return { service };
    }
    return { service: [{}] };
  };

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
    defaultValues: defaultValueService(),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "service",
  });

  const watchService = useWatch({
    control,
    name: "service", // Insira o nome do campo de seleção corretamente
  });

  const calculatePrice = (selectedServices: any, serviceData: any) => {
    let servicePrice = 0;
    if (serviceData && selectedServices) {
      selectedServices.forEach((serviceId: any) => {
        const service = serviceData?.service.find((item: any) => item._id === serviceId.service);

        if (service) {
          servicePrice += service.amount;
        }
      });
    }
    return servicePrice;
  };
  const calculateTotalPrice = (servicePrice: any, descont: any) => {
    let totalPrice = servicePrice;

    if (servicePrice && descont) {
      totalPrice = servicePrice - descont;
    }

    if (totalPrice < 0) {
      totalPrice = 0;
    }

    return totalPrice;
  };

  const servicePrice = calculatePrice(watchService, serviceData);
  const totalPrice = calculateTotalPrice(servicePrice, descontField);

  const onSubmit = (data: any) => {
    setData(data);
    console.log(data);
  };

  return (
    <>
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
          {serviceData ? (
            <>
              {fields.map((row, index) => (
                <Box key={row.id} display="flex" justifyContent="flex-start" marginTop={3}>
                  <IconButton size="small" onClick={() => remove(index)}>
                    {index > 0 && <Icon fontSize="small">remove</Icon>}
                  </IconButton>
                  <FormSelect
                    name={`service[${index}].service`}
                    defaultValue={serviceData ? "64734f052aa52cd62979570b" : ""}
                    label="Selecione o serviço"
                    width="100%"
                    control={control}
                  >
                    {serviceData?.service.map((item: IService) => (
                      <MenuItem key={item._id} value={item._id} onClick={() => console.log(item._id)}>
                        {`${item.title}  |  R$ ${item.amount.toFixed(2)}`}
                      </MenuItem>
                    ))}
                  </FormSelect>
                </Box>
              ))}
            </>
          ) : (
            <Skeleton variant="rectangular" width={200} height={36} />
          )}

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
              <InputCustomDefect {...register("technicalOpinion", { required: false })} />
              {errors.technicalOpinion?.type === "required" && (
                <Typography color={"error"}>Digite a descrição</Typography>
              )}
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
              <TextField sx={{ fontWeight: 300 }} value={servicePrice.toFixed(2)} size="small" fullWidth disabled />

              <Typography marginTop={3} marginBottom={1}>
                Valor Total
              </Typography>

              <TextField type="number" disabled value={totalPrice.toFixed(2)} size="small" fullWidth />
            </Grid>
            <Grid item>
              <Box>
                <Typography marginTop={3} marginBottom={1}>
                  Desconto
                </Typography>

                <Controller
                  control={control}
                  name="descont"
                  render={({ field: { onChange, onBlur, value, ref }, formState, fieldState }) => (
                    <TextField
                      type="number"
                      onChange={(e) => {
                        onChange(e.target.value);
                        setDescontField(Number(e.target.value));
                      }}
                      value={value}
                      size="small"
                      fullWidth
                    />
                  )}
                />

                <Typography marginTop={3} marginBottom={1}>
                  Data de Saída*
                </Typography>
                <InputCustom type="date" placeholder="Digite o Nome" {...register("exitDate", { required: true })} />
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
                onClick={() => {
                  handleSubmit(onSubmit)();
                  prevFormStep();
                }}
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
                onClick={() => {
                  handleSubmit(onSubmit)();
                  nextFormStep();
                }}
                size="large"
                sx={{
                  marginTop: 6,
                  background: theme.palette.secondary.main,
                  color: theme.palette.background.paper,
                }}
              >
                next
              </Button>
            </Stack>
          </Box>
        </ContainerCustom>
      </form>
    </>
  );
};
