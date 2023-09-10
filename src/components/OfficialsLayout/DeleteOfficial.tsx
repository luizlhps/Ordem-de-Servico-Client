import React from "react";

interface IProps {
  open: boolean;
  handleClose: () => void;
  selectedItem: IOrder | undefined;
  fetchApi: () => void;
}

export const DeleteOfficial = ({}: IProps) => {
  return <div>DeleteOfficial</div>;
};
