import React, { Dispatch, useState } from "react";
import { ICustomerAndOrderData } from "@/contexts";
import { useTheme, Container } from "@mui/material";
import { AdressForm, CompletedForm, CreateOs, NameForm } from "../ProgressStepper";
import { TypeForm } from "../ProgressStepper/Forms/types";
import { IStatus } from "@/services/api/statusApi";
import { LayoutCreateCostumer } from "./LayoutCreateCostumer";
import { LayoutUpdateCostumer } from "./LayoutUpdateCostumer";

export interface IConfigContext {
  confirmData: any;
  data: any;
  setFormValues: any;
  loading: boolean;
}

export interface ILayoutCostumerForm {
  ConfigContext: IConfigContext;
  typeForm: TypeForm;
  handleClose: () => void;
  setStatusId: React.Dispatch<IStatus | undefined>;
}

export const LayoutCostumerForm: React.FC<ILayoutCostumerForm> = ({
  ConfigContext,
  handleClose,
  typeForm,
  setStatusId,
}) => {
  const { confirmData, data, setFormValues, loading } = ConfigContext;

  return (
    <>
      {typeForm === "createCostumer" && (
        <LayoutCreateCostumer
          confirmData={confirmData}
          data={data}
          handleClose={handleClose}
          loading={loading}
          setFormValues={setFormValues}
          setStatusId={setStatusId}
          typeForm="createCostumer"
        />
      )}

      {typeForm === "updateCostumer" && (
        <>
          <LayoutUpdateCostumer
            confirmData={confirmData}
            data={data}
            handleClose={handleClose}
            loading={loading}
            setFormValues={setFormValues}
            setStatusId={setStatusId}
            typeForm="createCostumer"
          />
        </>
      )}
    </>
  );
};
