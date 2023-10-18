import React, { SetStateAction, useEffect, useMemo, useState } from "react";
import {
  Stack,
  Typography,
  Grid,
  Icon,
  useTheme,
  IconButton,
  Box,
  Button,
  useMediaQuery,
  TextField,
  Skeleton,
  Autocomplete,
} from "@mui/material";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { OsProcessSVG, ReportSVG } from "../../../../../public/icon/SVGS/IconsSVG";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("pt-br");

import { RootService, servicesApi } from "@/services/api/servicesApi";
import CreateServiceModal from "@/components/Modal/servicesPage/Service/CreateServiceModal";
import useModal from "@/hook/useModal";
import { DialogModalScroll } from "@/components/Modal/DialogModalScroll";
import { IOrder } from "../../../../../types/order";
import { DateTimePickerControlled } from "@/components/DataTime/DateTimePicker";
import UpdateServiceModal from "@/components/Modal/servicesPage/Service/UpdateServiceModal";
import { IService } from "@/hook/useGetFetchService";

//Interface
interface NameFormProps {
  formStep: number;
  nextFormStep: () => void;
  prevFormStep: () => void;
  data: any;
  setData: any;
}

export const DescriptionOS: React.FC<NameFormProps> = ({ nextFormStep, prevFormStep, data, setData }) => {
  const theme = useTheme();
  const columnMedia = useMediaQuery("(max-width:1212px)");
  const [servicesData, setServicesData] = useState<RootService | null>(null);
  const [discount, setDiscount] = useState<SetStateAction<Number | undefined>>(0);

  const [newStatus, setNewStatus] = useState<SetStateAction<string | undefined>>();
  const [currentService, setCurrentService] = useState<IService>();

  async function FetchGetServices() {
    try {
      const servicesData = await servicesApi.getAllServices({ search: "" }, 0, 0);

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

  const { modalActions, modals } = useModal();
  const { modalOpen, modalUpdateOpen } = modals;
  const { modalHandleOpen, modalHandleClose, modalHandleUpdateClose, modalUpdateHandleOpen } = modalActions;

  //form
  const {
    register,
    handleSubmit,
    control,
    watch,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<any>({
    defaultValues: { services: [{}] },
  });

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

    data.services.forEach((item: any) => {
      //in first time it is object
      if (item._id) {
        arrayOfServices.push(item._id);

        //after submit prev the value is a array of string
      } else {
        arrayOfServices = data.services;
      }
    });

    return arrayOfServices;
  };

  useEffect(() => {
    if (!data.services || data.services.length === 0) {
      return;
    }

    setValue("services", functionArray());
  }, []);

  //calc price
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

  const onSubmit = (data: IOrder) => {
    console.log("sub", data);

    const filterServicesRemovingObjs = data.services.filter((value) => {
      return JSON.stringify(value) !== "{}";
    });

    const dataFiltered = { ...data, services: filterServicesRemovingObjs };

    setData(dataFiltered);
  };

  const handlePrev = () => {
    handleSubmit(onSubmit)();
    prevFormStep();
  };

  const handleNext = () => {
    handleSubmit((data) => {
      onSubmit(data);

      nextFormStep();
    })();
  };

  const ValueFieldOfService = (serviceCurrent: any) => {
    const data = servicesData?.service.find((service) => {
      return service._id === serviceCurrent;
    });

    setCurrentService(data);
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
        <UpdateServiceModal
          fetchApi={FetchGetServices}
          open={modalUpdateOpen}
          handleClose={modalHandleUpdateClose}
          handleOpen={modalUpdateHandleOpen}
          selectedItemUpdate={currentService}
        />
        <DialogModalScroll.Title>Criar O.S</DialogModalScroll.Title>

        <DialogModalScroll.Content dividers customStyle={{ borderBottom: "none" }}>
          <Box display={"flex"} justifyContent={"space-between"} width={"100%"} alignItems={"center"}>
            <Typography>Serviços</Typography>

            <Box display={"flex"} gap={1}>
              <Box width={34} height={34}>
                <IconButton size="small" onClick={() => append({})}>
                  <Icon fontSize="small">add</Icon>
                </IconButton>
              </Box>

              <Button
                onClick={modalActions.modalHandleOpen}
                size="small"
                sx={{ background: theme.palette.secondary.main, color: theme.palette.background.default }}
              >
                Novo
              </Button>
            </Box>
          </Box>

          {servicesData?.service ? (
            <>
              {fields.map((row, index) => (
                <Box
                  key={row.id}
                  display="flex"
                  justifyContent="flex-end"
                  alignItems={"center"}
                  marginTop={2}
                  width={"100%"}
                  position={"relative"}
                  onFocus={() => {
                    if (watchServices !== null && watchServices !== undefined) {
                      Object.keys(watchServices[index]).length !== 0 ? ValueFieldOfService(watchServices[index]) : null;
                    }
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      transaform: "translate(-50%, -50%)",
                      right: "30px",
                      zIndex: 1,
                    }}
                  >
                    {currentService && (
                      <IconButton onClick={modalUpdateHandleOpen}>
                        <EditIcon sx={{ width: 15, height: 15 }} />
                      </IconButton>
                    )}

                    <IconButton
                      size="small"
                      onClick={() => {
                        remove(index);
                        setCurrentService(undefined);
                      }}
                    >
                      <CloseIcon sx={{ width: 15, height: 15 }} />
                    </IconButton>
                  </Box>

                  <Controller
                    control={control}
                    name={`services.${index}`}
                    rules={{
                      validate: (value) => {
                        const existSameService = new Set(watchServices).size !== watchServices.length;
                        return !existSameService;
                      },
                    }}
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        size="small"
                        sx={{ width: "100%", "& .MuiAutocomplete-clearIndicator": { display: "none" } }}
                        defaultValue={null}
                        disablePortal
                        options={servicesData.service}
                        renderInput={(params) => <TextField {...params} />}
                        getOptionLabel={(option) => option.title}
                        value={
                          field.value
                            ? servicesData?.service.find((item) => {
                                return field.value === item._id;
                              }) ?? null
                            : null
                        }
                        renderOption={(props, option) => (
                          <Box component="li" {...props} key={option.id}>
                            {option.title}
                          </Box>
                        )}
                        onChange={(event, newValue) => {
                          if (newValue) setCurrentService(newValue);
                          field.onChange(newValue ? newValue._id : null);

                          clearErrors("services");
                        }}
                      />
                    )}
                  />
                </Box>
              ))}
              {Array.isArray(errors.services) && errors.services[0]?.type === "validate" && (
                <Typography color={"error"}>Não é permitido color serviços iguais!!</Typography>
              )}
            </>
          ) : (
            <Skeleton variant="rectangular" width={200} height={36} />
          )}

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

              <Controller
                defaultValue={data.technicalOpinion}
                name={"technicalOpinion"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    minRows={8}
                    multiline={true}
                    fullWidth
                    sx={{ fontWeight: 300 }}
                    onChange={(value) => onChange(value)}
                    value={value}
                    size="small"
                  />
                )}
              />

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
              <Typography>Valor</Typography>
              <TextField sx={{ fontWeight: 300 }} value={servicesPrice.toFixed(2)} size="small" fullWidth disabled />

              <Typography marginTop={3} marginBottom={1}>
                Valor Total
              </Typography>

              <TextField type="number" disabled value={totalPrice.toFixed(2)} size="small" fullWidth />
            </Grid>
            <Grid item>
              <Box>
                <Typography>Desconto</Typography>

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
                    <DateTimePickerControlled control={control} data={data} errors={errors} nameField="exitDate" />
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
          <Stack flexDirection={"row"} justifyContent={"center"} margin={2} gap={2} alignItems={"center"}>
            <Box width={50} justifyContent={"center"} display={"flex"}>
              <OsProcessSVG color={theme.palette.secondary.main} />
            </Box>
            <Box
              sx={{
                width: 22,
                height: 3,
                alignContent: "center",
                background: theme.palette.secondary.main,
              }}
            />

            <ReportSVG color={theme.palette.secondary.light} />
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
