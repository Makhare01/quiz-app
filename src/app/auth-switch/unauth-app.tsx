import { AuthLayout } from "@app/layouts";
import { paths, unauthRoutes } from "@app/routes";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { RoutesWrapper } from "src/providers";

export const UnauthApp = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      Component() {
        return (
          <AuthLayout>
            <RoutesWrapper />
          </AuthLayout>
        );
      },
      children: [
        ...unauthRoutes,
        {
          path: "*",
          element: <Navigate replace to={paths.signIn} />,
        },
        {
          index: true,
          element: <Navigate replace to={paths.signIn} />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
