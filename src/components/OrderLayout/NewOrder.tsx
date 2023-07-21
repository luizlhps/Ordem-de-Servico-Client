import { CSSProperties, useContext, useState } from "react";
import { LayoutOrderForm } from "./layoutOrderForm";
import { FormRegisterOrderContext } from "@/contexts/formRegisterOrderContext";
import { ToastSuccess } from "../Toast/ToastSuccess";
import { ToastError } from "../Toast/ToastError";
import TransitionsModal from "../Modal/Modal";
import { CloseModal } from "../Modal/financePage/FormCrudModals";
import { ICustomerAndOrderData } from "@/contexts";
import { LayoutCreateOs } from "./LayoutCreateOs";

interface IPropsNewCostumer {
  handleClose: () => void;
  fetchApi: () => void;
  style: CSSProperties;
  open: boolean;
}

const NewOrder = ({ handleClose, fetchApi, style, open }: IPropsNewCostumer) => {
  /*  const [loading, setLoading] = useState(false); */
  const [messageError, setMessageError] = useState("");
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<ICustomerAndOrderData | undefined>(undefined);

  const { confirmData, loading, setCostumer, costumer } = useContext(FormRegisterOrderContext);

  const setFormValues = (values: any) => {
    setData((prevValues) => ({
      ...prevValues,
      ...values,
    }));
  };

  const ConfigContext = {
    confirmData,
    data,
    setFormValues,
    loading,
  };

  return (
    <>
      <ToastSuccess alertSuccess="Atualizado com sucesso!!" formSuccess={success} setFormSuccess={setSuccess} />
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
