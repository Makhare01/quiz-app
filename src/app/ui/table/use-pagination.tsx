import { useCallback, useMemo } from "react";
import useLocalStorageState from "use-local-storage-state";
import {
  QueryParamConfig,
  useQueryParam,
  withDefault,
  NumberParam as NumberParamConfig,
} from "use-query-params";
import { Pagination } from "./table-pagination";

export const NumberParam = withDefault(
  NumberParamConfig,
  1
) as QueryParamConfig<number>;

// eslint-disable-next-line react-refresh/only-export-components
export const usePagination = (sizeLocalStorageKey: string): Pagination => {
  const [index, setIndex] = useQueryParam("page", NumberParam);
  const [size, setSize] = useLocalStorageState(sizeLocalStorageKey, {
    defaultValue: 10,
  });

  const handleChangePage = useCallback(
    (index: number) => {
      window.scrollTo(0, 0);
      setIndex(index);
    },
    [setIndex]
  );

  const handleChangeSize = useCallback(
    (size: number) => {
      handleChangePage(1);
      setSize(size);
    },
    [handleChangePage, setSize]
  );

  return useMemo(() => {
    return {
      page: index,
      pageSize: size,
      onChangePage: handleChangePage,
      onChangePageSize: handleChangeSize,
    };
  }, [index, size, handleChangePage, handleChangeSize]);
};
