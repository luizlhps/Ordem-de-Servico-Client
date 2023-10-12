import { Dispatch, SetStateAction } from "react";

import { useForm } from "react-hook-form";
import { FilterMenu } from "./FiltersMenu";
import { IRangeDateFilter } from "./FiltersMenu/FilterRangeDate";

interface InputProps {
  status: string | undefined | null;
  customer: string | undefined | null;
  dateFrom?: string | undefined | null;
  dateTo?: string | undefined | null;
}

interface IProps {
  setRangeDateFilter: Dispatch<SetStateAction<IRangeDateFilter | null>>;
}

export const MenuSelectFilterDefault = ({ setRangeDateFilter }: IProps) => {
  const {
    register,
    control,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<InputProps>({});

  const onSubmit = (data: InputProps) => {
    setRangeDateFilter({
      dateFrom: data.dateFrom,
      dateTo: data.dateTo,
    });
  };

  return (
    <>
      <FilterMenu.Root handleSubmit={handleSubmit} onSubmit={onSubmit} reset={reset}>
        <FilterMenu.RangeDate errors={errors} control={control} setValue={setValue} />
      </FilterMenu.Root>
    </>
  );
};
