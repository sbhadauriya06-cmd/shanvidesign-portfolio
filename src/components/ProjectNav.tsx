import { Link } from "react-router";
import { C } from "../tokens";

/** Shared prev/next project navigation footer for case-study pages. */
export default function ProjectNav({
  prevSlug, prevTitle, nextSlug, nextTitle,
}: {
  prevSlug: string; prevTitle: string; nextSlug: string; nextTitle: string;
}) {
  return (
    <section style={{ display:"grid", gridTemplateColumns:"1fr 1fr" }}>
      <Link
        to={`/work/${prevSlug}`}
        style={{ display:"block", padding:"56px 48px", borderRight:`1px solid ${C.border}`, borderTop:`1px solid ${C.border}`, textDecoration:"none", color:"inherit", transition:"background 0.25s ease" }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = C.surface; }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = ""; }}
      >
        <p style={{ fontSize:"10px", fontWeight:600, letterSpacing:"0.12em", color:C.muted, marginBottom:"14px" }}>← PREVIOUS</p>
        <p style={{ fontSize:"clamp(20px,2.8vw,36px)", fontWeight:800, letterSpacing:"-0.03em", color:C.ink, lineHeight:1.05 }}>{prevTitle}</p>
      </Link>
      <Link
        to={`/work/${nextSlug}`}
        style={{ display:"block", padding:"56px 48px", borderTop:`1px solid ${C.border}`, textDecoration:"none", color:"inherit", transition:"background 0.25s ease", textAlign:"right" }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = C.surface; }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = ""; }}
      >
        <p style={{ fontSize:"10px", fontWeight:600, letterSpacing:"0.12em", color:C.muted, marginBottom:"14px" }}>NEXT →</p>
        <p style={{ fontSize:"clamp(20px,2.8vw,36px)", fontWeight:800, letterSpacing:"-0.03em", color:C.ink, lineHeight:1.05 }}>{nextTitle}</p>
      </Link>
    </section>
  );
}
