import React from "react";

//Material Ui
import { Box } from "@mui/material";
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import LinearProgress from "@mui/material/LinearProgress";
import Pagination from "@mui/material/Pagination";
//interface

interface PropsDataGrid {
  rows: any;
  columns: any;
  PageSize: number;
  totalCount: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
}
interface PropsCustomPagination {
  PageSize: number;
  totalCount: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
}

//Config Pagination
export function CustomPagination({ totalCount, PageSize, currentPage, setCurrentPage }: PropsCustomPagination) {
  const apiRef = useGridApiContext();
  const pageTotalCount = totalCount / PageSize;

  return (
    <Pagination
      color="primary"
      count={Math.ceil(pageTotalCount)}
      page={currentPage}
      onChange={(event, value) => {
        event as any, setCurrentPage(value - 1);
      }}
    />
  );
}

//Code
export const DataGridLayout: React.FC<PropsDataGrid> = ({
  rows,
  columns,
  PageSize,
  totalCount,
  setCurrentPage,
  currentPage,
}) => {
  return (
    <Box sx={{ width: "100%", marginTop: 3 }}>
      <DataGrid
        disableRowSelectionOnClick
        autoHeight={true}
        sx={{
          "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
            outline: "none !important",
          },
        }}
        rows={rows ? rows : []}
        slots={{
          pagination: () => (
            <CustomPagination
              totalCount={totalCount}
              PageSize={PageSize}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          ),
          loadingOverlay: LinearProgress,
        }}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: PageSize } },
          sorting: {
            sortModel: [{ field: "id", sort: "desc" }],
          },
        }}
        pageSizeOptions={[PageSize]}
      />
    </Box>
  );
};
