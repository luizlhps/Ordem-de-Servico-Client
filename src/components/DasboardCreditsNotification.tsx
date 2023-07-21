import React, { ReactNode } from "react";
import { DashboardNotification } from "./FeatureFinanceNotification";
import KeyboardDoubleArrowUpOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowUpOutlined";

interface DashboardProps {
  ContentWidthValue: string;
  prevMonth: string;
  daysCurrent: number;
  creditAmount: string | undefined;
  month: string;
  year: string;
  IconDashBoardColor: string | undefined;
  subTitle: string | undefined;
  IconDashBoard: ReactNode;
}

export const DasboardCreditsNotification = ({
  ContentWidthValue,
  prevMonth,
  daysCurrent,
  month,
  year,
  creditAmount,
  IconDashBoardColor,
  subTitle,
  IconDashBoard,
}: DashboardProps) => {
  return (
    <DashboardNotification.Root contentWidthValue={ContentWidthValue}>
      <DashboardNotification.Header subTitle={`1 ${prevMonth} - ${daysCurrent} ${month} ${year}`} title="Faturamento">
        <DashboardNotification.Icon icon={KeyboardDoubleArrowUpOutlinedIcon} />
      </DashboardNotification.Header>
      <DashboardNotification.Content content={creditAmount} />
      <DashboardNotification.Footer color={IconDashBoardColor} icon={IconDashBoard} subTitle={subTitle ?? ""} />
    </DashboardNotification.Root>
  );
};
