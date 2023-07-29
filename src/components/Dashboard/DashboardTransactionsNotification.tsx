import React, { ReactNode } from "react";
import { DashboardNotification } from "../FeatureFinanceNotification";

interface DashboardProps {
  contentWidthValue: string;
  transactionsPending: number | undefined;
  iconDashBoardColor: string | undefined;
  iconDashBoard: ReactNode;
  subTitle: string | undefined;
}

export const DashboardTransactionsNotification = ({
  contentWidthValue,
  transactionsPending,
  iconDashBoardColor,
  subTitle,
  iconDashBoard,
}: DashboardProps) => {
  return (
    <DashboardNotification.Root contentWidthValue={contentWidthValue}>
      <DashboardNotification.Header subTitle="Abertas" title="Transações"></DashboardNotification.Header>
      <DashboardNotification.Content content={`${transactionsPending} Transações`} />
      <DashboardNotification.Footer color={iconDashBoardColor} icon={iconDashBoard} subTitle={subTitle ?? ""} />
    </DashboardNotification.Root>
  );
};
