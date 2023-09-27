import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import OrderPdf from "./OrderPdf";
import { IOrder } from "../../../types/order";
import { Box, Button } from "@mui/material";
import { ReactNode } from "react";

const DownloadOrderPDF = ({
  selectOrder,
  children,
  width,
  height,
}: {
  selectOrder: IOrder;
  children: ReactNode;
  width: number | string;
  height: number | string;
}) => {
  return (
    <Box height={height} width={width}>
      <PDFDownloadLink document={<OrderPdf selectOrder={selectOrder} />} fileName="somename.pdf">
        {({ blob, url, loading, error }) => (loading ? "Carregando documento..." : children)}
      </PDFDownloadLink>
    </Box>
  );
};

export default DownloadOrderPDF;
