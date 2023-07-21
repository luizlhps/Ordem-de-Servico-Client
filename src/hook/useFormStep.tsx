import { useState } from "react";

export const useFormStep = () => {
  const [formStep, setFormStep] = useState(0);

  const nextFormStep = () => {
    setFormStep(formStep + 1);
  };
  const prevFormStep = () => {
    setFormStep(formStep - 1);
  };

  return {
    formStep,
    setFormStep,
    nextFormStep,
    prevFormStep,
  };
};
