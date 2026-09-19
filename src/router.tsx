import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Kutir from "./pages/work/Kutir";
import Kalakshetra from "./pages/work/Kalakshetra";
import GoGHY from "./pages/work/GoGHY";
import ReframeIndia from "./pages/work/ReframeIndia";
import Udgam from "./pages/work/Udgam";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "work/kutir", Component: Kutir },
      { path: "work/kalakshetra", Component: Kalakshetra },
      { path: "work/goghy", Component: GoGHY },
      { path: "work/reframe-india", Component: ReframeIndia },
      { path: "work/udgam-branding", Component: Udgam },
      { path: "*", Component: NotFound },
    ],
  },
]);
