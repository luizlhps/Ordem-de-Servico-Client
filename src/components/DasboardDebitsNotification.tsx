import React, { ReactNode } from "react";
import { DashboardNotification } from "./FeatureFinanceNotification";
import KeyboardDoubleArrowDownOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowDownOutlined";

interface DashboardProps {
  ContentWidthValue: string;
  prevMonth: string;
  daysCurrent: number;
  debitAmount: string | undefined;
  month: string;
  year: string;
  IconDashBoardColor: string | undefined;
  subTitle: string | undefined;
  IconDashBoard: ReactNode;
}

export const DasboardDebitsNotification = ({
  ContentWidthValue,
  prevMonth,
  daysCurrent,
  month,
  year,
  debitAmount,
  IconDashBoardColor,
  subTitle,
  IconDashBoard,
}: DashboardProps) => {
  return (
    <DashboardNotification.Root contentWidthValue={ContentWidthValue}>
      <DashboardNotification.Header subTitle={`1 ${prevMonth} - ${daysCurrent} ${month} ${year}`} title="Dividas">
        <DashboardNotification.Icon icon={KeyboardDoubleArrowDownOutlinedIcon} />
      </DashboardNotification.Header>
      <DashboardNotification.Content content={debitAmount} />
      <DashboardNotification.Footer color={IconDashBoardColor} icon={IconDashBoard} subTitle={subTitle ?? ""} />
    </DashboardNotification.Root>
  );
};
