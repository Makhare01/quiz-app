import debounce from "lodash.debounce";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

type UseSearchProps = {
  searchParamsKey: string;
};

export const useSearch = (options?: UseSearchProps) => {
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState<
    string | undefined
  >();

  const debouncedSearch = debounce(setDebouncedSearchValue, 500);

  const onChange = (value: string) => {
    if (options?.searchParamsKey) {
      if (value) {
        searchParams.set(options?.searchParamsKey, value);
      } else {
        searchParams.delete(options?.searchParamsKey);
      }
      setSearchParams(searchParams);
    }

    setValue(value);
  };

  const searchValue = searchParams.get(options?.searchParamsKey ?? "") ?? value;

  useEffect(() => {
    debouncedSearch(searchValue);
    return debouncedSearch.cancel;
  }, [debouncedSearch, searchValue]);

  return {
    value: searchValue,
    onChange,
    search: debouncedSearchValue,
  };
};
