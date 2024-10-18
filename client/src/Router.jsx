import { RouterProvider, createBrowserRouter } from "react-router-dom";
import loadable from "@loadable/component";

const Home = loadable(() => import("./pages/Home"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
