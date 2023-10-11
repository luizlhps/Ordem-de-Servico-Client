import { useDebouse } from "@/hook";
import Cookies from "js-cookie";
import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";

interface IProps {
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setSearchField: React.Dispatch<React.SetStateAction<string>>;
  searchField: string;
}

interface IUseSearchField {
  searchHandle: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useSearchField = ({ setCurrentPage, setSearchField, searchField }: IProps): IUseSearchField => {
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

  return {
    searchHandle,
  };
};
