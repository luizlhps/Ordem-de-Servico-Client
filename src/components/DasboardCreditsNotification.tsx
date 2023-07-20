import React from "react";

function DasboardCreditsNotification({
  ContentWidthValue,
  prevMonth,
  daysCurrent,
  month,
  year,
  KeyboardDoubleArrowUpOutlinedIcon,
  creditAmount,
  IconDashBoardColor,
  dataDashboard,
  finished,
  credit,
  percetege,
  IconDashBoard,
}) {
  return (
    <DashboardNotification.Root contentWidthValue={ContentWidthValue}>
      <DashboardNotification.Header subTitle={`1 ${prevMonth} - ${daysCurrent} ${month} ${year}`} title="Faturamento">
        <DashboardNotification.Icon icon={KeyboardDoubleArrowUpOutlinedIcon} />
      </DashboardNotification.Header>
      <DashboardNotification.Content content={creditAmount} />
      <DashboardNotification.Footer
        color={IconDashBoardColor(dataDashboard?.finished.credit.percetege)}
        icon={IconDashBoard(dataDashboard?.finished.credit.percetege)}
        subTitle={`${dataDashboard?.finished.credit.percetege}%`}
      />
    </DashboardNotification.Root>
  );
}
