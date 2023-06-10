import React, { useContext, useEffect, useState } from "react";

//CSS Import MUI AND STYLED COMPONENTS
import { FormRegisterCostumerContext } from "@/contexts";
import { Button, Divider, Stack, Typography, useTheme, Box, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import styled from "styled-components";

//ReactHookForm
import { useDebouse } from "@/hook";
import { CepSearch } from "@/services/api/SearchCep";
import { numbersOnly } from "@/utils/Masks";
import { Controller, useForm } from "react-hook-form";
import { MarketSVG, OsProcessSVG, UserProcessSVG } from "../../../../public/icon/SVGS/IconsSVG";
import { TypeForm } from "./types";

const ContainerCustom = styled.div`
  padding: 60px;

  @media (max-width: 600px) {
    padding: 0px;
  }
`;

//Interface
interface NameFormProps {
  formStep: number;
  nextFormStep: () => void;
  prevFormStep: () => void;
  setData: any;
  typeForm: TypeForm;
  data: any;
}
type Inputs = {
  cep: any;
  city: string | undefined;
  neighborhood: string | undefined;
  complement: string | undefined;
  state: string | undefined;
  street: string;
  number: string;
};

export const AdressForm: React.FC<NameFormProps> = ({
  formStep,
  nextFormStep,
  prevFormStep,
  setData,
  typeForm,
  data,
}) => {
  const { debouse } = useDebouse();
  const [errorForm, setErrorForm] = useState(false);

  const theme = useTheme();
  const columnMedia = useMediaQuery("(max-width:1110px)");

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const numberForm = watch("number");
  const cepForm = watch("cep");

  useEffect(() => {
    if (data && data.address) {
      setValue("cep", data.address[0].cep);
      setValue("city", data.address[0].city);
      setValue("neighborhood", data.address[0].neighborhood);
      setValue("state", data.address[0].state);
      setValue("street", data.address[0].street);
      setValue("number", data.address[0].number);
      setValue("complement", data.address[0].complement);
    }
  }, [data, prevFormStep]);

  //Search Cep
  const searchCep = async (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const cep = e.target.value.replace(/\D/g, "");

    setErrorForm(false);

    if (cep.split("").length === 8) {
      try {
        debouse(() => {
          CepSearch.getSeachCep(cep).then((dataCepApi) => {
            if (dataCepApi.erro) {
              setErrorForm(true);
              return;
            }
            if (data) {
              setValue("city", dataCepApi.localidade);
              setValue("neighborhood", dataCepApi.bairro);
              setValue("complement", dataCepApi.complemento);
              setValue("state", dataCepApi.uf);
              setValue("street", dataCepApi.logradouro);
            }
          });
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const onSubmit = (data: Inputs) => {
    setData({ address: [data] });
  };
  return (
    <>
      <form>
        <ContainerCustom>
          <Typography variant="h1" fontWeight={500}>
            Endereço
          </Typography>
          <Divider
            sx={{
              width: 39,
              height: 5,
              background: theme.palette.secondary.main,
              marginLeft: 1,
            }}
          />

          <Stack direction={"column"} justifyContent={"space-between"} marginTop={4}>
            <Typography fontWeight={500} marginTop={3} marginBottom={1}>
              CEP*
            </Typography>
            <Controller
              name="cep"
              defaultValue={""}
              rules={{ required: true, minLength: 8, validate: (value) => !errorForm }}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  onBlur={searchCep}
                  error={!!errors.cep}
                  inputProps={{ maxLength: 8, pattern: "/d+/" }}
                  fullWidth
                  value={numbersOnly(value).replace(/^(\d{5})(\d{3})$/, "$1-$2")}
                  onChange={(e) => {
                    onChange(e.target.value);
                  }}
                  size="small"
                  placeholder="Digite o Nome"
                />
              )}
            />
            {errors.cep?.type === "required" && <Typography color={"error"}>Digite um cep</Typography>}
            {errorForm === true && <Typography color={"error"}>Digite um cep válido</Typography>}

            <Typography marginTop={3} marginBottom={1}>
              Cidade*
            </Typography>
            <Controller
              name="city"
              defaultValue={""}
              rules={{ required: true }}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  size="small"
                  error={!!errors.city}
                  value={value}
                  onChange={(e) => {
                    onChange(e.target.value);
                  }}
                  fullWidth
                  id="outlined-multiline-flexible"
                  placeholder="Digite o Nome"
                />
              )}
            />
            {errors.city?.type === "required" && <Typography color={"error"}>Digite a cidade</Typography>}
            <Typography marginTop={3} marginBottom={1}>
              Bairro*
            </Typography>
            <Controller
              rules={{ required: true }}
              name="neighborhood"
              defaultValue={""}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  size="small"
                  fullWidth
                  error={!!errors.neighborhood}
                  value={value}
                  onChange={(e) => {
                    onChange(e.target.value);
                  }}
                  id="outlined-multiline-flexible"
                  placeholder="Digite o Nome"
                />
              )}
            />
            {errors.neighborhood?.type === "required" && <Typography color={"error"}>Digite o bairro</Typography>}
            <Typography marginTop={3} marginBottom={1}>
              Complemento
            </Typography>

            <Controller
              name="complement"
              defaultValue={""}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  error={!!errors.complement}
                  value={value}
                  onChange={(e) => {
                    onChange(e.target.value);
                  }}
                  id="outlined-multiline-flexible"
                  placeholder="Digite o Nome"
                />
              )}
            />

            <Typography marginTop={3} marginBottom={1}>
              Estado*
            </Typography>
            <Controller
              rules={{ required: true }}
              name="state"
              defaultValue={""}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  error={!!errors.state}
                  value={value}
                  onChange={(e) => {
                    onChange(e.target.value);
                  }}
                  placeholder="Digite o Nome"
                />
              )}
            />
            {errors.state?.type === "required" && <Typography color={"error"}>Digite o estado</Typography>}

            <Stack flexDirection={!columnMedia ? "row" : "column"} gap={1}>
              <Box flex={1}>
                <Typography marginTop={3} marginBottom={1}>
                  Rua*
                </Typography>
                <Controller
                  rules={{ required: true }}
                  name="street"
                  defaultValue={""}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      size="small"
                      error={!!errors.street}
                      value={value}
                      onChange={(e) => {
                        onChange(e.target.value);
                      }}
                      placeholder="Digite o Nome"
                    />
                  )}
                />
                {errors.street?.type === "required" && <Typography color={"error"}>Digite a rua</Typography>}
              </Box>
              <Box>
                <Typography marginTop={3} marginBottom={1}>
                  Numero*
                </Typography>
                <Controller
                  rules={{ required: true }}
                  name="number"
                  defaultValue={""}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      size="small"
                      error={!!errors.number}
                      value={value}
                      onChange={(e) => {
                        onChange(e.target.value);
                      }}
                      type="text"
                      placeholder="Digite o Nome"
                    />
                  )}
                />
                {errors.number?.type === "required" && <Typography color={"error"}>Digite o numero</Typography>}
              </Box>
            </Stack>
          </Stack>
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

            {typeForm === "createCostumer" && (
              <>
                <Box
                  sx={{
                    width: 22,
                    margin: "auto 10px",
                    height: 3,
                    alignContent: "center",
                    background: theme.palette.primary.light,
                  }}
                />

                <Box
                  sx={{
                    width: 22,
                    margin: "auto 10px",
                    height: 3,
                    alignContent: "center",
                    background: theme.palette.primary.light,
                  }}
                />
                <OsProcessSVG color={theme.palette.primary.light} />
              </>
            )}
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
                Next
              </Button>
            </Stack>
          </Box>
        </ContainerCustom>
      </form>
    </>
  );
};
