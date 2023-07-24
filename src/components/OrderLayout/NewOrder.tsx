import { CSSProperties, useContext, useState } from "react";
import { ToastSuccess } from "../Toast/ToastSuccess";
import { ToastError } from "../Toast/ToastError";
import TransitionsModal from "../Modal/Modal";
import { CloseModal } from "../Modal/financePage/FormCrudModals";
import { ICustomerAndOrderData } from "@/contexts";
import { LayoutCreateOs } from "./LayoutCreateOs";
import { orderApi } from "@/services/api/orderApi";
import { IDetailsStatus, statusApi } from "@/services/api/statusApi";
import { IStatus } from "../ServicesPage/Status";
import { ICostumer } from "../../../types/costumer";

interface IPropsNewCostumer {
  handleClose: () => void;
  fetchApi: () => void;
  style: CSSProperties;
  open: boolean;
}

const NewOrder = ({ handleClose, fetchApi, style, open }: IPropsNewCostumer) => {
  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<ICustomerAndOrderData | undefined>(undefined);
  const [costumer, setCostumer] = useState<ICostumer | undefined>(undefined);
  const [statusId, setStatusId] = useState<IStatus | undefined>();

  async function createOrder(data: any, costumer: string) {
    try {
      const statusUpdateId = async () => {
        const updateStatus = { ...data, status: statusId };
        return updateStatus;
      };
      await orderApi.createOrder(await statusUpdateId(), costumer);
      setSuccess(true);
      fetchApi();
    } catch (err: any) {
      setMessageError(typeof err.request.response === "string" ? err.request.response : "Ocorreu um erro!!");
      setError(true);
    } finally {
      setData(undefined);
      setLoading(false);
    }
  }

  function confirmData() {
    if (!costumer) return new Error("O id do cliente não foi selecionado");
    createOrder(data, costumer._id);
  }

  const setFormValues = (values: any) => {
    setData((prevValues) => ({
      ...prevValues,
      ...values,
    }));
  };

  return (
    <>
      <ToastSuccess alertSuccess="Criado com sucesso!!" formSuccess={success} setFormSuccess={setSuccess} />
      <ToastError errorMessage={messageError} formError={error} setFormError={setError} />

      <TransitionsModal handleClose={handleClose} open={open} style={style}>
        {open && (
          <>
            <CloseModal handleClose={handleClose} />
            <LayoutCreateOs
              statusId={statusId}
              setStatusId={setStatusId}
              data={data}
              setFormValues={setFormValues}
              setCostumerId={setCostumer}
              loading={loading}
              confirmData={confirmData}
              handleClose={handleClose}
              costumer={costumer}
              typeForm={"createOs"}
            />
          </>
        )}
      </TransitionsModal>
    </>
  );
};
export default NewOrder;
