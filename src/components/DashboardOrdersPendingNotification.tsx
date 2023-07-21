import React, { ReactNode } from "react";
import { DashboardNotification } from "./FeatureFinanceNotification";

interface DashboardProps {
  contentWidthValue: string;
  ordersPending: number | undefined;
  iconDashBoardColor: string | undefined;
  iconDashBoard: ReactNode;
  subTitle: string | undefined;
}

export const DashboardOrdersPendingNotification = ({
  contentWidthValue,
  ordersPending,
  iconDashBoardColor,
  subTitle,
  iconDashBoard,
}: DashboardProps) => {
  return (
    <DashboardNotification.Root contentWidthValue={contentWidthValue}>
      <DashboardNotification.Header subTitle="Ordens de Serviço" title="O.S Pendentes"></DashboardNotification.Header>
      <DashboardNotification.Content content={`${ordersPending} O.S Pendents`} />
      <DashboardNotification.Footer color={iconDashBoardColor} icon={iconDashBoard} subTitle={subTitle ?? ""} />
    </DashboardNotification.Root>
  );
};
