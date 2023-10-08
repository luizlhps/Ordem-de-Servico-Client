import { useDebouse } from "@/hook";
import Cookies from "js-cookie";
import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";

export interface IFilterSearch {
  status?: string;
  search?: string;
  customer?: string;
}

interface IProps {
  limitPorPage: any;
  setCurrentPage: React.Dispatch<React.SetStateAction<any>>;
  currentPage: number;
  fetchApi: (search?: IFilterSearch, page?: number | undefined, limit?: number | undefined) => Promise<void> | void;
}

export interface IRangeDateFilter {
  dateFrom: string | null | undefined;
  dateTo: string | null | undefined;
}

interface IUseSearchField {
  searchHandle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSearchField: React.Dispatch<React.SetStateAction<string>>;
  searchField: string;
  setStatusFilter: Dispatch<SetStateAction<string | null | undefined>>;
  setCustomerFilter: Dispatch<SetStateAction<string | null | undefined>>;
  setRangeDateFilter: Dispatch<SetStateAction<IRangeDateFilter | null>>;
}

export const useSearchField = ({ limitPorPage, setCurrentPage, currentPage, fetchApi }: IProps): IUseSearchField => {
  const [searchField, setSearchField] = useState("");
  const [StatusFilter, setStatusFilter] = useState<string | null | undefined>("");
  const [customerFilter, setCustomerFilter] = useState<string | null | undefined>("");
  const [rangeDateFilter, setRangeDateFilter] = useState<IRangeDateFilter | null>(null);

  const search = useMemo(() => {
    return searchField;
  }, [searchField]);

  const searchHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchField(e.target.value);

    if (search === "") {
      setCurrentPage(0);
    }
  };

  useEffect(() => {
    setCurrentPage(0);
  }, [search]);

  //inputSearch

  useEffect(() => {
    let fieldsSearch = {
      status: StatusFilter ? StatusFilter : "",
      search: search,
      customer: customerFilter ? customerFilter : "",
      dateFrom: rangeDateFilter?.dateFrom ? rangeDateFilter?.dateFrom : "",
      dateTo: rangeDateFilter?.dateTo ? rangeDateFilter?.dateTo : "",
    };

    fetchApi(fieldsSearch, currentPage + 1, limitPorPage);
  }, [search, currentPage, customerFilter, StatusFilter, rangeDateFilter]);

  return {
    setRangeDateFilter,
    setCustomerFilter,
    setStatusFilter,
    searchHandle,
    setSearchField,
    searchField,
  };
};
