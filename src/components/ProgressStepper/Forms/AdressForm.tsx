import React, { useContext, useEffect, useState } from "react";

//CSS Import MUI AND STYLED COMPONENTS
import { FormContext } from "@/contexts";
import { Button, Divider, Stack, Typography, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import styled from "styled-components";

//ReactHookForm
import { useDebouse } from "@/hook";
import { CepSearch } from "@/services/api/SearchCep";
import { numbersOnly } from "@/utils/Masks";
import { useForm } from "react-hook-form";

//style custom
const InputCustom = styled.input`
  height: 35px;
  font-size: 16px;
  color: #1e2737;
  width: 300px;
  border-radius: 0.3rem;
  padding: 4px;
  border-style: none;
  border: 1px #878787 solid;
  margin-top: 4px;
  font-family: arial;

  @media (max-width: 1110px) {
    width: 100%;
  }
`;

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

const AdressForm: React.FC<NameFormProps> = ({ formStep, nextFormStep, prevFormStep }) => {
  const { debouse } = useDebouse();
  const [errorForm, setErrorForm] = useState(false);

  const theme = useTheme();
  const columnMedia = useMediaQuery("(max-width:1110px)");

  const { setFormValues, data } = useContext(FormContext);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const numberForm = watch("number");
  const cepForm = watch("cep");

  useEffect(() => {
    if (data.cep !== undefined) {
      const CepLength = data.cep.split("").length;
      if (CepLength > 2) {
        setValue("number", data.number);
        setValue("cep", data.cep);
      }
    }

    if (numberForm !== "") {
      setValue("number", numbersOnly(numberForm));
      setValue("cep", numbersOnly(cepForm));
    }
  }, [numberForm, cepForm]);

  //Search Cep
  const searchCep = async (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const cep = e.target.value.replace(/\D/g, "");
    setErrorForm(false);

    if (cep.split("").length === 8) {
      try {
        debouse(() => {
          CepSearch.getSeachCep(cep).then((data) => {
            if (data.erro) {
              setErrorForm(true);
              return;
            }
            setValue("city", data.localidade);
            setValue("neighborhood", data.bairro);
            setValue("complement", data.complemento);
            setValue("state", data.uf);
            setValue("street", data.logradouro);
          });
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const onSubmit = (data: Inputs) => {
    setFormValues(data);
    nextFormStep();
  };
  return (
    <>
      {formStep <= 1 && (
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
            <Stack
              direction={columnMedia ? "column" : "row"}
              justifyContent={"space-between"}
              marginTop={4}
            >
              <div>
                <Typography fontWeight={500} marginTop={2}>
                  CEP*
                </Typography>
                <InputCustom
                  maxLength={8}
                  placeholder="Digite o Nome"
                  {...register("cep", { required: true })}
                  onBlur={searchCep}
                  defaultValue={data.cep}
                />
                {errors.cep?.type === "required" && (
                  <Typography color={"error"}>Digite um cep</Typography>
                )}
                {errorForm === true && (
                  <Typography color={"error"}>Digite um cep válido</Typography>
                )}

                <Typography marginTop={2}>Cidade*</Typography>
                <InputCustom
                  id="outlined-multiline-flexible"
                  placeholder="Digite o Nome"
                  {...register("city", { required: true })}
                  defaultValue={data.city}
                />
                {errors.city?.type === "required" && (
                  <Typography color={"error"}>Digite o numero</Typography>
                )}
                <Typography marginTop={2}>Bairro*</Typography>
                <InputCustom
                  id="outlined-multiline-flexible"
                  placeholder="Digite o Nome"
                  {...register("neighborhood", { required: true })}
                  defaultValue={data.neighborhood}
                />
                {errors.neighborhood?.type === "required" && (
                  <Typography color={"error"}>Digite o numero</Typography>
                )}
                <Typography marginTop={2}>Complemento</Typography>
                <InputCustom
                  id="outlined-multiline-flexible"
                  placeholder="Digite o Nome"
                  {...register("complement")}
                  defaultValue={data.complement}
                />
              </div>
              <div>
                <Typography marginTop={2}>Estado*</Typography>
                <InputCustom
                  placeholder="Digite o Nome"
                  {...register("state", { required: true })}
                  defaultValue={data.state}
                />
                {errors.state?.type === "required" && (
                  <Typography color={"error"}>Digite o numero</Typography>
                )}
                <Typography marginTop={2}>Rua*</Typography>
                <InputCustom
                  placeholder="Digite o Nome"
                  defaultValue={data.street}
                  {...register("street", { required: true })}
                />
                {errors.street?.type === "required" && (
                  <Typography color={"error"}>Digite o numero</Typography>
                )}
                <Typography marginTop={2}>Numero*</Typography>
                <InputCustom
                  type="text"
                  placeholder="Digite o Nome"
                  {...register("number", { required: true })}
                  defaultValue={data.number}
                />
                {errors.number?.type === "required" && (
                  <Typography color={"error"}>Digite o numero</Typography>
                )}
              </div>
            </Stack>
          </ContainerCustom>
          <Stack flexDirection={"row"} justifyContent={"center"}>
            <Button onClick={prevFormStep} size="large">
              Prev
            </Button>
            <Button
              onClick={() => {
                handleSubmit(onSubmit)();
                searchCep;
              }}
              size="large"
            >
              Next
            </Button>
          </Stack>
        </form>
      )}
    </>
  );
};
export default AdressForm;
