import { C } from "../../tokens";
import { useReveal } from "../../hooks";
import ProjectHero from "../../components/ProjectHero";
import ProjectNav from "../../components/ProjectNav";
import CaseStudySection from "../../components/CaseStudySection";
import Reflection from "../../components/Reflection";
import MediaBlock from "../../components/MediaBlock";
import Footer from "../../components/Footer";

const ACCENT = "#C2421F";

/**
 * Placeholder content below — replace every bracketed line with the real
 * case study. Structure (which sections exist, and in what order) is free
 * to change; this is this project's own file, not a shared template.
 */
export default function Kutir() {
  const revealOverview = useReveal(60);

  return (
    <div>
      <ProjectHero
        num="01"
        title="KUTIR"
        overview="A product design / UX case study."
        year="2024"
        type="PRODUCT DESIGN · UX/UI"
        accent={ACCENT}
      />

      <section ref={revealOverview.ref} style={{ padding:"80px 48px", borderBottom:`1px solid ${C.border}`, background:C.surface, ...revealOverview.revealStyle }}>
        <div style={{ display:"grid", gridTemplateColumns:"200px 1fr", gap:"80px", maxWidth:"1100px" }} className="work-grid">
          <div>
            <p style={{ fontSize:"10px", fontWeight:700, letterSpacing:"0.14em", color:C.muted, marginBottom:"16px" }}>ROLE</p>
            <p style={{ fontSize:"14.5px", fontWeight:400, color:C.dim, lineHeight:1.7 }}>[Placeholder — your role and scope on this project.]</p>
          </div>
          <div>
            <p style={{ fontSize:"10px", fontWeight:700, letterSpacing:"0.14em", color:C.muted, marginBottom:"16px" }}>THE PROBLEM</p>
            <p style={{ fontSize:"clamp(16px,1.6vw,19px)", fontWeight:400, color:C.ink, lineHeight:1.7, maxWidth:"680px" }}>[Placeholder — what problem were you actually solving, and for whom?]</p>
          </div>
        </div>
      </section>

      <CaseStudySection index={1} heading="THE PROBLEM" accent={ACCENT}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"56px", alignItems:"start" }} className="work-grid">
          <p style={{ fontSize:"clamp(15px,1.5vw,18px)", fontWeight:400, lineHeight:1.75, color:C.dim }}>
            [Placeholder — what did you notice, and why was it worth investigating?]
          </p>
          <MediaBlock label="Add project visual" tall />
        </div>
      </CaseStudySection>

      <CaseStudySection index={2} heading="THE PROCESS" accent={ACCENT} delay={80}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"56px", alignItems:"start" }} className="work-grid">
          <MediaBlock label="Add project visual" tall />
          <p style={{ fontSize:"clamp(15px,1.5vw,18px)", fontWeight:400, lineHeight:1.75, color:C.dim }}>
            [Placeholder — how did you get from the problem to a direction? Real research/process only, no invented numbers.]
          </p>
        </div>
      </CaseStudySection>

      <CaseStudySection index={3} heading="THE OUTCOME" accent={ACCENT} delay={160}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"56px", alignItems:"start" }} className="work-grid">
          <p style={{ fontSize:"clamp(15px,1.5vw,18px)", fontWeight:400, lineHeight:1.75, color:C.dim }}>
            [Placeholder — what shipped, and what changed as a result? Real outcomes only, no invented metrics.]
          </p>
          <MediaBlock label="Add project visual" tall />
        </div>
      </CaseStudySection>

      <Reflection accent={ACCENT}>
        [Space for a reflection or key insight — add the sentence that made this project worthwhile.]
      </Reflection>

      <ProjectNav prevSlug="udgam-branding" prevTitle="UDGAM BRANDING" nextSlug="kalakshetra" nextTitle="KALAKSHETRA" />
      <Footer />
    </div>
  );
}
