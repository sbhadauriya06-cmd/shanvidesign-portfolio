import { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router";
import { C } from "./tokens";

// ── Primary nav — order here drives the nav bar. Homepage sections for
// "Other Things" and "I'm curious about" still exist (see Home.tsx) and
// stay reachable by scroll or direct link; they're just not in this list.
export const NAV_ITEMS = [
  { label: "WORK",    href: "#work" },
  { label: "ABOUT",   href: "#about" },
  { label: "CONTACT", href: "#contact" },
] as const;

export default function Root() {
  const [navSolid, setNavSolid] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 44);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reset scroll on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isHome   = location.pathname === "/";
  const isDetail = location.pathname.startsWith("/work/");

  return (
    <div style={{ background: C.paper, color: C.ink, fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>

      {/* ── Nav ───────────────────────────────────────────────────────────── */}
      <nav
        className="nav-inner"
        style={{
          position:       "fixed",
          top:            0,
          left:           0,
          right:          0,
          zIndex:         100,
          display:        "flex",
          justifyContent: "space-between",
          alignItems:     "center",
          padding:        "24px 48px",
          background:     navSolid ? "rgba(245,242,236,0.96)" : "transparent",
          backdropFilter: navSolid ? "blur(12px)" : "none",
          borderBottom:   navSolid ? `1px solid ${C.border}` : "1px solid transparent",
          transition:     "background 0.4s ease, border-color 0.4s ease",
        }}
      >
        <Link
          to="/"
          style={{ fontSize:"11px", fontWeight:700, letterSpacing:"0.14em", textDecoration:"none", color:C.ink }}
        >
          SHANVI BHADAURIYA
        </Link>
        <div className="nav-links" style={{ display:"flex", gap:"32px" }}>
          {isDetail ? (
            <Link
              to="/"
              style={{ fontSize:"11px", fontWeight:500, letterSpacing:"0.1em", textDecoration:"none", color:C.ink, opacity:0.5, transition:"opacity 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "0.5")}
            >
              ← INDEX
            </Link>
          ) : (
            isHome && NAV_ITEMS.map(item => (
              <a
                key={item.href}
                href={item.href}
                style={{ fontSize:"11px", fontWeight:500, letterSpacing:"0.1em", textDecoration:"none", color:C.ink, opacity:0.5, transition:"opacity 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "0.5")}
              >
                {item.label}
              </a>
            ))
          )}
        </div>
      </nav>

      <div key={location.pathname} className="page-enter">
        <Outlet />
      </div>
    </div>
  );
}
