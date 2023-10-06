import React, { useEffect, useState } from "react";
import { Page, View, Text, Document, StyleSheet, Image, Font } from "@react-pdf/renderer";
import { IOrder } from "../../../types/order";
import { RootStore } from "../../../types/store";
import { normalizePhoneNumber } from "@/utils/Masks";

export default function OrderPdf({
  selectOrder,
  dataStore,
}: {
  selectOrder: IOrder;
  dataStore: RootStore | undefined;
}) {
  Font.register({
    family: "Open Sans",
    fonts: [
      { src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf" },
      { src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf", fontWeight: 600 },
    ],
  });

  const styles = StyleSheet.create({
    body: {
      paddingTop: 25,
      paddingBottom: 45,
      paddingHorizontal: 35,
      fontFamily: "Open Sans",
    },
    title: {
      fontSize: 14,
      textAlign: "center",
      marginBottom: 15,
      color: "grey",
      fontWeight: "bold",
    },
    subtitle: {
      fontSize: 10,
      textAlign: "justify",
      fontWeight: "bold",
    },

    text: {
      fontSize: 10,
      marginBottom: 1,
      flexWrap: "wrap",
      textAlign: "justify",
    },
    business: {
      marginBottom: 2,
      fontWeight: "bold",
      fontSize: 14,
      textAlign: "justify",
    },

    image: {
      width: "120px",
      height: "80px",
      objectFit: "cover",
    },
    header: {
      fontSize: 12,
      textAlign: "center",
      color: "grey",
    },
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      flexDirection: "row",
      borderColor: "grey",
      borderStyle: "solid",
      borderBottomWidth: 1,
      paddingBottom: 15,
      marginBottom: 15,
    },

    itemsList: {
      flex: 1,
    },
    footerList: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      textAlign: "center",
    },

    budgetList: {
      flex: 1,
      display: "flex",
      alignItems: "center",
    },

    contentList: {
      display: "flex",
      flexDirection: "row",
    },
    contentInformationEquipment: {
      display: "flex",
      flexDirection: "row",
      width: 120,
    },
  });

  const allServices = () => {
    const values = selectOrder?.servicesPrices
      .map((val) => {
        return val.title;
      })
      .join(", ");

    return values;
  };

  return (
    <>
      <Document>
        <Page style={styles.body}>
          <Text style={styles.title}>REGISTRO DE ORDEM DE SERVIÇO #{selectOrder.id}</Text>
          <Text style={{ textAlign: "center" }}></Text>
          <View style={styles.container}>
            <Image
              src="https://storage.googleapis.com/loustech-site.appspot.com/storeAvatar/e727803fca84000c2f6a94461f22fbc4-avatar.jpeg"
              style={styles.image}
            />
            <View>
              <Text style={styles.business}>{dataStore?.name}</Text>
              <Text style={styles.text}>
                {`Endereço:${dataStore?.address.street}, n°${dataStore?.address.number}, ${dataStore?.address.neighborhood}`}
              </Text>
              <Text style={styles.text}>{`${dataStore?.address.city} - ${dataStore?.address.cep}`}</Text>
              <Text style={styles.text}>{`Celular ${normalizePhoneNumber(dataStore?.phone)}`} </Text>
            </View>
          </View>

          <View id="customer">
            <Text style={styles.title}>DADOS DO CLIENTE</Text>
            <View style={styles.container}>
              <View style={styles.itemsList}>
                <View style={styles.contentList}>
                  <Text style={styles.subtitle}>Nome:</Text>
                  <Text style={styles.text}> {selectOrder.customer.name} </Text>
                </View>
                <View style={styles.contentList}>
                  <Text style={styles.subtitle}>Endereço:</Text>
                  <Text style={styles.text}>{selectOrder.customer.address[0].street}</Text>
                </View>
                <View style={styles.contentList}>
                  <Text style={styles.subtitle}>Cidade:</Text>
                  <Text style={styles.text}> {selectOrder.customer.address[0].city} </Text>
                </View>
                <View style={styles.contentList}>
                  <Text style={styles.subtitle}>Celular:</Text>
                  <Text style={styles.text}> {selectOrder.customer.phone} </Text>
                </View>
              </View>

              <View style={styles.itemsList}>
                <View style={styles.contentList}>
                  <Text style={styles.subtitle}>CPF/CNPJ:</Text>
                  <Text style={styles.text}> {selectOrder.customer.cpfOrCnpj} </Text>
                </View>
                <View style={styles.contentList}>
                  <Text style={styles.subtitle}>Bairro:</Text>
                  <Text style={styles.text}> {selectOrder.customer.address[0].neighborhood} </Text>
                </View>
                <View style={styles.contentList}>
                  <Text style={styles.subtitle}>Cep:</Text>
                  <Text style={styles.text}> {selectOrder.customer.address[0].cep} </Text>
                </View>
                <View style={styles.contentList}>
                  <Text style={styles.subtitle}>Email:</Text>
                  <Text style={styles.text}> {selectOrder.customer.email} </Text>
                </View>
              </View>
            </View>
          </View>

          <Text style={styles.title}>INFORMAÇÕES DO EQUIPAMENTO</Text>
          <View style={styles.container}>
            <View style={styles.itemsList}>
              <View style={styles.contentInformationEquipment}>
                <Text style={styles.subtitle}>Marca:</Text>
                <Text style={styles.text}> {selectOrder.model} </Text>
              </View>
            </View>

            <View style={styles.itemsList}>
              <View style={styles.contentInformationEquipment}>
                <Text style={styles.subtitle}>Modelo:</Text>
                <Text style={styles.text}> {selectOrder.brand} </Text>
              </View>
            </View>

            <View style={styles.itemsList}>
              <View style={styles.contentInformationEquipment}>
                <Text style={styles.subtitle}>Equipamento: </Text>
                <Text style={styles.text}> {selectOrder.equipment} </Text>
              </View>
            </View>
          </View>

          <View id="problem">
            <Text style={styles.title}>RELATO DO CLIENTE</Text>
            <View style={styles.container}>
              <View>
                <Text style={styles.text}> {selectOrder.defect} </Text>
                <View>
                  <View style={{ display: "flex", flexDirection: "row", marginTop: 5 }}>
                    <Text style={styles.subtitle}>Observação:</Text>
                    <View style={{ width: "89%" }}>
                      <Text style={styles.text}> {selectOrder.observation} </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View id="diagnostic">
            <Text style={styles.title}>DIAGNÓSTICO E SERVIÇO A SER PRESTADO</Text>
            <View style={styles.container}>
              <View>
                <Text style={styles.text}>{selectOrder.technicalOpinion}</Text>
                <View>
                  <View style={{ display: "flex", flexDirection: "row", marginTop: 5 }}>
                    <Text style={styles.subtitle}>Serviços:</Text>
                    <View style={{ width: "92%" }}>
                      <Text style={styles.text}>{allServices()}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View id="budgetList">
              <Text style={styles.title}>Orçamento</Text>
              <View style={styles.contentList}>
                <View style={styles.budgetList}>
                  <View style={styles.contentList}>
                    <Text style={styles.subtitle}>Valor dos Serviços:</Text>
                    <Text style={styles.text}> R${selectOrder.amount.toFixed(2)}</Text>
                  </View>
                  <View style={styles.contentList}>
                    <Text style={styles.subtitle}>Valor Total:</Text>
                    <Text style={styles.text}> R${selectOrder.totalAmount.toFixed(2)} </Text>
                  </View>
                </View>

                <View style={styles.budgetList}>
                  <View style={styles.contentList}>
                    <Text style={styles.subtitle}>Desconto:</Text>
                    <Text style={styles.text}> R${selectOrder.discount.toFixed(2)} </Text>
                  </View>
                  <View style={styles.contentList}>
                    <Text style={styles.subtitle}></Text>
                    <Text style={styles.text}></Text>
                  </View>
                </View>
              </View>
            </View>

            <View
              id="footer"
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 25,
              }}
            >
              <View style={styles.footerList}>
                <Text style={styles.text}>----------------------------------------</Text>
                <Text style={styles.text}>Assinatura do cliente</Text>
              </View>
              <View style={styles.footerList}>
                <Text style={styles.text}>----------------------------------------</Text>
                <Text style={styles.text}>Assinatura do Técnico </Text>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </>
  );
}
