import { Layout } from "../components/layout/dashboard-layout";
import Dashboard from "../pages/dashboard/dashboard";
import NotFound from "../pages/notfound/notfound";

const routesConfig = [
//   {
//     path: "/signup",
//     element: <Signup />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
  {
    path: "", // Use an empty string for the root route
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routesConfig;