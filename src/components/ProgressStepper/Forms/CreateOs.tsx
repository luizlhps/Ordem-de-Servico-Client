import React, { useEffect, useState } from "react";
import {
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
import { MarketSVG, OsProcessSVG, ReportSVG, UserProcessSVG } from "../../../../public/icon/SVGS/IconsSVG";
import { IStatus, TStatusData, statusApi } from "@/services/api/statusApi";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("pt-br");

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FormSelect from "@/components/FormSelect";
import { TypeForm } from "./types";
import useApiRequest from "@/hook/useApiGet";
import { ICostumer, RootCostumer } from "../../../../types/costumer";
import { costumersApi } from "@/services/api/costumersApi";
import { DialogModalScroll } from "@/components/Modal/DialogModalScroll";
import { DateTimePickerControlled } from "@/components/DataTime/DateTimePicker";

//Interface
interface NameFormProps {
  formStep: number;
  nextFormStep: () => void;
  prevFormStep: () => void;
  data: any;
  setData: any;
  typeForm: TypeForm;
  setCostumer?: React.Dispatch<ICostumer>;
  setStatusId: React.Dispatch<IStatus | undefined>;
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
  setCostumer,
  setStatusId,
}) => {
  const theme = useTheme();
  const columnMedia = useMediaQuery("(max-width:1212px)");

  const [statusData, setStatusData] = useState<TStatusData | undefined>(undefined);
  const [costumerData, setConstumerData] = useState<RootCostumer | undefined>(undefined);
  const { request } = useApiRequest();

  useEffect(() => {
    async function FetchGetStatus() {
      try {
        const data = await statusApi.getAllStatus("", 0, 0);

        if (data instanceof Error) {
          return console.error(data.message);
        } else {
          setStatusData(data.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    FetchGetStatus();

    const fetchGetCostumers = async () => {
      const data = await request(costumersApi.getAllCostumers, "", 0, 0);
      setConstumerData(data);
    };
    fetchGetCostumers();
  }, []);

  //form
  const {
    register,
    handleSubmit,

    control,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = (data: Inputs) => {
    console.log("sub", data);
    setData(data);
    nextFormStep();
  };

  const handlePrev = () => {
    handleSubmit(onSubmit)();
    prevFormStep();
  };

  const handleNext = () => {
    handleSubmit(onSubmit)();
  };

  useEffect(() => {
    if (data) {
      setValue("equipment", data.equipment);
      setValue("model", data.model);
      setValue("brand", data.brand);
      setValue("defect", data.defect);
      setValue("status", data.status);
      setValue("observation", data.observation);
      setValue("dateEntry", dayjs(data?.dateEntry).format());
    }
  }, [data]);

  return (
    <>
      <DialogModalScroll.Title>Criar O.S</DialogModalScroll.Title>

      {/*content  */}
      <DialogModalScroll.Content dividers={true} customStyle={{ borderBottom: "none" }}>
        <Box display={"flex"} marginTop={4} justifyContent={"space-between"} flexWrap={"wrap"} gap={2} width={"100%"}>
          {typeForm === "createOs" && (
            <>
              {costumerData && setCostumer ? (
                <Box display={"flex"} flexDirection={"column"}>
                  <FormSelect
                    name={"costumer"}
                    defaultValue={data?.costumer ? data?.costumer : ""}
                    rules={{ required: typeForm === "createOs" ? true : false }}
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
                            setCostumer(item);
                          }}
                        >
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </FormSelect>
                  {errors.costumer?.type === "required" && <Typography color={"error"}>selecione o cliente</Typography>}
                </Box>
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
                    <MenuItem key={item._id} value={item.name} onClick={() => setStatusId(item)}>
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
          marginTop={1}
          color={theme.palette.primary.main}
          sx={{
            input: {
              background: theme.palette.background.paper,
              color: theme.palette.primary.main,
            },
          }}
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

              <>
                <Typography marginTop={3} marginBottom={1}>
                  Data de entrada*
                </Typography>
                <DateTimePickerControlled
                  control={control}
                  data={data}
                  errors={errors}
                  nameField="dateEntry"
                  dateNow
                  required
                />
              </>
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
          flexDirection={"column"}
        >
          <Grid item xs>
            <Typography marginTop={3} marginBottom={1}>
              Defeito
            </Typography>
            <TextField multiline rows={2} fullWidth {...register("defect", { required: true })} />
            {errors.defect?.type === "required" && <Typography color={"error"}>Digite a descrição</Typography>}
          </Grid>
          <Grid item marginBottom={2}>
            <Typography marginBottom={1}>Observação</Typography>
            <TextField rows={4} multiline fullWidth {...register("observation")} />
          </Grid>
        </Grid>
      </DialogModalScroll.Content>

      {/* footer */}
      <DialogModalScroll.Footer>
        <Stack flexDirection={"row"} justifyContent={"center"} margin={2} alignItems={"center"}>
          {typeForm === "createCostumer" && (
            <>
              <UserProcessSVG color={theme.palette.secondary.main} />
              <Box
                sx={{
                  width: 22,
                  height: 3,
                  alignContent: "center",
                  background: theme.palette.secondary.main,
                }}
              />
              <MarketSVG color={theme.palette.secondary.main} />
              <Box
                sx={{
                  width: 22,
                  height: 3,
                  alignContent: "center",
                  background: theme.palette.secondary.main,
                }}
              />
            </>
          )}
          <Box width={50} justifyContent={"center"} display={"flex"}>
            <UserProcessSVG color={theme.palette.secondary.main} />
          </Box>

          <Box
            sx={{
              width: 22,
              margin: "auto 10px",
              height: 3,
              alignContent: "center",
              background: theme.palette.secondary.main,
            }}
          />

          <ReportSVG color={theme.palette.primary.light} />
        </Stack>

        <Stack flexDirection={"row"} justifyContent={"center"} gap={2} width={"100%"} margin={"0!important"}>
          {(typeForm === "createCostumer" || typeForm === "updateCostumer") && (
            <>
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
            </>
          )}

          {(typeForm === "createCostumer" || typeForm === "updateCostumer") && (
            <>
              <Button
                fullWidth
                size="large"
                sx={{
                  background: theme.palette.secondary.main,
                  color: theme.palette.background.paper,
                }}
                onClick={handleNext}
              >
                Criar
              </Button>
            </>
          )}

          {typeForm === "createOs" && (
            <>
              <Button
                fullWidth
                size="large"
                sx={{
                  background: theme.palette.secondary.main,
                  color: theme.palette.background.paper,
                }}
                onClick={handleNext}
              >
                Next
              </Button>
            </>
          )}
        </Stack>
      </DialogModalScroll.Footer>
    </>
  );
};
