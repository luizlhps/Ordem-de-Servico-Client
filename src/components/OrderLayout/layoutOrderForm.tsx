import { LayoutUpdateOrder } from "./LayoutUpdateOrder";
import { LayoutCreateOs } from "./LayoutCreateOs";
import React, { useState } from "react";
import { ICustomerAndOrderData } from "@/contexts";
import { useTheme, Container } from "@mui/material";
import { AdressForm, CompletedForm, CreateOs, NameForm } from "../ProgressStepper";
import { TypeForm } from "../ProgressStepper/Forms/types";
import { DescriptionOS } from "../ProgressStepper/Forms/DescriptionOs";
import { ICustomer } from "@/pages/clients";
import { useFormStep } from "@/hook/useFormStep";

export interface IConfigContext {
  confirmData: any;
  data: ICustomerAndOrderData | undefined;
  setFormValues: any;
  loading: boolean;
}

export interface ILayoutCostumerForm {
  ConfigContext: IConfigContext;
  typeForm: TypeForm;
  costumer: ICustomer | undefined;
  handleClose: () => void;
  setCostumerId: React.Dispatch<ICustomer | undefined>;
  createOs?: boolean;
  updateOs?: boolean;
}

export const LayoutOrderForm: React.FC<ILayoutCostumerForm> = ({
  ConfigContext,
  handleClose,
  typeForm,
  setCostumerId,
  costumer,
  createOs,
  updateOs,
}) => {
  const { confirmData, data, setFormValues, loading } = ConfigContext;

  return (
    <>
      {createOs && (
        <LayoutCreateOs
          data={data}
          setFormValues={setFormValues}
          setCostumerId={setCostumerId}
          loading={loading}
          confirmData={confirmData}
          handleClose={handleClose}
          costumer={costumer}
          typeForm={typeForm}
        />
      )}

      {updateOs && (
        <LayoutUpdateOrder
          data={data}
          setFormValues={setFormValues}
          setCostumerId={setCostumerId}
          loading={loading}
          costumer={costumer}
          confirmData={confirmData}
          handleClose={handleClose}
          typeForm={typeForm}
        />
      )}
    </>
  );
};
