import { GridColDef } from "@mui/x-data-grid";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { IconButton } from "@mui/material";
import { useRouter } from "next/router";
import { OrdensSVG } from "../../../../../public/icon/SVGS/IconsSVG";

import { format } from "date-fns";
import { cpfOrCnpj, normalizePhoneNumber } from "@/utils/Masks";

export const ColumnsDataGrid = (
  theme: any,
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>,
  modalDeleteHandleOpen: () => void,
  modalUpdateHandleOpen: () => void
) => {
  const router = useRouter();

  const handleRemove = async (data: any) => {
    modalDeleteHandleOpen();
    setSelectedItem(data);
  };

  const handleUpdate = async (data: any) => {
    modalUpdateHandleOpen();
    setSelectedItem(data);
  };
  const handleViewOrders = async (data: any) => {
    router.push(`/customer/${data._id}`);
    setSelectedItem(data);
  };

  const columnConfig: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "name",
      headerName: "Nome",
      flex: 1,
      minWidth: 200,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Celular",
      flex: 2,
      minWidth: 200,
      headerAlign: "left",
      align: "left",
      valueFormatter(params: any) {
        if (params?.value) {
          const phoneFormatted = normalizePhoneNumber(params.value);
          return phoneFormatted;
        }
      },
    },
    {
      field: "cpfOrCnpj",
      headerName: "CPF/CNPJ",
      flex: 1.2,
      minWidth: 150,
      description: "Contato",
      headerAlign: "left",
      align: "left",
      valueFormatter(params: any) {
        if (params?.value) {
          const phoneFormatted = cpfOrCnpj(params.value);
          return phoneFormatted;
        }
      },
    },
    {
      field: "createdAt",
      headerName: "Criado em",
      type: "number",
      flex: 1,
      minWidth: 200,
      description: "Endereço",
      headerAlign: "left",
      align: "left",
      valueFormatter(params: any) {
        if (params?.value) {
          const dataFormatada = format(new Date(params.value), "dd/MM/yyyy HH:mm:ss");
          return dataFormatada;
        }
      },
    },
    {
      field: "updatedAt",
      headerName: "Atualizado em",
      type: "number",
      flex: 1,
      minWidth: 200,
      description: "Endereço",
      headerAlign: "left",
      align: "left",
      valueFormatter(params: any) {
        if (params?.value) {
          const dataFormatada = format(new Date(params.value), "dd/MM/yyyy HH:mm:ss");
          return dataFormatada;
        }
      },
    },

    {
      field: "actions",
      headerName: "Ações",
      description: "Status",
      flex: 1,
      minWidth: 190,
      headerAlign: "right",
      align: "right",
      renderCell: (params) => {
        return (
          <div
            style={{
              color: theme.palette.primary.main,
              justifyContent: "center",
              alignItems: "center",
              verticalAlign: "right",
            }}
          >
            <IconButton
              onClick={() => {
                handleUpdate(params.row);
              }}
            >
              <RemoveRedEyeOutlinedIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                handleViewOrders(params.row);
              }}
            >
              <OrdensSVG color={theme.palette.primary.main} />
            </IconButton>

            <IconButton
              onClick={() => {
                handleUpdate(params.row);
              }}
            >
              <ModeOutlinedIcon />
            </IconButton>

            <IconButton onClick={() => handleRemove(params.row)}>
              <CloseRoundedIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];
  return columnConfig;
};
