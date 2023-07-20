import React, { ElementType, ReactNode } from "react";
import { DashboardNotification } from "./FeatureFinanceNotification";

interface DashboardProps {
  ContentWidthValue: string;
  prevMonth: string;
  daysCurrent: number;
  month: string;
  year: string;
  AccountBalanceWalletOutlinedIcon: ElementType;
  balanceTotalAmount: string | undefined;
  IconDashBoardColor: string | undefined;
  subTitle: string | undefined;
  IconDashBoard: ReactNode;
}

export const DashboardBalanceNotification = ({
  ContentWidthValue,
  prevMonth,
  daysCurrent,
  month,
  year,
  AccountBalanceWalletOutlinedIcon,
  balanceTotalAmount,
  IconDashBoardColor,
  subTitle,
  IconDashBoard,
}: DashboardProps) => {
  return (
    <DashboardNotification.Root contentWidthValue={ContentWidthValue}>
      <DashboardNotification.Header subTitle={`1 ${prevMonth} - ${daysCurrent} ${month} ${year}`} title="Caixa Total">
        <DashboardNotification.Icon icon={AccountBalanceWalletOutlinedIcon} />
      </DashboardNotification.Header>
      <DashboardNotification.Content content={balanceTotalAmount} />
      <DashboardNotification.Footer color={IconDashBoardColor} icon={IconDashBoard} subTitle={subTitle ?? ""} />
    </DashboardNotification.Root>
  );
};
