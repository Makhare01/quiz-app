import { AuthProvider } from "@app/auth";
import { theme } from "@app/theme";
import { ToastContainer } from "@app/ui/toast";
import { GlobalQueryClientProvider } from "@lib/query-utils";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ReactNode, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";

export const RoutesWrapper = () => {
  return (
    <QueryParamProvider
      adapter={ReactRouter6Adapter}
      options={{
        removeDefaultsFromUrl: true,
      }}
    >
      <ToastContainer />
      <Outlet />
    </QueryParamProvider>
  );
};

type Props = {
  children: ReactNode;
};

export const Providers = ({ children }: Props) => {
  return (
    <Suspense fallback={null}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HelmetProvider>
          <Helmet defaultTitle="Quiz app" titleTemplate="%s · Quiz app" />
          {/* // TODO */}
          <ErrorBoundary fallback={null}>
            <GlobalQueryClientProvider>
              <AuthProvider>{children}</AuthProvider>
            </GlobalQueryClientProvider>
          </ErrorBoundary>
        </HelmetProvider>
      </ThemeProvider>
    </Suspense>
  );
};
