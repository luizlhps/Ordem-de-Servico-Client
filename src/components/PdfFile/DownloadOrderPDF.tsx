import { PDFViewer, PDFDownloadLink, usePDF } from "@react-pdf/renderer";
import OrderPdf from "./OrderPdf";
import { IOrder } from "../../../types/order";
import { Box, Button } from "@mui/material";
import { ReactElement, ReactNode, cloneElement } from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const DownloadOrderPDF = ({
  selectOrder,
  children,
  width,
  height,
}: {
  selectOrder: IOrder;
  children: ReactElement;
  width: number | string;
  height: number | string;
}) => {
  const [instance, updateInstance] = usePDF({ document: <OrderPdf selectOrder={selectOrder} /> });

  if (instance.loading)
    return (
      <Button color="error" startIcon={<PictureAsPdfIcon />} variant="contained">
        Carregando ...
      </Button>
    );

  if (instance.error) return <div>Something went wrong: {instance.error}</div>;

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
