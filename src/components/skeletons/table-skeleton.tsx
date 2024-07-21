import { Table } from "@app/ui/table";
import { Skeleton } from "@mui/material";

type Props = {
  columnsCount: number;
  rowsCount: number;
};

export const TableSkeleton = ({ columnsCount, rowsCount }: Props) => {
  return (
    <Table
      columns={Array.from({ length: columnsCount }).map((_col, index) => ({
        key: `skeleton-column-${index}`,
        name: <Skeleton sx={{ flex: 1 }} />,
      }))}
      rows={Array.from({ length: rowsCount }).map((_row, i) => ({
        key: `skeleton-row-${i}`,
        cells: Array.from({ length: columnsCount }).map((_, cellIndex) => (
          <Skeleton key={`skeleton-cell-${cellIndex}`} />
        )),
      }))}
    />
  );
};
