import { Stepper } from "@mui/material";
import React, { useState } from "react";

const ProgressStepper = () => {
  const [formStep, setFormStep] = useState(0);

  const completeFormStep = () => {
    setFormStep(formStep + 1);
  };
  return (
    <div>
      <Stepper activeStep={0}></Stepper>
    </div>
  );
};

export default ProgressStepper;
