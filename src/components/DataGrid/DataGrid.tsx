import React, { useState, useEffect } from "react";

//Material Ui
import { Box } from "@mui/material";
import {
  DataGrid,
  gridPageCountSelector,
  GridPagination,
  useGridApiContext,
  useGridSelector,
  nlNL,
} from "@mui/x-data-grid";
import MuiPagination from "@mui/material/Pagination";
import { TablePaginationProps } from "@mui/material/TablePagination";
import LinearProgress from "@mui/material/LinearProgress";
//interface

interface PropsDataGrid {
  rows: any;
  columns: any;
  PageSize: number;
}

//Config Pagination
function CustomPagination(props: any) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}

function Pagination({
  page,
  onPageChange,
  className,
}: Pick<TablePaginationProps, "page" | "onPageChange" | "className">) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      color="primary"
      className={className}
      count={pageCount}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event as any, newPage - 1);
      }}
    />
  );
}

//Code
export const DataGridLayout: React.FC<PropsDataGrid> = ({ rows, columns, PageSize }) => {
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
        rows={rows}
        slots={{
          pagination: CustomPagination,
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
