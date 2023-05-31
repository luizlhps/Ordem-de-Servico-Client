import { useDebouse } from "@/hook";
import React, { useEffect, useMemo, useState } from "react";

interface IProps {
  limitPorPage: any;
  setCurrentPage: React.Dispatch<React.SetStateAction<any>>;
  currentPage: number;
  fetchApi: (id?: string, search?: string, page?: number | undefined, limit?: number | undefined) => Promise<void>;
  id?: string | undefined;
}
interface IUseSearchField {
  searchHandle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSearchField: React.Dispatch<React.SetStateAction<string>>;
  searchField: string;
}

export const useSearchFieldWith_id = ({
  limitPorPage,
  setCurrentPage,
  currentPage,
  fetchApi,
  id,
}: IProps): IUseSearchField => {
  const [searchField, setSearchField] = useState("");

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

  const numberPage = currentPage + 1;

  //inputSearch

  useEffect(() => {
    fetchApi(id, search, numberPage, limitPorPage);
  }, [search, currentPage]);

  return {
    searchHandle,
    setSearchField,
    searchField,
  };
};
