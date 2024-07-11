import {
  TableContainer,
  Table as MuTable,
  TableHead,
  TableRow,
  TableCell,
  TableCellProps,
  TableBody,
  SxProps,
  Theme,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { ReactNode } from "react";
import { Pagination, TablePagination } from "./table-pagination";
import { IconArrow } from "@app/assets/icons";

export type SortItem = {
  column: string;
  dir: "asc" | "desc";
};

export type Column = {
  key: string;
  name: ReactNode;
  width?: string | number;
  align?: TableCellProps["align"];
  sortable?: boolean;
};

type Row = {
  key: string;
  cells: Array<ReactNode>;
  onClick?: (key: string) => void;
};

type Props = {
  columns: Array<Column>;
  rows: Array<Row>;
  pagination?: {
    totalCount: number;
    tablePagination: Pagination;
  };
  containerSx?: SxProps<Theme>;
  sort?: SortItem;
  setSort?: (item: SortItem) => void;
};

export const Table = ({
  columns,
  rows,
  pagination,
  containerSx,
  sort,
  setSort,
}: Props) => {
  return (
    <TableContainer
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 2,
        maxHeight: 1,
        overflow: "auto",
        flex: 1,
        ...containerSx,
      }}
    >
      <MuTable>
        <TableHead>
          <TableRow
            sx={{
              position: "sticky",
              top: 0,
              left: 0,
              bgcolor: "background.default",
              zIndex: 10,
            }}
          >
            {columns.map(({ key, name, align, width, sortable }, index) => {
              return (
                <TableCell
                  key={"column-" + index}
                  align={align}
                  width={width}
                  sx={{ fontWeight: 700, minWidth: width }}
                  onClick={() => {
                    if (!setSort || !sortable) return;

                    pagination?.tablePagination.onChangePage(1);

                    if (!sort || sort.column !== key) {
                      setSort({
                        column: key,
                        dir: "asc",
                      });
                      return;
                    }

                    if (sort.dir === "asc") {
                      setSort({
                        column: key,
                        dir: "desc",
                      });
                    } else {
                      setSort({
                        column: key,
                        dir: "asc",
                      });
                    }
                  }}
                >
                  <Box display="flex" alignItems="center" gap={1} width={1}>
                    {name}
                    {sortable && (
                      <IconButton>
                        <IconArrow
                          direction={
                            sort?.column === key
                              ? sort.dir === "asc"
                                ? "down"
                                : "up"
                              : "down"
                          }
                          sx={{
                            fontSize: 14,
                            color:
                              sort?.column === key
                                ? "text.primary"
                                : "text.disabled",
                          }}
                        />
                      </IconButton>
                    )}
                  </Box>
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 ? (
            rows.map(({ key, cells, onClick }) => (
              <TableRow
                key={key}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  alignItems: "flex-start",
                }}
                onClick={() => onClick?.(key)}
              >
                {cells.map((cell, index) => {
                  return (
                    <TableCell key={`cell-${index}`} component="th" scope="row">
                      {cell}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} component="th" scope="row">
                <Typography
                  variant="h4"
                  fontWeight={700}
                  textAlign="center"
                  m={3}
                >
                  No data to display
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </MuTable>
      {pagination && (
        <Box
          sx={{
            height: 60,
            display: "flex",
            justifyContent: "flex-end",
            bgcolor: "background.paper",
            borderTop: 1,
            borderColor: "divider",
            position: "sticky",
            bottom: 0,
            left: 0,
            px: 2,
          }}
        >
          <TablePagination
            totalCount={pagination.totalCount}
            pagination={pagination.tablePagination}
          />
        </Box>
      )}
    </TableContainer>
  );
};
