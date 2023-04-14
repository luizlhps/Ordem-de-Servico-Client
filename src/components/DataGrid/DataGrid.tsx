import React, { useState, useEffect } from "react";

//Material Ui
import { Box } from "@mui/material";
import {
  DataGrid,
  gridPageCountSelector,
  GridPagination,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import MuiPagination from "@mui/material/Pagination";
import { TablePaginationProps } from "@mui/material/TablePagination";

//interface

interface PropsDataGrid {
  rows: any;
  columns: any;
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
export const DataGridLayout: React.FC<PropsDataGrid> = ({ rows, columns }) => {
  return (
    <Box sx={{ height: "67vh", width: "100%", marginTop: 3 }}>
      <DataGrid
        sx={{
          "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
            outline: "none !important",
          },
        }}
        rows={rows}
        slots={{
          pagination: CustomPagination,
        }}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 9 } },
        }}
        pageSizeOptions={[9]}
      />
    </Box>
  );
};
