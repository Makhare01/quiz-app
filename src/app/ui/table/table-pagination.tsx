import { Box, Stack, Typography } from "@mui/material";

import { Select } from "../select";
import { IconArrow } from "@app/assets/icons";

export type Pagination = {
  page: number;
  pageSize: number;
  onChangePage: (page: number) => void;
  onChangePageSize: (size: number) => void;
};

type Props = Readonly<{
  pagination: Pagination;
  totalCount: number;
}>;

const PaginationButton = ({
  page,
  callback,
  active,
}: {
  page: number;
  callback: (page: number) => void;
  active?: boolean;
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor={active ? "primary.main" : undefined}
      borderRadius={1.5}
      px={1}
      width={24}
      height={24}
      onClick={() => callback(page)}
      sx={{ cursor: "pointer" }}
    >
      <Typography
        variant="body2"
        fontWeight={500}
        color={active ? "background.paper" : "secondary.main"}
      >
        {page}
      </Typography>
    </Box>
  );
};

export const TablePagination = ({
  pagination: { page, pageSize, onChangePage, onChangePageSize },
  totalCount,
}: Props) => {
  const currentMaxPage = page * pageSize;
  const currentMinPage =
    currentMaxPage - pageSize === 0 ? 1 : currentMaxPage - pageSize;

  const lastPaginationPoint =
    page <= 2 ? Math.ceil(totalCount / pageSize) : page;

  const arePrevPages = page >= 2;
  const areNextPages = page < Math.ceil(totalCount / pageSize);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      width={1}
      gap={2}
    >
      <Stack direction="row" gap={1} alignItems="center">
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontWeight: 500, textWrap: "nowrap" }}
        >
          Rows per page:
        </Typography>
        <Stack direction="row" gap={3} alignItems="center">
          <Box minWidth={60}>
            <Select
              variant="outlined"
              value={pageSize.toString()}
              onChange={(event) => onChangePageSize(Number(event.target.value))}
              options={[10, 25, 50].map((value) => ({
                value: value.toString(),
                label: value.toString(),
              }))}
              sx={{
                height: 40,
              }}
            />
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontWeight: 500, textWrap: "nowrap" }}
          >
            {currentMinPage}-{currentMaxPage} of {totalCount}
          </Typography>
        </Stack>
      </Stack>
      {(arePrevPages || areNextPages) && (
        <Stack direction="row" display="flex" alignItems="center" gap={0.5}>
          <Box
            sx={{ cursor: arePrevPages ? "pointer" : "default", mt: 0.6 }}
            onClick={() => arePrevPages && onChangePage(page - 1)}
          >
            <IconArrow
              direction="left"
              sx={{
                width: 16,
                height: 16,
                color: arePrevPages ? "text.primary" : "text.disabled",
              }}
            />
          </Box>
          {Math.ceil(totalCount / pageSize) > 2 ? (
            <Stack direction="row" alignItems="center" gap={1}>
              {page < 3 ? (
                <>
                  <PaginationButton
                    callback={onChangePage}
                    page={1}
                    active={page === 1 || page === 0}
                  />
                  <PaginationButton
                    callback={onChangePage}
                    page={2}
                    active={page === 2}
                  />
                </>
              ) : (
                <>
                  <PaginationButton callback={onChangePage} page={page - 2} />
                  <PaginationButton callback={onChangePage} page={page - 1} />
                </>
              )}
              {lastPaginationPoint !== 2 && (
                <Typography
                  variant="body2"
                  fontWeight={500}
                  color="text.secondary"
                >
                  ...
                </Typography>
              )}
              <PaginationButton
                callback={onChangePage}
                page={lastPaginationPoint}
                active={page === lastPaginationPoint}
              />
            </Stack>
          ) : Math.ceil(totalCount / pageSize) === 2 ? (
            <>
              <PaginationButton
                callback={onChangePage}
                page={1}
                active={page === 1 || page === 0}
              />
              <PaginationButton
                callback={onChangePage}
                page={2}
                active={page === 2}
              />
            </>
          ) : null}
          <Box
            sx={{ cursor: areNextPages ? "pointer" : "default", mt: 0.6 }}
            onClick={() => areNextPages && onChangePage(page + 1)}
          >
            <IconArrow
              direction="right"
              sx={{
                width: 16,
                height: 16,
                color: areNextPages ? "text.primary" : "text.disabled",
              }}
            />
          </Box>
        </Stack>
      )}
    </Box>
  );
};
