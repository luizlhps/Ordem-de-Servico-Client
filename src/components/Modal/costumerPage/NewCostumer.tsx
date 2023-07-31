import React, { ReactNode, useEffect, useState } from "react";
import TransitionsModal from "../Modal";
import { IconButton, Icon } from "@mui/material";
import { FormRegisterCostumerContext, ICustomerAndOrderData } from "@/contexts";
import { ICostumer } from "../../../../types/costumer";
import { IDetailsStatus, IStatus, statusApi } from "@/services/api/statusApi";
import { costumersApi } from "@/services/api/costumersApi";
import { orderApi } from "@/services/api/orderApi";
import { LayoutCreateCostumer } from "@/components/CostumerPage/LayoutCreateCostumer";
import { CSSProperties } from "@mui/styled-engine-sc";
import { ToastSuccess } from "@/components/Toast/ToastSuccess";
import { ToastError } from "@/components/Toast/ToastError";

const buttonStyle = {
  position: "absolute" as "absolute",
  top: "8%",
  left: "90%",
  zIndex: 1,

  "@media (max-width: 768px)": {
    top: "4.5%",
    left: "80%",
  },
};

interface IProps {
  open: boolean;
  handleClose: () => void;
  fetchApi: any;
  styles: CSSProperties;
}

export const NewCostumer: React.FC<IProps> = ({ open, handleClose, fetchApi, styles }) => {
  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<ICustomerAndOrderData | undefined>(undefined);
  const [statusId, setStatusId] = useState<IStatus | undefined>();

  const setFormValues = (values: any) => {
    setData((prevValues) => ({
      ...prevValues,
      ...values,
    }));
  };

  async function updateStatusForId(data: any) {
    const updateStatus = { ...data, status: statusId };
    return updateStatus;
  }

  function confirmData() {
    async function costumer(data: any) {
      setLoading(true);
      try {
        const res = await costumersApi.createCostumer(await updateStatusForId(data));

        if (res instanceof Error) {
          throw new Error("Ocorreu um erro");
        }

        await order(await updateStatusForId(data), res.data._id);
        fetchApi();
      } catch (error: any) {
        setSuccess(false);
        console.error(error);
        setMessageError(error.response.data.message); //
      }
    }

    async function order(data: any, costumerId: string) {
      try {
        const res = await orderApi.createOrder(data, costumerId);
        setSuccess(true);
      } catch (error: any) {
        setSuccess(false);
        setMessageError(error.response.data.message); //
        console.error(error);
      } finally {
        fetchApi();
        setLoading(false);
        handleClose();
      }
    }

    costumer(data);
  }

  return (
    <>
      <ToastSuccess alertSuccess="Criado com sucesso!!" formSuccess={success} setFormSuccess={setSuccess} />
      <ToastError errorMessage={messageError} formError={error} setFormError={setError} />

      <TransitionsModal handleClose={handleClose} open={open} style={styles}>
        <IconButton onClick={handleClose} sx={buttonStyle}>
          <Icon>close</Icon>
        </IconButton>

        <LayoutCreateCostumer
          confirmData={confirmData}
          data={data}
          handleClose={handleClose}
          loading={loading}
          setFormValues={setFormValues}
          setStatusId={setStatusId}
          typeForm="createCostumer"
        />
      </TransitionsModal>
    </>
  );
};
