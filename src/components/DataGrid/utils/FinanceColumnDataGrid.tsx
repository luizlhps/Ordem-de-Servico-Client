import { GridColDef } from "@mui/x-data-grid";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { IconButton } from "@mui/material";
import dayjs from "dayjs";
import { IFinance } from "../../../../types/finance";

import { format } from "date-fns";

export const financeColumnDataGrid = (
  theme: any,
  modalUpdateHandleOpen: () => void,
  setSelectedItemUpdate: React.Dispatch<React.SetStateAction<IFinance | undefined>>,
  modalDeleteHandleOpen: () => void,
  modalViewHandleOpen: () => void
) => {
  const handleRemove = async (data: any) => {
    modalDeleteHandleOpen();
    setSelectedItemUpdate(data);
  };

  const handleUpdate = async (data: any) => {
    modalUpdateHandleOpen();
    setSelectedItemUpdate(data);
  };

  const columnConfig: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "title",
      headerName: "Título",
      flex: 1,
      minWidth: 200,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "type",
      headerName: "Tipo",
      flex: 0.5,
      minWidth: 100,
      headerAlign: "left",
      align: "left",
      valueFormatter: (params) => {
        const value = params.value;
        if (value === "credit") return "Crédito";
        if (value === "debit") return "Debito";
      },
    },
    {
      field: "description",
      headerName: "Descrição",
      flex: 2,
      minWidth: 200,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "amount",
      headerName: "Valor",
      flex: 0.5,
      minWidth: 140,
      description: "Contato",
      headerAlign: "left",
      align: "left",
      valueFormatter: (params) => {
        const value = params.value.toString();
        if (typeof value === "string") {
          const formattedValue = value;
          return Number(formattedValue).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
        }
        return value;
      },
    },
    {
      field: "entryDate",
      headerName: "Criado em",
      type: "number",
      flex: 1,
      minWidth: 120,
      description: "Endereço",
      headerAlign: "left",
      align: "left",
      valueFormatter(params: any) {
        if (params.value) {
          const dataFormatada = format(new Date(params.value), "dd/MM/yyyy");
          return dataFormatada;
        }
        return;
      },
    },
    {
      field: "dueDate",
      headerName: "Vencimento",
      flex: 1,
      minWidth: 120,
      description: "Endereço",
      headerAlign: "left",
      align: "left",
      valueFormatter(params: any) {
        if (params.value) {
          const dataFormatada = format(new Date(params.value), "dd/MM/yyyy");
          return dataFormatada;
        }
        return;
      },
    },
    {
      field: "payDay",
      headerName: "Data de pagamento",
      flex: 1,
      minWidth: 200,
      description: "Endereço",
      headerAlign: "left",
      align: "left",
      valueFormatter(params: any) {
        if (params.value) {
          const dataFormatada = format(new Date(params.value), "dd/MM/yyyy");
          return dataFormatada;
        }
        return;
      },
    },
    {
      field: "status",
      headerName: "Status",
      type: "number",
      flex: 1,
      minWidth: 100,
      description: "Endereço",
      headerAlign: "left",
      align: "left",
      valueFormatter: (params) => {
        const value = params.value;
        if (value === "finished") return "Finalizado";
        if (value === "open") return "Aberto";
      },
    },

    {
      field: "actions",
      headerName: "Status",
      description: "Ações",
      flex: 1,
      minWidth: 150,
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
