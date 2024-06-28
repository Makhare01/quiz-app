import { ToastContent } from "@app/ui/toast";
import { useConst } from "@lib/hooks";
import { RequestError } from "@lib/request";
import { Stack, Typography } from "@mui/material";
import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { toast } from "react-toastify";

type UseQueryClientInstanceOptions = {
  debug: boolean;
};

export const useQueryClientInstance = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  debug: _debug,
}: UseQueryClientInstanceOptions) => {
  const handleError = useCallback((type?: string, message?: string) => {
    toast.error(
      <ToastContent title={type ?? "Error"}>
        <Stack spacing={1}>
          <Typography
            component="pre"
            lineHeight="24px"
            sx={{
              textWrap: "wrap",
            }}
          >
            {message ?? "An unknown error occurred"}
          </Typography>
          {!message && (
            <Typography lineHeight="24px">
              There was an error. We are looking for a reason. Please try again
              later
            </Typography>
          )}
        </Stack>
      </ToastContent>
    );
  }, []);

  return useConst(() => {
    return new QueryClient({
      queryCache: new QueryCache({
        onError: (error) => {
          const requestError = error as RequestError;

          handleError(requestError.type, requestError.message);
        },
      }),
      mutationCache: new MutationCache({
        onError: (error: unknown) => {
          const requestError = error as RequestError;

          handleError(requestError.type, requestError.message);
        },
      }),
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: false,
        },
        mutations: {
          retry: false,
        },
      },
    });
  });
};
