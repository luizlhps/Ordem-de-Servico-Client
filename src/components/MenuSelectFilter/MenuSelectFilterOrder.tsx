import { Dispatch, SetStateAction } from "react";

import { useForm } from "react-hook-form";
import { FilterMenu } from "./FiltersMenu";
import { IRangeDateFilter } from "./FiltersMenu/FilterRangeDate";

interface InputProps {
  status: string | undefined | null;
  customer: string | undefined | null;
  dateFrom: string | undefined | null;
  dateTo: string | undefined | null;
}

interface IProps {
  setCustomerFilter: Dispatch<SetStateAction<string | null | undefined>>;
  setStatusFilter: Dispatch<SetStateAction<string | null | undefined>>;
  setRangeDateFilter: Dispatch<SetStateAction<IRangeDateFilter | null>>;
}

export const MenuSelectFilterOrder = ({ setCustomerFilter, setStatusFilter, setRangeDateFilter }: IProps) => {
  const {
    register,
    control,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<InputProps>({});

  const onSubmit = (data: InputProps) => {
    setStatusFilter(data.status);
    setCustomerFilter(data.customer);
    setRangeDateFilter({
      dateFrom: data.dateFrom,
      dateTo: data.dateTo,
    });
  };

  return (
    <>
      <FilterMenu.Root handleSubmit={handleSubmit} onSubmit={onSubmit} reset={reset}>
        <FilterMenu.Status control={control} setValue={setValue} />
        <FilterMenu.Customer control={control} setValue={setValue} />
        <FilterMenu.RangeDate errors={errors} control={control} setValue={setValue} />
      </FilterMenu.Root>
    </>
  );
};
