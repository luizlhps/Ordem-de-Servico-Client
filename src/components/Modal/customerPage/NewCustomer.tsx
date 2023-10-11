import React, { ReactNode, useEffect, useState } from "react";
import TransitionsModal from "../Modal";
import { IconButton, Icon } from "@mui/material";
import { ICustomer } from "../../../../types/customer";
import { IDetailsStatus, IStatus, statusApi } from "@/services/api/statusApi";
import { customersApi } from "@/services/api/customersApi";
import { orderApi } from "@/services/api/orderApi";
import { LayoutCreateCustomer } from "@/components/CustomerPage/LayoutCreateCustomer";
import { CSSProperties } from "@mui/styled-engine-sc";
import { ToastSuccess } from "@/components/Toast/ToastSuccess";
import { ToastError } from "@/components/Toast/ToastError";
import { ICustomerAndOrderData } from "../../../../types/formOrderCustomer";

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

export const NewCustomer: React.FC<IProps> = ({ open, handleClose, fetchApi, styles }) => {
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

  const closeModalAndEraseData = () => {
    setData(undefined);
    handleClose();
  };

  async function updateStatusForId(data: any) {
    const updateStatus = { ...data, status: statusId };
    return updateStatus;
  }

  function confirmData() {
    async function customer(data: any) {
      setLoading(true);
      try {
        const res = await customersApi.createCustomer(await updateStatusForId(data));

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

    async function order(data: any, customerId: string) {
      try {
        const res = await orderApi.createOrder(data, customerId);
        setSuccess(true);
      } catch (error: any) {
        setSuccess(false);
        setMessageError(error.response.data.message); //
        console.error(error);
      } finally {
        fetchApi();
        setLoading(false);
        closeModalAndEraseData();
      }
    }

    customer(data);
  }

  return (
    <>
      <ToastSuccess alertSuccess="Criado com sucesso!!" formSuccess={success} setFormSuccess={setSuccess} />
      <ToastError errorMessage={messageError} formError={error} setFormError={setError} />

      <TransitionsModal handleClose={closeModalAndEraseData} open={open} style={styles}>
        <IconButton onClick={closeModalAndEraseData} sx={buttonStyle}>
          <Icon>close</Icon>
        </IconButton>

        <LayoutCreateCustomer
          confirmData={confirmData}
          data={data}
          handleClose={closeModalAndEraseData}
          loading={loading}
          setFormValues={setFormValues}
          setStatusId={setStatusId}
          typeForm="createCustomer"
        />
      </TransitionsModal>
    </>
  );
};
