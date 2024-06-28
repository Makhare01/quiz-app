import { AuthLayout } from "@app/layouts";
import { paths, unauthRoutes } from "@app/routes";
import { Navigate, useRoutes } from "react-router-dom";

export const UnauthApp = () => {
  const unauthPages = useRoutes([
    ...unauthRoutes,
    {
      path: "*",
      element: <Navigate replace to={paths.signIn} />,
    },
  ]);

  return <AuthLayout>{unauthPages}</AuthLayout>;
};
