import { CSSProperties, useContext, useState } from "react";
import { ICustomerAndOrderData } from "@/contexts";
import { FormUpdateOrderContext } from "@/contexts/formUpdateOrderContext";
import { ToastSuccess } from "../Toast/ToastSuccess";
import { ToastError } from "../Toast/ToastError";
import TransitionsModal from "../Modal/Modal";
import { CloseModal } from "../Modal/financePage/FormCrudModals";
import { LayoutUpdateOrder } from "./LayoutUpdateOrder";

interface IPropsUpdateCostumer {
  handleClose: () => void;
  fetchApi: () => void;
  style: CSSProperties;
  open: boolean;
}

const UpdateOrder = ({ handleClose, fetchApi, style, open }: IPropsUpdateCostumer) => {
  const [messageError, setMessageError] = useState("");
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  /*   const [data, setData] = useState<ICustomerAndOrderData | undefined>(undefined); */

  const { confirmData, data, setFormValues, loading, setCostumer, costumer } = useContext(FormUpdateOrderContext);

  return (
    <>
      <ToastSuccess alertSuccess="Criado com sucesso!!" formSuccess={success} setFormSuccess={setSuccess} />
      <ToastError errorMessage={messageError} formError={error} setFormError={setError} />

      <TransitionsModal handleClose={handleClose} open={open} style={style}>
        <CloseModal handleClose={handleClose} />
        <LayoutUpdateOrder
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
export default UpdateOrder;
