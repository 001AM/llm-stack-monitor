import { Layout } from "../components/layout/dashboard-layout";
import CostAnaylsis from "../pages/costanalysis/page";
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
      {
        path: "/cost-analysis/",
        element: <CostAnaylsis />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routesConfig;