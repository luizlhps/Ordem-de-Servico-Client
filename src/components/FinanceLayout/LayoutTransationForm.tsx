import React, { useState } from "react";
import { ICustomerAndOrderData } from "@/contexts";
import { useTheme, Container } from "@mui/material";
import { AdressForm, CompletedForm, CreateOs, NameForm } from "../ProgressStepper";
import { TypeForm } from "../ProgressStepper/Forms/types";
import { DescriptionOS } from "../ProgressStepper/Forms/DescriptionOs";
import { ICustomer } from "@/pages/clients";

export interface IConfigContext {
  confirmData: any;
  data: ICustomerAndOrderData | undefined;
  setFormValues: any;
  loading: boolean;
}

export interface ILayoutTransactionForm {
  ConfigContext: IConfigContext;
  costumer: ICustomer | undefined;
  handleClose: () => void;
  setCostumerId: React.Dispatch<ICustomer | undefined>;
}

export const LayoutTransactionForm: React.FC<ILayoutTransactionForm> = ({
  ConfigContext,
  handleClose,
  setCostumerId,
  costumer,
}) => {
  const { confirmData, data, setFormValues, loading } = ConfigContext;

  const theme = useTheme();

  return <></>;
};
