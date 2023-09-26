import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import OrderPdf from "./OrderPdf";
import { IOrder } from "../../../types/order";
import { Box, Button } from "@mui/material";
import { ReactNode } from "react";

const DownloadOrderPDF = ({ selectOrder, children }: { selectOrder: IOrder; children: ReactNode }) => {
  return (
    <Box height={"100%"}>
      <PDFDownloadLink document={<OrderPdf selectOrder={selectOrder} />} fileName="somename.pdf">
        {({ blob, url, loading, error }) => (loading ? "Carregando documento..." : children)}
      </PDFDownloadLink>
    </Box>
  );
};

export default DownloadOrderPDF;
