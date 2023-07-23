import { CSSProperties, useContext, useEffect, useState } from "react";
import { ICustomerAndOrderData } from "@/contexts";
import { ToastSuccess } from "../Toast/ToastSuccess";
import { ToastError } from "../Toast/ToastError";
import TransitionsModal from "../Modal/Modal";
import { CloseModal } from "../Modal/financePage/FormCrudModals";
import { LayoutUpdateOrder } from "./LayoutUpdateOrder";
import { ICustomer } from "@/pages/clients";
import { IOrder } from "../../../types/order";
import { IDetailsStatus, statusApi } from "@/services/api/statusApi";
import { orderApi } from "@/services/api/orderApi";
import { IStatus } from "../ServicesPage/Status";

interface IPropsUpdateCostumer {
  handleClose: () => void;
  fetchApi: () => void;
  style: CSSProperties;
  open: boolean;
  selectItem: IOrder | undefined;
}

export interface ICustomerAndOrder {
  id: number;
  name: string;
  email: string;
  contact: string;
  phone: string;
  cpfOrCnpj: string;
  tel: string;
  orders: any[];
  createdAt: string;
  updatedAt: string;
  cep: string;
  state: string;
  neighborhood: string;
  street: string;
  city: string;
  number: string;
  complement: string;
  _id: string;

  //equipament
  equipment: string;
  brand: string;
  dateEntry: string;
  model: string;
  defect: string;
  status: string;
}

const UpdateOrder = ({ handleClose, fetchApi, style, open, selectItem }: IPropsUpdateCostumer) => {
  const [messageError, setMessageError] = useState("");
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const [data, setData] = useState<ICustomerAndOrder | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [costumer, setCostumer] = useState<ICustomer | undefined>();
  const [statusId, setStatusId] = useState<IStatus | undefined>();

  ////////

  console.log(selectItem);

  const selectItemId = selectItem?._id;

  const selectItemServices: string[] = [];

  selectItem?.services?.map((item: any) => {
    selectItemServices.push(item._id);
  });

  useEffect(() => {
    if (selectItem) {
      const form = {
        equipment: selectItem.equipment,
        defect: selectItem.defect,
        observation: selectItem.observation,
        dateEntry: selectItem.dateEntry,
        status: selectItem.status.name,
        brand: selectItem.brand,
        model: selectItem.model,

        phone: selectItem.customer.phone,
        name: selectItem.customer._id,
        costumer: selectItem.customer.name,
        services: selectItemServices,
        discount: selectItem.discount,
        exitDate: selectItem.exitDate,
        technicalOpinion: selectItem.technicalOpinion,
      };

      setData((prevValues: any) => ({
        ...prevValues,
        ...form,
      }));
    }
  }, [selectItem]);

  const setFormValues = (values: any) => {
    setData((prevValues) => ({
      ...prevValues,
      ...values,
    }));
  };

  function confirmData() {
    if (selectItem) updateOrder(data, selectItem?._id);

    async function updateOrder(data: any, costumer: string) {
      try {
        const statusUpdateId = async () => {
          const updateStatus = { ...data, status: statusId };
          return updateStatus;
        };

        if (selectItemId) {
          const res = await orderApi.updateOrder(await statusUpdateId(), selectItemId);
        }
        setSuccess(true);
        fetchApi();
      } catch (err: any) {
        console.error(typeof err.request.response === "string" ? err.request.response : "Ocorreu um erro!!"),
          setMessageError(typeof err.request.response === "string" ? err.request.response : "Ocorreu um erro!!");
        setError(true);
      }
      setLoading(false);
    }
  }

  /////

  return (
    <>
      <ToastSuccess alertSuccess="Criado com sucesso!!" formSuccess={success} setFormSuccess={setSuccess} />
      <ToastError errorMessage={messageError} formError={error} setFormError={setError} />

      <TransitionsModal handleClose={handleClose} open={open} style={style}>
        {open && (
          <>
            <CloseModal handleClose={handleClose} />
            <LayoutUpdateOrder
              data={data}
              setFormValues={setFormValues}
              setCostumerId={setCostumer}
              loading={loading}
              confirmData={confirmData}
              handleClose={handleClose}
              costumer={costumer}
              setStatusId={setStatusId}
              typeForm={"createOs"}
            />
          </>
        )}
      </TransitionsModal>
    </>
  );
};
export default UpdateOrder;
