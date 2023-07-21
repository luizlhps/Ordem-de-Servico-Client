import { useContext, useState } from "react";
import { FormRegisterCostumerContext } from "@/contexts";
import { LayoutOrderForm } from "./layoutOrderForm";
import { FormRegisterOrderContext } from "@/contexts/formRegisterOrderContext";
import { ToastSuccess } from "../Toast/ToastSuccess";
import { ToastError } from "../Toast/ToastError";
import TransitionsModal from "../Modal/Modal";
import { CloseModal } from "../Modal/financePage/FormCrudModals";
import { orderApi } from "@/services/api/orderApi";
import { IOrder } from "../../../types/order";

interface IPropsNewCostumer {
  handleClose: () => void;
}

const NewOrder = ({ handleClose }: IPropsNewCostumer) => {
  /*  const [loading, setLoading] = useState(false); */
  const [messageError, setMessageError] = useState("");
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const { confirmData, data, setFormValues, loading, setCostumer, costumer } = useContext(FormRegisterOrderContext);
  const ConfigContext = {
    confirmData,
    data,
    setFormValues,
    loading,
  };
  /* 
  const setFormValue = (form: IOrder) => {
    setLoading(true);
    createOrderApi(form);
  }; */

  /*  const createOrderApi = (data: IOrder) => {
    orderApi
      .createOrder(data, data.customer._id)
      .then(() => {
        fetchApi();
        setSuccess(true);
      })
      .catch((err) => {
        console.error(typeof err.request.response === "string" ? err.request.response : "Ocorreu um erro!!"),
          setMessageError(typeof err.request.response === "string" ? err.request.response : "Ocorreu um erro!!");
        setError(true);
      })
      .finally(() => {
        setLoading((item: any) => {
          return false;
        });
        handleClose();
      });
  }; */

  return (
    <>
      <ToastSuccess alertSuccess="Atualizado com sucesso!!" formSuccess={success} setFormSuccess={setSuccess} />
      <ToastError errorMessage={messageError} formError={error} setFormError={setError} />

      {/*     <TransitionsModal handleClose={handleClose} open={open} style={style}> */}
      <CloseModal handleClose={handleClose} />
      <LayoutOrderForm
        typeForm="createOs"
        ConfigContext={ConfigContext}
        handleClose={handleClose}
        setCostumerId={setCostumer}
        costumer={costumer}
      />
      {/* </TransitionsModal> */}
    </>
  );
};
export default NewOrder;
