import { CSSProperties, useContext, useEffect, useState } from "react";
import { ToastSuccess } from "../Toast/ToastSuccess";
import { ToastError } from "../Toast/ToastError";
import TransitionsModal from "../Modal/Modal";
import { CloseModal } from "../Modal/financePage/FormCrudModals";
import { LayoutUpdateOrder } from "./LayoutUpdateOrder";
import { IOrder } from "../../../types/order";
import { IDetailsStatus, statusApi } from "@/services/api/statusApi";
import { orderApi } from "@/services/api/orderApi";
import { IStatus } from "../ServicesPage/Status";
import { ICustomer } from "../../../types/customer";
import { DialogModalScroll } from "../Modal/DialogModalScroll";

interface IProps {
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

const UpdateOrder = ({ handleClose, fetchApi, style, open, selectItem }: IProps) => {
  const [messageError, setMessageError] = useState("");
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const [data, setData] = useState<ICustomerAndOrder | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [customer, setCustomer] = useState<ICustomer | undefined>();
  const [statusId, setStatusId] = useState<IStatus | undefined>();

  const selectItemId = selectItem?._id;

  useEffect(() => {
    //put all the data when openning the modal
    if (selectItem) {
      const form = {
        equipment: selectItem?.equipment,
        defect: selectItem?.defect,
        observation: selectItem?.observation,
        dateEntry: selectItem?.dateEntry,
        status: selectItem?.status?.name,
        brand: selectItem?.brand,
        model: selectItem?.model,

        phone: selectItem?.customer?.phone,
        name: selectItem?.customer?._id,
        customer: selectItem?.customer?.name,
        services: selectItem.services ? selectItem.services : undefined,
        discount: selectItem?.discount,
        exitDate: selectItem?.exitDate,
        technicalOpinion: selectItem?.technicalOpinion,
      };
      //put data of customer case the usestate don't have data and case select is different of the customer the setState
      if (!customer || customer?.name !== selectItem?.customer?.name) setCustomer(selectItem?.customer);

      setData((prevValues: any) => ({
        ...prevValues,
        ...form,
      }));
    }
  }, [selectItem, handleClose]);

  const setFormValues = (values: any) => {
    setData((prevValues) => ({
      ...prevValues,
      ...values,
    }));
  };

  function confirmData() {
    if (customer) updateOrder(data, customer._id);

    async function updateOrder(data: any, customer: string) {
      console.log(data);

      try {
        const statusAndCustomerUpdateId = async () => {
          const updateStatusAndCustomer = { ...data, status: statusId, customer: customer };
          return updateStatusAndCustomer;
        };

        if (selectItemId) {
          await orderApi.updateOrder(await statusAndCustomerUpdateId(), selectItemId);
        } else {
          throw new Error("ohoho");
        }
        setSuccess(true);
        fetchApi();
      } catch (err: any) {
        setMessageError(typeof err.request.response === "string" ? err.request.response : "Ocorreu um erro!!");
        setError(true);
      }
      handleClose();
      setLoading(false);
    }
  }

  return (
    <>
      <ToastSuccess alertSuccess="Criado com sucesso!!" formSuccess={success} setFormSuccess={setSuccess} />
      <ToastError errorMessage={messageError} formError={error} setFormError={setError} />

      <DialogModalScroll.Root handleClose={handleClose} open={open} style={style}>
        {open && (
          <>
            <CloseModal handleClose={handleClose} />
            <LayoutUpdateOrder
              data={data}
              setFormValues={setFormValues}
              setCustomerId={setCustomer}
              loading={loading}
              confirmData={confirmData}
              handleClose={handleClose}
              customer={customer}
              setStatusId={setStatusId}
              typeForm={"createOs"}
            />
          </>
        )}
      </DialogModalScroll.Root>
    </>
  );
};
export default UpdateOrder;
