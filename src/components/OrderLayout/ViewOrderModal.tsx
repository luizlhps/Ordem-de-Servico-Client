import React, { useEffect, useState } from "react";
import {
  Typography,
  Stack,
  Box,
  useTheme,
  Button,
  useMediaQuery,
  Skeleton,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { AccordionList } from "@/components/AccordionList/AccordionList";
import { IOrder } from "../../../types/order";
import dayjs from "dayjs";
import { normalizePhoneNumber } from "@/utils/Masks";
import dynamic from "next/dynamic";

import CloseIcon from "@mui/icons-material/Close";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import NewTransation from "../FinanceLayout/NewTransaction";
import { InputTransactionOrderData } from "../../../types/finance";
import { DialogModalScroll } from "../Modal/DialogModalScroll";
import { configApplicationApi } from "@/services/configApplicationApi";
import { RootStore } from "../../../types/store";

const DownloadOrderPDF = dynamic(() => import("@/components/PdfFile/DownloadOrderPDF"), {
  loading: () => <>Loading...</>,
  ssr: false,
});

const style = {
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column" as "column",

  minHeight: "100%",
};

const styleOfModalNewTransaction = {
  padding: "33px",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column" as "column",
  alignContent: "center",
  alignItems: "center",
  minHeight: "100%",

  "@media (max-width:364px)": {
    padding: "23px",
  },
};

interface IProps {
  open: boolean;
  handleClose: () => void;
  selectedItem: IOrder | undefined;
}

export const ViewOrderModal: React.FC<IProps> = ({ open, handleClose, selectedItem }) => {
  const smallphoneMedia = useMediaQuery("(max-width:610px)");

  const [modalTransaction, setModalTransaction] = useState(false);
  const [inputTransactionOrderData, setInputTransactionOrderData] = useState<InputTransactionOrderData>();
  const [dataStore, setDataStore] = useState<RootStore>();

  const handleCloseNewTransaction = () => {
    setModalTransaction(false);
  };
  const handleOpenNewTransaction = () => {
    setModalTransaction(true);
  };

  useEffect(() => {
    if (selectedItem) {
      setInputTransactionOrderData({
        title: `Ordem de serviço #${selectedItem?.id}`,
        amount: selectedItem.amount,
        status: "finished",
        order: selectedItem._id,
        type: "credit",
      });
    }
  }, [selectedItem]);

  useEffect(() => {
    configApplicationApi
      .getInfoStore()
      .then((res) => {
        setDataStore(res.data);
      })
      .catch(() => {});
  }, []);

  const theme = useTheme();
  return (
    <>
      <NewTransation
        fetchApi={() => {}}
        handleClose={handleCloseNewTransaction}
        open={modalTransaction}
        style={styleOfModalNewTransaction}
        dataValue={inputTransactionOrderData}
      />

      <DialogModalScroll.Root fullheight handleClose={handleClose} open={open} style={style}>
        {!selectedItem ? ( // Renderiza o  skeleton enquanto estiver carregando
          <Skeleton variant="rectangular" height={40} />
        ) : (
          <>
            <DialogModalScroll.Title>
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Box>
                  <Typography variant="h2" fontWeight={600}>
                    OS #{selectedItem.id}
                  </Typography>
                  <Typography fontWeight={300}>Veja os detalhes da O.S</Typography>
                </Box>

                <Stack direction={"row"} gap={4}>
                  <Box flexDirection={"column"} display={"flex"}>
                    <Typography fontSize={14} fontWeight={300}>
                      Data de entrada
                    </Typography>
                    <Typography fontSize={14} fontWeight={300}>
                      {dayjs(selectedItem?.dateEntry).format("YYYY/MM/DD HH:mm:ss")}
                    </Typography>
                  </Box>
                  <Box flexDirection={"column"} display={"flex"}>
                    <Typography fontSize={14} fontWeight={300}>
                      Valor Total
                    </Typography>
                    <Typography fontSize={14} fontWeight={300}>
                      R$ {selectedItem?.totalAmount?.toFixed(2)}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </DialogModalScroll.Title>
            <DialogModalScroll.Content customStyle={{ paddingBottom: 5 }} dividers={true}>
              <Box width={"100%"}>
                <Stack width={"100%"} marginBottom={2}>
                  <Typography textTransform={"capitalize"}>Cliente: {selectedItem?.customer?.name}</Typography>
                  <Typography fontSize={14} fontWeight="300" marginBottom={2}>
                    {normalizePhoneNumber(selectedItem?.customer?.phone)}
                  </Typography>
                </Stack>

                <Stack spacing={3}>
                  <AccordionList
                    dafaultOpen={true}
                    icon="orders"
                    subTitle="Veja sobre o equipamento"
                    title="Equipamento"
                  >
                    <Stack direction={"row"} spacing={6}>
                      <Stack spacing={2}>
                        <Typography fontSize={14}>Equipamento</Typography>
                        <Typography fontSize={14}>Marca</Typography>
                        <Typography fontSize={14}>Modelo</Typography>
                      </Stack>
                      <Stack spacing={2}>
                        <Typography textTransform={"capitalize"} fontSize={14}>
                          {selectedItem?.equipment}
                        </Typography>
                        <Typography textTransform={"capitalize"} fontSize={14}>
                          {selectedItem?.brand}
                        </Typography>
                        <Typography textTransform={"capitalize"} fontSize={14}>
                          {selectedItem?.model}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Box marginTop={5}>
                      <Typography marginBottom={2} fontSize={14}>
                        Defeito
                      </Typography>
                      <Typography fontSize={14}>{selectedItem?.defect}</Typography>
                    </Box>
                    <Box marginTop={5}>
                      <Typography marginBottom={2} fontSize={14}>
                        Observação
                      </Typography>
                      <Typography fontSize={14}>{selectedItem?.observation}</Typography>
                    </Box>
                  </AccordionList>

                  {/* Items of service */}
                  <AccordionList
                    description={`${selectedItem?.services?.length} serviços`}
                    icon="services"
                    subTitle="Veja os serviços realizados"
                    title="Serviços"
                  >
                    {selectedItem?.services?.map((service, index) => {
                      return (
                        <React.Fragment key={index}>
                          <Stack direction={"row"} spacing={6}>
                            <Stack spacing={2}>
                              <Typography fontSize={14}>Serviço</Typography>
                              <Typography fontSize={14}>Valor</Typography>
                            </Stack>
                            <Stack spacing={2}>
                              <Typography fontSize={14}>{service?.title}</Typography>
                              <Typography fontSize={14}>R$ {service?.amount?.toFixed(2)}</Typography>
                            </Stack>
                          </Stack>
                          <Box marginTop={5} marginBottom={4}>
                            <Typography marginBottom={2} fontSize={14}>
                              Descrição
                            </Typography>
                            <Typography fontSize={14}>{service?.description}</Typography>
                          </Box>
                          {index !== selectedItem?.services?.length - 1 && (
                            <Box
                              marginTop={2}
                              marginBottom={2}
                              width={"100%"}
                              height={"1px"}
                              sx={{ color: theme.palette.custom?.grey, background: theme.palette.custom?.grey }}
                            />
                          )}
                        </React.Fragment>
                      );
                    })}
                  </AccordionList>

                  <AccordionList icon="technicalOpinion" subTitle="Veja o laudo" title="Laudo Técnico">
                    <Box>
                      <Typography marginBottom={2} fontSize={14}>
                        Laudo Técnico
                      </Typography>
                      <Typography fontSize={14}>{selectedItem?.technicalOpinion}</Typography>
                    </Box>
                  </AccordionList>
                </Stack>
              </Box>
              <Stack width={"100%"} alignItems={"center"}>
                <Stack
                  gap={1}
                  width={"100%"}
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"flex-end"}
                  flexWrap={"wrap"}
                >
                  <Stack direction={"row"} gap={4} marginTop={2}>
                    <Box flexDirection={"column"} display={"flex"}>
                      <Typography fontSize={14} fontWeight={300}>
                        Desconto
                      </Typography>
                      <Typography fontSize={14} fontWeight={300}>
                        Valor
                      </Typography>
                    </Box>
                    <Box flexDirection={"column"} display={"flex"}>
                      <Typography fontSize={14} fontWeight={300}>
                        R$ {selectedItem?.discount?.toFixed(2)}
                      </Typography>
                      <Typography fontSize={14} fontWeight={300}>
                        R$ {selectedItem?.amount?.toFixed(2)}
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack>
                    <Typography fontSize={14} fontWeight={300}>
                      Data de saída
                    </Typography>
                    <Typography fontSize={14} fontWeight={300}>
                      {selectedItem?.exitDate
                        ? dayjs(selectedItem?.exitDate).format("YYYY/MM/DD HH:mm:ss")
                        : "DD/MM/YYYY"}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </DialogModalScroll.Content>

            <DialogModalScroll.Footer customStyle={{ padding: 4 }}>
              <Stack flexDirection={"row"} flexWrap={"wrap"} gap={1} width={"100%"} justifyContent={"center"}>
                <Button
                  startIcon={<CloseIcon />}
                  onClick={handleClose}
                  sx={{ width: smallphoneMedia ? "100%" : 173 }}
                  variant="contained"
                >
                  Fechar
                </Button>

                {dataStore ? (
                  <DownloadOrderPDF
                    selectOrder={selectedItem}
                    dataStore={dataStore}
                    width={smallphoneMedia ? "100%" : 173}
                    height={"100%"}
                  >
                    <Button
                      color="error"
                      startIcon={<PictureAsPdfIcon />}
                      sx={{ width: smallphoneMedia ? "100%" : 173, height: "none" }}
                      variant="contained"
                    >
                      Imprimir PDF
                    </Button>
                  </DownloadOrderPDF>
                ) : (
                  <Button color="error" startIcon={<PictureAsPdfIcon />} variant="contained">
                    Carregando ...
                  </Button>
                )}

                <Button
                  startIcon={<AttachMoneyIcon />}
                  color="success"
                  onClick={handleOpenNewTransaction}
                  sx={{ width: smallphoneMedia ? "100%" : 173, color: "white" }}
                  variant="contained"
                >
                  Faturar
                </Button>
              </Stack>
            </DialogModalScroll.Footer>
          </>
        )}
      </DialogModalScroll.Root>
    </>
  );
};
