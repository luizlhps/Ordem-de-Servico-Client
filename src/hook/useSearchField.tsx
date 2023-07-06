import { useDebouse } from "@/hook";
import React, { useEffect, useMemo, useState } from "react";

interface IProps {
  limitPorPage: any;
  setCurrentPage: React.Dispatch<React.SetStateAction<any>>;
  currentPage: number;
  fetchApi: (search?: string, page?: number | undefined, limit?: number | undefined) => Promise<void> | void;
}
interface IUseSearchField {
  searchHandle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSearchField: React.Dispatch<React.SetStateAction<string>>;
  searchField: string;
}

export const useSearchField = ({ limitPorPage, setCurrentPage, currentPage, fetchApi }: IProps): IUseSearchField => {
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

  //inputSearch

  useEffect(() => {
    fetchApi(search, currentPage + 1, limitPorPage);
  }, [search, currentPage]);

  return {
    searchHandle,
    setSearchField,
    searchField,
  };
};
