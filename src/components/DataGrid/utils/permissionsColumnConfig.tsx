import { GridColDef } from "@mui/x-data-grid";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { IconButton } from "@mui/material";

import { format } from "date-fns";
import { IUser } from "../../../../types/users";
import { normalizePhoneNumber } from "@/utils/Masks";
import { AuthGroup } from "../../../../types/authGroup";

export const permissionsColumnConfig = (
  theme: any,
  modalUpdateHandleOpen: () => void,
  setSelectedItemUpdate: React.Dispatch<React.SetStateAction<AuthGroup | undefined>>,
  modalDeleteHandleOpen: () => void,
  modalViewHandleOpen: () => void
) => {
  const handleRemove = async (data: AuthGroup) => {
    modalDeleteHandleOpen();
    setSelectedItemUpdate(data);
  };

  const handleUpdate = async (data: AuthGroup) => {
    modalUpdateHandleOpen();
    setSelectedItemUpdate(data);
  };

  const handleView = (data: AuthGroup) => {
    modalUpdateHandleOpen();
    setSelectedItemUpdate(data);
  };

  const columnConfig: GridColDef[] = [
    { field: "id", headerName: "OS", width: 100 },

    {
      field: "name",
      headerName: "Home",
      flex: 3,
      minWidth: 250,
      headerAlign: "left",
      align: "left",
    },

    {
      field: "actions",
      headerName: "Ações",
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
                handleView(params.row);
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
