import React, { useEffect } from "react";

//CSS Import MUI AND STYLED COMPONENTS
import { useTheme, Button } from "@mui/material";

import useMediaQuery from "@mui/material/useMediaQuery";

//ReactHookForm
import { useForm } from "react-hook-form";

//utils
import { TransformForbackEndCpf, TransformForbackEndPhoneNumber } from "@/utils/Masks";
import { DialogModalScroll } from "@/components/Modal/DialogModalScroll";
import { IInputsNameForm, LayoutName } from "../LayoutsForm";
import { Stepper } from "../../Stepper";
import { MarketSVG, OsProcessSVG, UserProcessSVG } from "../../../../../public/icon/SVGS/IconsSVG";

interface NameFormProps {
  formStep: number;
  nextFormStep: () => void;
  setData: any;
  data: any;
}

//code
export const NameFormCreate: React.FC<NameFormProps> = ({ formStep, nextFormStep, setData, data }) => {
  const theme = useTheme();
  const columnMedia = useMediaQuery("(max-width:720px)");

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IInputsNameForm>();

  const onSubmit = (data: IInputsNameForm) => {
    setData(data);
    nextFormStep();
  };

  useEffect(() => {
    if (data) {
      setValue("name", data.name);
      setValue("email", data.email);
      setValue("contact", data.contact);
      setValue("cpfOrCnpj", data.cpfOrCnpj);
      setValue("phone", data.phone);
      setValue("tel", data.tel);
    }
  }, [data]);

  const phoneValue = watch("phone");
  const telValue = watch("tel");
  const cpf = watch("cpfOrCnpj");

  return (
    <>
      <>
        <DialogModalScroll.Title>Cadastro</DialogModalScroll.Title>
        <DialogModalScroll.Content dividers={true} customStyle={{ borderBottom: "none" }}>
          <LayoutName control={control} errors={errors} wrapColumn={columnMedia}></LayoutName>

          {/* footer */}
        </DialogModalScroll.Content>

        <DialogModalScroll.Footer>
          <Stepper stepCurrent={formStep} margin={4}>
            <UserProcessSVG color={theme.palette.secondary.main} />
            <MarketSVG color={theme.palette.secondary.main} />
            <OsProcessSVG color={theme.palette.secondary.main} />
          </Stepper>

          <Button
            fullWidth
            onClick={() => {
              setValue("phone", TransformForbackEndPhoneNumber(phoneValue));
              setValue("tel", TransformForbackEndPhoneNumber(telValue));
              setValue("cpfOrCnpj", TransformForbackEndCpf(cpf));
              handleSubmit(onSubmit)();
            }}
            size="large"
            sx={{
              background: theme.palette.secondary.main,
              color: theme.palette.background.paper,
              margin: 0,
            }}
          >
            Next
          </Button>
        </DialogModalScroll.Footer>
      </>
    </>
  );
};
