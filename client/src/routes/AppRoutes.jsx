import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import RootLayOut from "../layouts/RootLayOut";
import AllTasks from "../components/AllTasks";

export default function AppRoutes() {
  const routes = [
    {
      path: "/",
      element: <RootLayOut />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "task",
          element: <AllTasks />,
        },
      ],
    },
  ];

  const route = createBrowserRouter(routes);

  return <RouterProvider router={route} />;
}
