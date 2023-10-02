import React, { SetStateAction, useEffect, useMemo, useState } from "react";
import {
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
import { OsProcessSVG } from "../../../../public/icon/SVGS/IconsSVG";
import FormSelect from "@/components/FormSelect";

import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";

import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("pt-br");

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TypeForm } from "./types";
import { IService, RootService, servicesApi } from "@/services/api/servicesApi";
import CreateServiceModal from "@/components/Modal/servicesPage/Service/CreateServiceModal";
import useModal from "@/hook/useModal";
import { DialogModalScroll } from "@/components/Modal/DialogModalScroll";

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
  dateExit: string;
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
  const [newStatus, setNewStatus] = useState<SetStateAction<string | undefined>>();

  useEffect(() => {
    if (data && data.technicalOpinion) {
      setValue("technicalOpinion", data.technicalOpinion);
    }
  }, [data, prevFormStep]);

  async function FetchGetServices() {
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

  useEffect(() => {
    FetchGetServices();
    setDiscount(data.discount);
  }, []);

  const { modalActions, modals, modalSets } = useModal();
  const { modalOpen } = modals;
  const { modalHandleOpen, modalHandleClose } = modalActions;

  //form
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<any>({});

  const { fields, append, remove } = useFieldArray({
    control,
    name: "services",
  });

  const watchServices = useWatch({
    control,
    name: "services",
  });

  const calculatePrice = useMemo(() => {
    return (selectedServices: any, servicesData: any) => {
      let servicesPrice = 0;

      if (servicesData && selectedServices) {
        selectedServices.forEach((servicesId: any) => {
          const services = servicesData?.service?.find((item: any) => item._id === servicesId);

          if (services) {
            servicesPrice += services.amount;
          }
        });
      }

      return servicesPrice;
    };
  }, [servicesData]);

  const functionArray = () => {
    let arrayOfServices: string[] = [];
    data.services.map((item: any) => {
      arrayOfServices.push(item._id);
    });

    return arrayOfServices;
  };

  useEffect(() => {
    setValue("services", functionArray());
  }, []);

  const calculateTotalPrice = useMemo(() => {
    return (servicesPrice: any, discount: any) => {
      let totalPrice = servicesPrice;

      if (discount) {
        totalPrice = servicesPrice - discount;
      }

      if (totalPrice < 0) {
        totalPrice = 0;
      }

      return totalPrice;
    };
  }, [discount]);

  const servicesPrice = calculatePrice(watchServices, servicesData);
  const totalPrice = calculateTotalPrice(servicesPrice, discount);

  const onSubmit = (data: Inputs) => {
    console.log("sub", data);
    setData(data);
  };

  const handlePrev = () => {
    handleSubmit(onSubmit)();
    prevFormStep();
  };

  const handleNext = () => {
    handleSubmit(onSubmit)();
    nextFormStep();
  };

  return (
    <>
      <CreateServiceModal
        fetchApi={FetchGetServices}
        open={modalOpen}
        handleClose={modalHandleClose}
        handleOpen={modalHandleOpen}
        setFormSucessoValue={false}
        setMessageForm={setNewStatus}
      >
        <DialogModalScroll.Title>Criar O.S</DialogModalScroll.Title>

        <DialogModalScroll.Content dividers>
          <Box display={"flex"} justifyContent={"flex-end"}>
            <Button
              onClick={modalActions.modalHandleOpen}
              size="small"
              sx={{ background: theme.palette.secondary.main, color: theme.palette.background.default }}
            >
              Novo
            </Button>
          </Box>
          {servicesData?.service ? (
            <>
              {fields.map((row, index) => (
                <Box key={row.id} display="flex" justifyContent="flex-start" marginTop={3}>
                  <IconButton size="small" onClick={() => remove(index)}>
                    <Icon fontSize="small">remove</Icon>
                  </IconButton>
                  <FormSelect
                    rules={{
                      required: true,
                      validade: () => {
                        return true;
                      },
                    }}
                    name={`services[${index}]`}
                    label="Selecione o serviço"
                    width="100%"
                    control={control}
                    defaultValue={""}
                  >
                    {servicesData?.service.map((item: IService) => (
                      <MenuItem key={item._id} value={item._id}>
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
              <TextField rows={4} multiline fullWidth {...register("technicalOpinion", { required: false })} />
              {errors.technicalOpinion?.type === "required" && (
                <Typography color={"error"}>Digite a descrição</Typography>
              )}
            </Grid>
          </Grid>
          <Grid
            marginBottom={5}
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
                  Desconto
                </Typography>

                <Controller
                  control={control}
                  name="discount"
                  defaultValue={data?.discount}
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

                {data ? (
                  <>
                    <Typography marginTop={3} marginBottom={1}>
                      Data de Saída
                    </Typography>
                    <Controller
                      name="exitDate"
                      defaultValue={data ? dayjs(data.exitDate).format() : undefined}
                      control={control}
                      rules={{ required: true, validate: (value) => (value === "Invalid Date" ? false : true) }}
                      render={({ field }) => (
                        <>
                          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                            <DateTimePicker
                              {...field}
                              sx={{ marginTop: 0, "& .MuiInputBase-input": { padding: "8.5px" } }}
                              value={dayjs(field.value)}
                              onChange={(newValue) => {
                                field.onChange(dayjs(newValue).format());
                                console.log(newValue);
                              }}
                            />
                          </LocalizationProvider>
                        </>
                      )}
                    />
                    {errors.exitDate?.type === "required" && (
                      <Typography color={"error"}>Coloque a data de entrada</Typography>
                    )}
                  </>
                ) : (
                  <Skeleton variant="rectangular" width={200} height={36} />
                )}
              </Box>
            </Grid>
          </Grid>
        </DialogModalScroll.Content>

        <DialogModalScroll.Footer>
          <Stack flexDirection={"row"} justifyContent={"center"} margin={2}>
            <OsProcessSVG color={theme.palette.secondary.main} />
          </Stack>
          <Stack flexDirection={"row"} justifyContent={"center"} gap={1} width={"100%"} margin={"0!important"}>
            <Button
              fullWidth
              onClick={() => {
                handlePrev();
              }}
              size="large"
              sx={{
                background: theme.palette.secondary.main,
                color: theme.palette.background.paper,
              }}
            >
              Prev
            </Button>
            <Button
              fullWidth
              onClick={() => {
                handleNext();
              }}
              size="large"
              sx={{
                background: theme.palette.secondary.main,
                color: theme.palette.background.paper,
              }}
            >
              next
            </Button>
          </Stack>
        </DialogModalScroll.Footer>
      </CreateServiceModal>
    </>
  );
};
