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
  const [servicesData, setServicesData] = useState<RootService | undefined>(undefined);
  const [discount, setDiscount] = useState<SetStateAction<Number | undefined>>(0);

  useEffect(() => {
    if (data && data.technicalOpinion) {
      setValue("exitDate", data.exitDate);
      setValue("discount", data.discount);
      setValue("technicalOpinion", data.technicalOpinion);
    }
  }, [data, prevFormStep]);

  useEffect(() => {
    async function FetchGetStatus() {
      try {
        const servicesData = await servicesApi.getAllServices("", 0, 0);

        if (servicesData instanceof Error) {
          return console.error(servicesData.message);
        } else {
          setServicesData(servicesData);
        }
      } catch (error) {
        console.error(error);
      }
    }
    FetchGetStatus();
  }, []);

  const defaultValueServices = () => {
    if (data.services) {
      const services = data.services?.map((item: any) => item);
      return services;
    }
  };

  console.log(defaultValueServices());

  useEffect(() => {
    defaultValueServices();
    setDiscount(data.discount);
  }, []);

  //form
  const {
    register,
    handleSubmit,
    watch,
    control,
    setError,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<any>({
    defaultValues: { services: defaultValueServices() },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "services",
  });

  const watchServices = useWatch({
    control,
    name: "services", // Insira o nome do campo de seleção corretamente
  });

  const handleAddService = () => {
    const emptyFieldIndex = fields.findIndex((field: any) => !field);
    if (emptyFieldIndex) {
      setError(`services[${0}]`, {
        type: "required",
        message: "Não é possível prosseguir se o campo de serviços estiver vazio.",
      });
      return;
    }

    // Resto da lógica de adicionar serviço
  };

  const calculatePrice = (selectedServices: any, servicesData: any) => {
    let servicesPrice = 0;

    if (servicesData && selectedServices) {
      selectedServices.forEach((servicesId: any) => {
        console.log("aa", servicesId);
        const services = servicesData?.service?.find((item: any) => item._id === servicesId);

        console.log(services);

        if (services) {
          servicesPrice += services.amount;
        }
      });
    }
    return servicesPrice;
  };

  const calculateTotalPrice = (servicesPrice: any, discount: any) => {
    console.log("discount", discount);
    let totalPrice = servicesPrice;

    if (discount) {
      totalPrice = servicesPrice - discount;
    }

    if (totalPrice < 0) {
      totalPrice = 0;
    }

    return totalPrice;
  };

  const servicesPrice = calculatePrice(watchServices, servicesData);

  const totalPrice = calculateTotalPrice(servicesPrice, discount);

  const onSubmit = (data: any) => {
    console.log(data);
    setData(data);
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
          {servicesData ? (
            <>
              {fields.map((row, index) => (
                <Box key={row.id} display="flex" justifyContent="flex-start" marginTop={3}>
                  <IconButton size="small" onClick={() => remove(index)}>
                    {index > 0 && <Icon fontSize="small">remove</Icon>}
                  </IconButton>
                  <FormSelect
                    rules={{
                      required: true,
                      validade: () => {
                        return true;
                      },
                    }}
                    name={`services[${index}]`}
                    defaultValue={""}
                    label="Selecione o serviço"
                    width="100%"
                    control={control}
                  >
                    {servicesData?.service.map((item: IService) => (
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
            <IconButton size="small" onClick={() => append("")}>
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
              <TextField sx={{ fontWeight: 300 }} value={servicesPrice.toFixed(2)} size="small" fullWidth disabled />

              <Typography marginTop={3} marginBottom={1}>
                Valor Total
              </Typography>

              <TextField type="number" disabled value={totalPrice.toFixed(2)} size="small" fullWidth />
            </Grid>
            <Grid item>
              <Box>
                <Typography marginTop={3} marginBottom={1}>
                  discounto
                </Typography>

                <Controller
                  control={control}
                  name="discount"
                  render={({ field: { onChange, onBlur, value, ref }, formState, fieldState }) => (
                    <TextField
                      type="number"
                      onChange={(e) => {
                        onChange(e.target.value);
                        setDiscount(Number(e.target.value));
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
