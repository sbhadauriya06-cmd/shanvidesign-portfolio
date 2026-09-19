import { createContext, useContext, useState, useEffect, useRef } from "react";
import { Outlet, Link, useLocation } from "react-router";
import { C, lerp } from "./tokens";

// ── Cursor label context ──────────────────────────────────────────────────────
// Child pages write to this ref to set the cursor label shown next to the dot.
export const CursorCtx = createContext<React.MutableRefObject<string>>({ current: "" });
export const useCursorLabel = () => useContext(CursorCtx);

export default function Root() {
  const [navSolid,     setNavSolid]     = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const dotRef          = useRef<HTMLDivElement>(null);
  const dotLabelRef     = useRef<HTMLSpanElement>(null);
  const cursorLabelRef  = useRef("");
  const location        = useLocation();

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 44);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reset scroll + cursor label on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    cursorLabelRef.current = "";
  }, [location.pathname]);

  // Custom cursor RAF — lerps dot to mouse, reads label from context ref
  useEffect(() => {
    if (reducedMotion) {
      if (dotRef.current) dotRef.current.style.opacity = "0";
      return;
    }
    let animId: number;
    let lx = -600, ly = -600;
    let mx = -600, my = -600;
    const onMouse = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    document.addEventListener("mousemove", onMouse);
    const loop = () => {
      lx = lerp(lx, mx, 0.13);
      ly = lerp(ly, my, 0.13);
      if (dotRef.current) {
        dotRef.current.style.left = `${lx + 14}px`;
        dotRef.current.style.top  = `${ly - 9}px`;
      }
      const label = cursorLabelRef.current;
      if (dotLabelRef.current) {
        dotLabelRef.current.textContent   = label;
        dotLabelRef.current.style.opacity = label ? "1" : "0";
      }
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener("mousemove", onMouse);
    };
  }, [reducedMotion]);

  const isHome   = location.pathname === "/";
  const isDetail = location.pathname.startsWith("/work/");

  return (
    <CursorCtx.Provider value={cursorLabelRef}>
      <div style={{ background: C.paper, color: C.ink, fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>

        {/* ── Cursor dot ────────────────────────────────────────────────────── */}
        <div
          ref={dotRef}
          style={{ position:"fixed", top:0, left:0, zIndex:9999, pointerEvents:"none", display:"flex", alignItems:"center", gap:"7px", willChange:"left,top" }}
        >
          <div style={{ width:"5px", height:"5px", borderRadius:"50%", background:C.ink, flexShrink:0 }} />
          <span
            ref={dotLabelRef}
            style={{ fontSize:"10px", fontWeight:700, letterSpacing:"0.14em", color:C.ink, opacity:0, transition:"opacity 0.18s ease", whiteSpace:"nowrap" }}
          />
        </div>

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
          <div style={{ display:"flex", gap:"32px" }}>
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
              isHome && ["WORK", "ABOUT", "CONTACT"].map(item => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  style={{ fontSize:"11px", fontWeight:500, letterSpacing:"0.1em", textDecoration:"none", color:C.ink, opacity:0.5, transition:"opacity 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "0.5")}
                >
                  {item}
                </a>
              ))
            )}
          </div>
        </nav>

        <div key={location.pathname} className="page-enter">
          <Outlet />
        </div>
      </div>
    </CursorCtx.Provider>
  );
}
