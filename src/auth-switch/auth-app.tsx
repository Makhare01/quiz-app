import { AppLayout } from "@app/layouts";
import { authRoutes } from "@app/routes";
import { NotFound } from "@components/not-fond";
import { useRoutes } from "react-router-dom";

export const AuthApp = () => {
  const authPages = useRoutes([
    ...authRoutes,
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <AppLayout>{authPages}</AppLayout>;
};
