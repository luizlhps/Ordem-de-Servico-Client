import React, { CSSProperties } from "react";

interface IProps {
  handleClose: () => void;
  fetchApi: () => void;
  style: CSSProperties;
  open: boolean;
  selectItem: IOrder | undefined;
}

export const UpdateOfficial = ({}: IProps) => {
  return <div>UpdateOfficial</div>;
};
