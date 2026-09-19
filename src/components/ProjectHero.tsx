import { useNavigate } from "react-router";
import { C } from "../tokens";
import { useReadingProgress } from "../hooks";

/**
 * Shared case-study chrome: reading-progress bar, back/index nav, and the
 * number/year/type/title/overview block. This is project *metadata*, not
 * narrative structure — what happens below it is each project's own.
 */
export default function ProjectHero({
  num, title, overview, year, type, accent,
}: {
  num: string; title: string; overview: string; year: string; type: string; accent: string;
}) {
  const navigate = useNavigate();
  const progress  = useReadingProgress();

  return (
    <>
      <div style={{
        position:      "fixed", top:0, left:0, zIndex:200,
        height:        "2px", width:`${progress}%`,
        background:    accent, transition:"width 0.08s linear", pointerEvents:"none",
      }} />

      <section style={{ padding:"140px 48px 80px", borderBottom:`1px solid ${C.border}` }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:"80px" }} className="hero-in">
          <button
            onClick={() => navigate("/")}
            style={{ fontSize:"11px", fontWeight:600, letterSpacing:"0.12em", color:C.muted, background:"none", border:"none", cursor:"pointer", padding:0, transition:"color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = C.ink)}
            onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
          >
            ← WORK
          </button>
          <span style={{ fontSize:"11px", fontWeight:600, letterSpacing:"0.14em", color:C.muted }}>{num} / 05</span>
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:"20px", marginBottom:"36px" }} className="hero-in">
          <div style={{ width:"32px", height:"2px", background:accent, flexShrink:0 }} />
          <span style={{ fontSize:"10.5px", fontWeight:600, letterSpacing:"0.12em", color:accent }}>{year}</span>
          <span style={{ fontSize:"10px", color:C.border }}>·</span>
          <span style={{ fontSize:"10.5px", fontWeight:600, letterSpacing:"0.1em", color:C.muted }}>{type}</span>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", alignItems:"end", gap:"48px" }} className="work-grid hero-in-late">
          <h1
            className="work-detail-title"
            style={{ fontSize:"clamp(72px,10vw,160px)", fontWeight:800, lineHeight:0.88, letterSpacing:"-0.04em", color:C.ink }}
          >
            {title}
          </h1>
          <div>
            <p style={{ fontSize:"clamp(18px,2vw,24px)", fontWeight:400, lineHeight:1.55, color:C.dim, maxWidth:"480px" }}>
              {overview}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
