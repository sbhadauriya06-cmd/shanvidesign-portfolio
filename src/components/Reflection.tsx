import { C } from "../tokens";
import { useReveal } from "../hooks";

/** Pull-quote style reflection block, shared chrome for case-study pages. */
export default function Reflection({ accent, children }: { accent: string; children: React.ReactNode }) {
  const reveal = useReveal();
  return (
    <section ref={reveal.ref} style={{ padding:"96px 48px", borderBottom:`1px solid ${C.border}`, borderTop:`1px solid ${C.border}`, ...reveal.revealStyle }}>
      <div style={{ display:"flex", alignItems:"flex-start", gap:"40px", maxWidth:"860px" }}>
        <div style={{ width:"3px", background:accent, flexShrink:0, alignSelf:"stretch", minHeight:"60px" }} />
        <div>
          <p style={{ fontSize:"10px", fontWeight:700, letterSpacing:"0.14em", color:C.muted, marginBottom:"24px" }}>WHAT I LEARNED</p>
          <p style={{ fontSize:"clamp(22px,2.8vw,34px)", fontWeight:700, lineHeight:1.35, letterSpacing:"-0.02em", color:C.ink }}>
            {children}
          </p>
        </div>
      </div>
    </section>
  );
}
