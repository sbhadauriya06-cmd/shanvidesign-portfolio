import { C } from "../tokens";
import { useReveal } from "../hooks";

/**
 * Numbered section chrome (index + accent rule + heading) for a case-study
 * page. Deliberately does not lay out the body — each project decides its
 * own content shape inside `children`, so this stays a primitive rather
 * than a forced narrative template.
 */
export default function CaseStudySection({
  index, heading, accent, delay = 0, children,
}: {
  index: number; heading: string; accent: string; delay?: number; children: React.ReactNode;
}) {
  const reveal = useReveal(delay);
  return (
    <section ref={reveal.ref} style={{ padding:"96px 48px", borderBottom:`1px solid ${C.border}`, ...reveal.revealStyle }}>
      <div style={{ display:"flex", alignItems:"center", gap:"16px", marginBottom:"56px" }}>
        <span style={{ fontSize:"10px", fontWeight:700, letterSpacing:"0.18em", color:accent, fontVariantNumeric:"tabular-nums" }}>
          {String(index).padStart(2, "0")}
        </span>
        <div style={{ width:"40px", height:"1px", background:accent, opacity:0.4 }} />
        <h2 style={{ fontSize:"clamp(22px,3vw,38px)", fontWeight:800, letterSpacing:"-0.022em", color:C.ink }}>{heading}</h2>
      </div>
      {children}
    </section>
  );
}
