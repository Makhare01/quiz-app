import { AppLayout } from "@app/layouts";
import { authRoutes } from "@app/routes";
import { NotFound } from "@components/not-fond";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RoutesWrapper } from "src/providers";

export const AuthApp = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      Component() {
        return (
          <AppLayout>
            <RoutesWrapper />
          </AppLayout>
        );
      },
      children: [
        ...authRoutes,
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
