import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Divider,
  Stack,
  Typography,
  useTheme,
  Grid,
  Skeleton,
  Box,
  Button,
  useMediaQuery,
  MenuItem,
  TextField,
} from "@mui/material";
import styled from "styled-components";
import { Controller, useForm } from "react-hook-form";
import { FormRegisterCostumerContext } from "@/contexts";
import { MarketSVG, OsProcessSVG, UserProcessSVG } from "../../../../public/icon/SVGS/IconsSVG";
import { TStatusData, statusApi } from "@/services/api/statusApi";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/pt-br";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("pt-br");

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FormSelect from "@/components/FormSelect";
import { useDebouse } from "@/hook";
import { TypeForm } from "./types";
import useApiRequest from "@/hook/useApiGet";
import { ICostumerData, constumersApi } from "@/services/api/costumersApi";
import { ICustomer } from "@/pages/clients";
import { DateTimePicker, LocalizationProvider, ptBR } from "@mui/x-date-pickers";

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
  color: #1e2737;
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
  setCostumerId?: React.Dispatch<ICustomer | undefined>;
}

type Inputs = {
  equipment: string;
  model: string;
  brand: string;
  dateEntry: any;
  status: string;
  defect: string;
  observation: string;
  costumer: string;
};

export const CreateOs: React.FC<NameFormProps> = ({
  nextFormStep,
  prevFormStep,
  data,
  setData,
  typeForm,
  setCostumerId,
}) => {
  const theme = useTheme();
  const columnMedia = useMediaQuery("(max-width:1212px)");

  const [statusData, setStatusData] = useState<TStatusData | undefined>(undefined);
  const [costumerData, setConstumerData] = useState<ICostumerData | undefined>(undefined);

  const [dateValue, setDateValue] = useState<any>();

  const { request } = useApiRequest();

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

    const fetchGetCostumers = async () => {
      const data = await request(constumersApi.getAllCostumers, "", 0, 0);
      setConstumerData(data);
    };
    fetchGetCostumers();
  }, []);

  //form
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = (data: Inputs) => {
    console.log("sub", data);
    setData(data);
    nextFormStep();
  };

  useEffect(() => {
    if (data) {
      setValue("equipment", data.equipment);
      setValue("model", data.model);
      setValue("brand", data.brand);
      setValue("defect", data.defect);
      setValue("status", data.status);
      setValue("observation", data.observation);

      const newDateValue = data?.dateEntry;

      setDateValue(dayjs(newDateValue));
      setValue("dateEntry", dayjs(newDateValue).format());
    }
  }, [data]);

  console.log(dateValue);

  return (
    <>
      <form>
        <ContainerCustom>
          <Box marginBottom={3}>
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
          </Box>

          <Divider light sx={{ width: "100%", marginBottom: 6 }} />

          <Box display={"flex"} justifyContent={"space-between"} flexWrap={"inherit"}>
            {typeForm === "createOs" && (
              <>
                {costumerData ? (
                  <>
                    <Box display={"flex"} flexDirection={"column"}>
                      <FormSelect
                        name={"costumer"}
                        defaultValue={data?.costumer ? data?.costumer : ""}
                        rules={{ required: true }}
                        label={"Selecione o cliente"}
                        control={control}
                        width={200}
                      >
                        {costumerData?.customer.map((item) => {
                          return (
                            <MenuItem
                              key={item._id}
                              value={item.name}
                              onClick={() => {
                                setCostumerId ? setCostumerId(item as any) : undefined;
                              }}
                            >
                              {item.name}
                            </MenuItem>
                          );
                        })}
                      </FormSelect>
                      {errors.costumer?.type === "required" && (
                        <Typography color={"error"}>selecione o cliente</Typography>
                      )}
                    </Box>
                  </>
                ) : (
                  <Box display={"flex"}>
                    <Skeleton variant="rectangular" width={200} height={36} />
                  </Box>
                )}
              </>
            )}

            {statusData ? (
              <Box>
                <FormSelect
                  name={"status"}
                  rules={{ required: true }}
                  defaultValue={data?.status ? data.status : ""}
                  label={"status"}
                  control={control}
                >
                  {statusData?.status.map((item) => {
                    return (
                      <MenuItem key={item._id} value={item.name}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </FormSelect>
                {errors.status?.type === "required" && <Typography color={"error"}>Coloque o status</Typography>}
              </Box>
            ) : (
              <Skeleton variant="rectangular" width={200} height={36} />
            )}
          </Box>
          <Grid
            color={theme.palette.primary.main}
            sx={{
              input: {
                background: theme.palette.background.paper,
                color: theme.palette.primary.main,
              },
            }}
            marginTop={2}
            container
            spacing={3}
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

                {data ? (
                  <>
                    <Typography marginTop={3} marginBottom={1}>
                      Data de entrada*
                    </Typography>
                    <Controller
                      name="dateEntry"
                      defaultValue={dateValue ? dayjs(dateValue).format() : null}
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <>
                          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                            <DateTimePicker
                              sx={{ marginTop: 0, "& .MuiInputBase-input": { padding: "8.5px" } }}
                              value={dateValue}
                              onChange={(newValue) => {
                                setDateValue(newValue);
                                field.onChange(dateValue);
                              }}
                            />
                          </LocalizationProvider>
                        </>
                      )}
                    />
                    {errors.dateEntry?.type === "required" && (
                      <Typography color={"error"}>Coloque a data de entrada</Typography>
                    )}
                  </>
                ) : (
                  <Skeleton variant="rectangular" width={200} height={36} />
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
            </Grid>
          </Grid>
          <Stack flexDirection={"row"} justifyContent={"center"} marginTop={5}>
            {typeForm === "createCostumer" && (
              <>
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
              </>
            )}
            <OsProcessSVG color={theme.palette.secondary.main} />
          </Stack>

          <Box justifyContent={"center"} display={"flex"}>
            <Stack flexDirection={"row"} justifyContent={"center"} gap={3}>
              {(typeForm === "createCostumer" || typeForm === "updateCostumer") && (
                <>
                  {" "}
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
                </>
              )}

              {(typeForm === "createCostumer" || typeForm === "updateCostumer") && (
                <>
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
                </>
              )}

              {typeForm === "createOs" && (
                <>
                  <Button
                    size="large"
                    sx={{
                      marginTop: 6,
                      background: theme.palette.secondary.main,
                      color: theme.palette.background.paper,
                    }}
                    onClick={() => handleSubmit(onSubmit)()}
                  >
                    Next
                  </Button>
                </>
              )}
            </Stack>
          </Box>
        </ContainerCustom>
      </form>
    </>
  );
};
