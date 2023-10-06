import { PDFViewer, PDFDownloadLink, usePDF } from "@react-pdf/renderer";
import OrderPdf from "./OrderPdf";
import { IOrder } from "../../../types/order";
import { Box, Button } from "@mui/material";
import { ReactElement, ReactNode, cloneElement, useEffect, useState } from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { configApplicationApi } from "@/services/configApplicationApi";
import { RootStore } from "../../../types/store";

const DownloadOrderPDF = ({
  selectOrder,
  children,
  width,
  height,
  dataStore,
}: {
  selectOrder: IOrder;
  children: ReactElement;
  width: number | string;
  height: number | string;
  dataStore: RootStore;
}) => {
  const [instance, updateInstance] = usePDF({ document: <OrderPdf selectOrder={selectOrder} dataStore={dataStore} /> });

  if (instance.loading)
    return (
      <Button color="error" startIcon={<PictureAsPdfIcon />} variant="contained">
        Carregando ...
      </Button>
    );

  if (instance.error) return <div>Algo deu errado {instance.error}</div>;

  const clonedChild = cloneElement(children, {
    rel: "noopener noreferrer",
    target: "_blank",
    href: instance.url,
  });

  return (
    <Box height={height} width={width}>
      {clonedChild}
    </Box>
  );
};

export default DownloadOrderPDF;
