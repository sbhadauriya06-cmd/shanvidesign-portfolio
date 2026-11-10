import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { C } from "./tokens";

export default function Root() {
  const location = useLocation();

  // On a route or section change, go to that section, or else the top.
  useEffect(() => {
    const target = location.hash && document.querySelector(location.hash);
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (target) target.scrollIntoView({ behavior: calm ? "auto" : "smooth" });
    else window.scrollTo(0, 0);
  }, [location.pathname, location.hash, location.key]);

  return (
    <div style={{ background: C.paper, color: C.ink, fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      <div key={location.pathname} className="page-enter">
        <Outlet />
      </div>
    </div>
  );
}
