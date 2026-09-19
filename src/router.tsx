import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Home from "./pages/Home";
import WorkDetail from "./pages/WorkDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "work/:slug", Component: WorkDetail },
    ],
  },
]);
