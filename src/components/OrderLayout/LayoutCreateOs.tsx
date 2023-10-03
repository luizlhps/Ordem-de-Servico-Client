import { Container, useTheme } from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CompletedForm, CreateOs } from "../ProgressStepper";
import { useFormStep } from "@/hook/useFormStep";
import { IStatus } from "@/services/api/statusApi";
import { TypeForm } from "../ProgressStepper/Forms/types";
import { ICostumer } from "../../../types/costumer";
import { ICustomerAndOrder } from "./UpdateOrder";

interface LayoutProps {
  data: ICustomerAndOrder | undefined;
  setFormValues: (values: any) => void;
  setCostumerId: Dispatch<SetStateAction<ICostumer | undefined>>;
  loading: boolean;
  costumer: ICostumer | undefined;
  confirmData: () => void | undefined;
  handleClose: () => void;
  typeForm: TypeForm;
  setStatusId: any;
}

export function LayoutCreateOs({
  data,
  setFormValues,
  setCostumerId,
  loading,
  confirmData,
  handleClose,
  costumer,
  typeForm,
  setStatusId,
}: LayoutProps) {
  const { nextFormStep, prevFormStep, formStep } = useFormStep();

  return (
    <>
      {formStep >= 0 && formStep <= 0 && (
        <CreateOs
          formStep={formStep}
          nextFormStep={nextFormStep}
          prevFormStep={prevFormStep}
          data={data}
          setData={setFormValues}
          typeForm="createOs"
          setCostumer={setCostumerId}
          setStatusId={setStatusId}
        />
      )}
      {formStep > 0 && (
        <CompletedForm
          loading={loading}
          data={data}
          confirmData={confirmData}
          handleClose={handleClose}
          costumer={costumer}
          typeForm={typeForm}
        />
      )}
    </>
  );
}
