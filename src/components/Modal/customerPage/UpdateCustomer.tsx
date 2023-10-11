import { CSSProperties, useEffect, useState } from "react";
import { Icon, IconButton } from "@mui/material";
import { customersApi } from "@/services/api/customersApi";
import TransitionsModal from "../Modal";
import { ToastSuccess } from "@/components/Toast/ToastSuccess";
import { ToastError } from "@/components/Toast/ToastError";
import { ICustomerAndOrderData } from "../../../../types/formOrderCustomer";
import { LayoutUpdateCustomer } from "@/components/CustomerPage/LayoutUpdateCustomer";

interface IProps {
  handleClose: () => void;
  fetchApi: () => void;
  styles: CSSProperties;
  open: boolean;
  selectItem: any | undefined;
}

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

const UpdateCustomer = ({ handleClose, fetchApi, styles, open, selectItem }: IProps) => {
  /* const { confirmData, data, setFormValues, loading } = useContext(formUpdateCustomerContext);  */

  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<ICustomerAndOrderData | undefined>(undefined);

  useEffect(() => {
    if (selectItem.address && selectItem.address.length > 0) {
      const form = {
        name: selectItem.name,
        email: selectItem.email,
        contact: selectItem.contact,
        cpfOrCnpj: selectItem.cpfOrCnpj,
        phone: selectItem.phone,
        tel: selectItem.tel,
        address: [
          {
            cep: selectItem?.address[0].cep,
            state: selectItem.address[0].state,
            neighborhood: selectItem.address[0].neighborhood,
            street: selectItem.address[0].street,
            city: selectItem.address[0].city,
            number: selectItem.address[0].number,
            complement: selectItem.address[0].complement,
          },
        ],

        //Andress
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
    async function customer(data: any, _id: string | string[]) {
      setLoading(true);
      try {
        const res = await customersApi.updateCustomer(data, _id);

        if (res instanceof Error) {
          throw new Error("Ocorreu um erro");
        }

        setSuccess(true);
      } catch (error: any) {
        setSuccess(false);
        console.error(error);
        setMessageError(error.response.data.message); //
      } finally {
        setLoading(false);
        fetchApi();
        handleClose();
      }
    }

    customer(data, selectItem._id);
  }

  return (
    <>
      <ToastSuccess alertSuccess="Criado com sucesso!!" formSuccess={success} setFormSuccess={setSuccess} />
      <ToastError errorMessage={messageError} formError={error} setFormError={setError} />

      <TransitionsModal handleClose={handleClose} open={open} style={styles}>
        <IconButton onClick={handleClose} sx={buttonStyle}>
          <Icon>close</Icon>
        </IconButton>
        <LayoutUpdateCustomer
          typeForm={"updateCustomer"}
          confirmData={confirmData}
          handleClose={handleClose}
          data={data}
          loading={loading}
          setFormValues={setFormValues}
        />
      </TransitionsModal>
    </>
  );
};
export default UpdateCustomer;
