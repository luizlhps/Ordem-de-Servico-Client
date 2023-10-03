import { CSSProperties, useContext, useEffect, useState } from "react";
import { ToastSuccess } from "../Toast/ToastSuccess";
import { ToastError } from "../Toast/ToastError";
import TransitionsModal from "../Modal/Modal";
import { CloseModal } from "../Modal/financePage/FormCrudModals";
import { LayoutCreateOs } from "./LayoutCreateOs";
import { orderApi } from "@/services/api/orderApi";
import { IDetailsStatus, statusApi } from "@/services/api/statusApi";
import { IStatus } from "../ServicesPage/Status";
import { ICostumer } from "../../../types/costumer";
import { DialogModalScroll } from "../Modal/DialogModalScroll";

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
  const [data, setData] = useState<any | undefined>(undefined);
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
      handleClose();
    }
  }

  function confirmData() {
    if (costumer && data) createOrder(data, costumer._id);
  }

  const setFormValues = (values: any) => {
    setData((prevValues: any) => ({
      ...prevValues,
      ...values,
    }));
  };

  //Clear Form after close modal
  useEffect(() => {
    setData("");
  }, [handleClose]);

  return (
    <>
      <ToastSuccess alertSuccess="Criado com sucesso!!" formSuccess={success} setFormSuccess={setSuccess} />
      <ToastError errorMessage={messageError} formError={error} setFormError={setError} />

      <DialogModalScroll.Root handleClose={handleClose} open={open} style={style}>
        {open && (
          <>
            <CloseModal handleClose={handleClose} />
            <LayoutCreateOs
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
      </DialogModalScroll.Root>
    </>
  );
};
export default NewOrder;
