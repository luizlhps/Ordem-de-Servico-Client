import { ReactElement, useState } from "react";

import styled from "@emotion/styled";
import { useTheme, Button } from "@mui/material";

import { Stepper } from "@/components/ProgressStepper/Stepper";
import { UserProcessSVG } from "../../../public/icon/SVGS/IconsSVG";

//style custom
const InputCustom = styled.input`
  height: 38px;
  font-size: 16px;
  color: #1e2737;
  width: 100%;
  border-radius: 0.3rem;
  padding: 8px;
  border-style: none;
  border: 1px #878787 solid;
  margin-top: 4px;
  font-family: arial;
`;

const CheckBoxCustom = styled.input`
  appearance: none;
  background: white;
  margin-right: 0.5rem;
  border: 1px solid;

  width: 1rem;
  height: 1rem;
  display: inline-block;

  position: relative;

  :checked {
    ::before {
      content: "✓";
      color: white;
      position: absolute;
      top: -12%;
      left: 10%;
    }
  }
`;

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Login = () => {
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const handleSelect = (value: any) => {
    const isPresent = selectedItems.indexOf(value);
    if (isPresent !== -1) {
      const remaining = selectedItems.filter((item: any) => item !== value);
      setSelectedItems(remaining);
    } else {
      setSelectedItems((prevItems: any) => [...prevItems, value]);
    }
  };

  const theme = useTheme();
  return (
    <>
      <Button onClick={() => setCurrentStep((value) => (value += 1))} variant="outlined">
        SALVE
      </Button>
    </>
  );
};

export default Login;

Login.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};
