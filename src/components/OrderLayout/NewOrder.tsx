import { CSSProperties, useContext, useState } from "react";
import { ToastSuccess } from "../Toast/ToastSuccess";
import { ToastError } from "../Toast/ToastError";
import TransitionsModal from "../Modal/Modal";
import { CloseModal } from "../Modal/financePage/FormCrudModals";
import { ICustomerAndOrderData } from "@/contexts";
import { LayoutCreateOs } from "./LayoutCreateOs";
import { orderApi } from "@/services/api/orderApi";
import { ICustomer } from "@/pages/clients";
import { IDetailsStatus, statusApi } from "@/services/api/statusApi";

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
  const [costumer, setCostumer] = useState<ICustomer | undefined>(undefined);

  function confirmData() {
    async function createOrder(data: any, costumer: string) {
      try {
        const statusUpdateId = async () => {
          try {
            const requestStatusApi = await statusApi.getAllStatus("", 0, 0);

            if (!(requestStatusApi instanceof Error)) {
              const { status } = requestStatusApi;
              const statusID = status.find((status: IDetailsStatus) => status.name === data?.status);

              const updateStatus = { ...data, status: statusID?._id };
              return updateStatus;
            } else {
              throw new Error("Ocorreu um erro ao encontrar o statusId");
            }
          } catch (error) {
            console.error(error);
          }
        };

        const res = await orderApi.createOrder(await statusUpdateId(), costumer);

        setSuccess(true);
        fetchApi();
      } catch (err: any) {
        console.error(typeof err.request.response === "string" ? err.request.response : "Ocorreu um erro!!"),
          setMessageError(typeof err.request.response === "string" ? err.request.response : "Ocorreu um erro!!");
        setError(true);
      }
      setLoading(false);
    }

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
        <CloseModal handleClose={handleClose} />
        <LayoutCreateOs
          data={data}
          setFormValues={setFormValues}
          setCostumerId={setCostumer}
          loading={loading}
          confirmData={confirmData}
          handleClose={handleClose}
          costumer={costumer}
          typeForm={"createOs"}
        />
      </TransitionsModal>
    </>
  );
};
export default NewOrder;
