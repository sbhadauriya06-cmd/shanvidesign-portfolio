import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { C, displayFont } from "../tokens";
import { useReveal } from "../hooks";
import SectionHeading from "../components/SectionHeading";
import Footer from "../components/Footer";
import HeroObjectField from "../hero/HeroObjectField";
import { SEQUENCE } from "../hero/letterShapes";

// ─── Page data ────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    slug:      "kutir",
    num:       "01",
    title:     "KUTIR",
    statement: "A platform for discovering local makers and their work.",
    meta:      "PRODUCT DESIGN · RESEARCH · STRATEGY · UX/UI",
    year:      "2024",
    imageUrl:  "https://images.unsplash.com/photo-1662845114342-256fdc45981d?w=1600&h=900&fit=crop&auto=format",
    imageAlt:  "Artisan holding a clay pot",
    overlay:   "rgba(20,14,10,0.52)",
  },
  {
    slug:      "kalakshetra",
    num:       "02",
    title:     "KALAKSHETRA",
    statement: "Mapping what a classical arts institution communicates — and what it silently forgets.",
    meta:      "SERVICE DESIGN · RESEARCH · EDITORIAL",
    year:      "2023",
    imageUrl:  "https://images.unsplash.com/photo-1463592177119-bab2a00f3ccb?w=1600&h=900&fit=crop&auto=format",
    imageAlt:  "Classical dancers performing",
    overlay:   "rgba(10,8,22,0.60)",
  },
  {
    slug:      "goghy",
    num:       "03",
    title:     "GoGHY",
    statement: "A fitness app that doesn't pretend becoming healthy is simple, satisfying, or linear.",
    meta:      "PRODUCT DESIGN · BRAND · UX/UI",
    year:      "2024",
    imageUrl:  "https://images.unsplash.com/photo-1623824204241-f851d3bcfaf5?w=1600&h=900&fit=crop&auto=format",
    imageAlt:  "Mobile app on phone",
    overlay:   "rgba(8,16,28,0.58)",
  },
  {
    slug:      "reframe-india",
    num:       "04",
    title:     "REFRAME INDIA",
    statement: "What does India look like when you stop reaching for the familiar image?",
    meta:      "RESEARCH · EDITORIAL DESIGN · SYSTEMS",
    year:      "2023",
    imageUrl:  "https://images.unsplash.com/photo-1693845609327-8f64e686e338?w=1600&h=900&fit=crop&auto=format",
    imageAlt:  "Street in India",
    overlay:   "rgba(18,12,8,0.56)",
  },
  {
    slug:      "udgam-branding",
    num:       "05",
    title:     "UDGAM BRANDING",
    statement: "Identity for a studio whose name is Sanskrit for 'source' — and whose work returns to it.",
    meta:      "BRAND IDENTITY · VISUAL DESIGN · TYPOGRAPHY",
    year:      "2024",
    imageUrl:  "https://images.unsplash.com/photo-1679167564671-f7b82c2b380b?w=1600&h=900&fit=crop&auto=format",
    imageAlt:  "Design typography studio",
    overlay:   "rgba(6,6,18,0.62)",
  },
];

const CURIOSITIES = [
  "Why do some interfaces feel like places?",
  "Why do people become attached to badly designed things?",
  "Why do some books find their readers?",
  "Why do we keep designing for the \"average\" user?",
];

const SIDE_PROJECTS = [
  {
    tag:   "ILLUSTRATION",
    title: "Small Observations",
    desc:  "Ink and digital illustrations made between projects. Things noticed on commutes, in waiting rooms, at dinner tables.",
    span:  2,
    color: "#DDD8CE",
    aspect: "56%",
  },
  {
    tag:   "COMIC SPREAD",
    title: "Three Conversations",
    desc:  "A comic about the things people say when they don't quite mean them.",
    span:  1,
    color: "#D4CFC6",
    aspect: "120%",
  },
  {
    tag:   "ZINE",
    title: "Things I Collected",
    desc:  "A handmade zine about objects kept without knowing why.",
    span:  1,
    color: "#E0DBD1",
    aspect: "130%",
  },
  {
    tag:   "GAME DESIGN",
    title: "Familiar Spaces",
    desc:  "A short narrative game set in recognisable domestic environments. Mechanics built around decision paralysis.",
    span:  1,
    color: "#D8D3C8",
    aspect: "80%",
  },
  {
    tag:   "CONCEPTUALISATION",
    title: "If Public Libraries Became",
    desc:  "A speculative brief: what do institutions look like when they change their core assumption?",
    span:  2,
    color: "#CAC5BB",
    aspect: "50%",
  },
  {
    tag:   "OTHER EXPERIMENTS",
    title: "[Placeholder]",
    desc:  "[Placeholder — replace with a real experiment.]",
    span:  1,
    color: "#D4CFC6",
    aspect: "80%",
  },
];

// ─── Roll button ──────────────────────────────────────────────────────────────

function DiceButton({
  pipIndex, rolling, onClick,
}: {
  pipIndex: number; rolling: boolean; onClick: () => void;
}) {
  const configs = [[[18, 18]], [[11, 11], [25, 25]], [[11, 11], [18, 18], [25, 25]]] as [number,number][][];
  const dots    = configs[pipIndex % configs.length];

  return (
    <button
      type="button"
      aria-label="Advance to the next composition"
      onClick={onClick}
      style={{
        position:"absolute", right:"56px", bottom:"232px", width:"36px", height:"36px", zIndex:20,
        userSelect:"none", padding:0, background:"none", border:"none", cursor:"pointer",
      }}
    >
      <svg
        width="36" height="36" viewBox="0 0 36 36"
        className={rolling ? "dice-rolling" : ""}
        style={{ display:"block", transformOrigin:"18px 18px" }}
      >
        <rect x="2" y="2" width="32" height="32" rx="6" ry="6" fill={C.paper} stroke={C.ink} strokeWidth="1.5" />
        {dots.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="2.6" fill={C.ink} />
        ))}
      </svg>
    </button>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Home() {
  const [seqIndex,         setSeqIndex]          = useState(0);
  const [diceRolling,      setDiceRolling]       = useState(false);
  const [activeProject,    setActiveProject]     = useState<string | null>(null);
  const [hoveredCuriosity, setHoveredCuriosity]  = useState<number | null>(null);

  const workEntryRef = useRef<HTMLDivElement>(null);

  // Scroll reveal anchors
  const revealWork        = useReveal();
  const revealCuriosities = useReveal();
  const revealSide        = useReveal();
  const revealAbout       = useReveal();
  const revealContact     = useReveal();

  const advance = () => setSeqIndex(i => (i + 1) % SEQUENCE.length);

  // ── Automatic sequence: RANDOM -> D -> E -> S -> I -> G -> N -> RANDOM ─────
  // A manual roll (below) also calls setSeqIndex, which re-runs this effect
  // and cancels/reschedules the pending timer — so the two never fight.
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return; // stay put; the roll button still works
    const holdMs = SEQUENCE[seqIndex] === "RANDOM" ? 3600 : 2600;
    const timer = setTimeout(advance, holdMs);
    return () => clearTimeout(timer);
  }, [seqIndex]);

  // ── Roll click — advances the sequence by one step ─────────────────────────

  const handleDiceClick = () => {
    if (diceRolling) return;
    setDiceRolling(true);
    setTimeout(() => {
      advance();
      setDiceRolling(false);
    }, 480);
  };

  // ── Derived state ────────────────────────────────────────────────────────

  const currentKey         = SEQUENCE[seqIndex];
  const composed           = currentKey !== "RANDOM";
  const typoLetterSpacing  = composed ? "-0.042em" : "-0.028em";
  const typoTranslateY     = composed ? -3 : 0;

  return (
    <div>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        className="hero-section"
        style={{ position:"relative", minHeight:"82vh", overflow:"hidden", display:"flex", flexDirection:"column", justifyContent:"flex-start", padding:"clamp(100px,13vh,152px) 48px 88px" }}
      >

        {/* Objects — a still-life field that reassembles into D-E-S-I-G-N */}
        <HeroObjectField stateKey={currentKey} />

        <DiceButton
          pipIndex={seqIndex}
          rolling={diceRolling}
          onClick={handleDiceClick}
        />

        {/* Headline */}
        <div
          style={{
            position:"relative", zIndex:5,
            transform:`translateY(${typoTranslateY}px)`,
            transition: composed ? "transform 1.6s cubic-bezier(0.22,0.1,0.08,1)" : "none",
          }}
        >
          <p
            className="hero-in"
            style={{ marginBottom:"18px", fontSize:"clamp(14px,1.25vw,17px)", fontWeight:400, color:C.muted, lineHeight:1.55 }}
          >
            I&apos;m Shanvi, a product designer.
          </p>
          <h1
            className="hero-in"
            style={{
              fontFamily:displayFont,
              fontSize:"clamp(56px,9vw,152px)", fontWeight:700, lineHeight:0.95,
              letterSpacing:typoLetterSpacing, color:C.ink,
              transition: composed ? "letter-spacing 1.8s cubic-bezier(0.22,0.1,0.08,1)" : "none",
            }}
          >
            I FIGURE<br />THINGS<br />OUT.
          </h1>
        </div>

        {/* Work entry zone */}
        <div
          ref={workEntryRef}
          onClick={() => document.getElementById("work")?.scrollIntoView({ behavior:"smooth" })}
          style={{ position:"absolute", bottom:0, left:0, right:0, height:"18%", zIndex:25, cursor:"pointer" }}
        >
          <div style={{ position:"absolute", bottom:"32px", right:"48px", display:"flex", alignItems:"center", gap:"10px", opacity:0.35 }}>
            <span style={{ fontSize:"10px", fontWeight:600, letterSpacing:"0.14em", color:C.ink }}>SELECTED WORK</span>
            <svg width="10" height="7" viewBox="0 0 10 7" fill="none" aria-hidden="true">
              <path d="M5 7L0 0H10L5 7Z" fill={C.ink} />
            </svg>
          </div>
        </div>
      </section>

      {/* ── SELECTED WORK ─────────────────────────────────────────────────── */}
      <section id="work" className="section-pad" ref={revealWork.ref} style={{ padding:"120px 48px 60px", ...revealWork.revealStyle }}>
        <SectionHeading right={new Date().getFullYear()} marginBottom={80}>SELECTED WORK</SectionHeading>

        {PROJECTS.map(project => {
          const active = activeProject === project.num;
          return (
            <Link
              key={project.num}
              to={`/work/${project.slug}`}
              style={{
                position:       "relative",
                overflow:       "hidden",
                display:        "block",
                borderTop:      `1px solid ${C.border}`,
                borderLeft:     `3px solid ${active ? C.accent : "transparent"}`,
                textDecoration: "none",
                color:          "inherit",
                transition:     "border-left-color 0.3s ease",
              }}
              onMouseEnter={() => setActiveProject(project.num)}
              onMouseLeave={() => setActiveProject(null)}
              onFocus={() => setActiveProject(project.num)}
              onBlur={() => setActiveProject(null)}
            >
              {/* Background image on hover/focus */}
              <div style={{ position:"absolute", inset:0, zIndex:0, opacity: active ? 1 : 0, transition:"opacity 0.55s ease" }}>
                <img src={project.imageUrl} alt={project.imageAlt} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                <div style={{ position:"absolute", inset:0, background:project.overlay }} />
              </div>

              <div
                className="work-grid"
                style={{
                  position:            "relative",
                  zIndex:              1,
                  padding:             "44px 0 44px 16px",
                  display:             "grid",
                  gridTemplateColumns: "auto 1fr auto",
                  alignItems:          "end",
                  gap:                 "48px",
                  color:               active ? "#F5F2EC" : C.ink,
                  transition:          "color 0.4s ease",
                }}
              >
                <div>
                  <span style={{
                    display:       "block",
                    fontSize:      "10px",
                    fontWeight:    600,
                    letterSpacing: "0.14em",
                    marginBottom:  "6px",
                    color:         active ? "rgba(245,242,236,0.55)" : C.accent,
                    transition:    "color 0.3s ease",
                  }}>
                    {project.num} · {project.year}
                  </span>
                  <h2 style={{ fontFamily:displayFont, fontSize:"clamp(48px,7vw,120px)", fontWeight:700, lineHeight:0.88, letterSpacing:"-0.035em" }}>{project.title}</h2>
                </div>
                <div style={{ alignSelf:"center", paddingBottom:"6px" }}>
                  <p style={{ fontSize:"clamp(15px,1.5vw,18px)", fontWeight:400, lineHeight:1.55, maxWidth:"440px" }}>{project.statement}</p>
                  <p style={{ marginTop:"20px", fontSize:"10.5px", fontWeight:600, letterSpacing:"0.1em", opacity: active ? 0.65 : 0.38, transition:"opacity 0.3s ease" }}>{project.meta}</p>
                </div>
                <div style={{ alignSelf:"flex-end", paddingBottom:"6px" }}>
                  {/* Visible at rest (not hover-only) so clickability reads on a static view or touch device; sharpens on hover/focus. */}
                  <span style={{
                    fontSize:      "11px",
                    fontWeight:    700,
                    letterSpacing: "0.12em",
                    opacity:       active ? 1 : 0.32,
                    transform:     active ? "translateX(0)" : "translateX(10px)",
                    transition:    "opacity 0.3s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1)",
                    display:       "block",
                    whiteSpace:    "nowrap",
                  }}>
                    OPEN →
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
        <div style={{ borderTop:`1px solid ${C.border}` }} />
      </section>

      {/* ── OTHER THINGS ──────────────────────────────────────────────────── */}
      <section id="other-things" className="section-pad" ref={revealSide.ref} style={{ padding:"120px 48px", ...revealSide.revealStyle }}>
        <SectionHeading right="no subpages, just the work" marginBottom={56}>OTHER THINGS I&apos;VE MESSED WITH</SectionHeading>

        <div
          style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:"3px" }}
          className="side-projects-grid"
        >
          {SIDE_PROJECTS.map((sp, i) => (
            <div
              key={i}
              style={{
                gridColumn: sp.span === 2 ? "span 2" : "span 1",
                background:  sp.color,
                overflow:    "hidden",
                cursor:      "default",
                transition:  "filter 0.3s ease",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.filter = "brightness(0.97)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.filter = ""; }}
            >
              {/* Placeholder image area */}
              <div style={{ width:"100%", paddingTop: sp.aspect, background:`color-mix(in srgb, ${sp.color} 70%, #181614 30%)`, position:"relative" }}>
                <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span style={{ fontSize:"9px", fontWeight:600, letterSpacing:"0.16em", color:"rgba(24,22,20,0.25)", textTransform:"uppercase" }}>{sp.tag}</span>
                </div>
              </div>
              {/* Info */}
              <div style={{ padding:"24px 28px 28px" }}>
                <span style={{ display:"block", fontSize:"9.5px", fontWeight:700, letterSpacing:"0.14em", color:C.accent, marginBottom:"10px" }}>{sp.tag}</span>
                <p style={{ fontSize:"17px", fontWeight:700, letterSpacing:"-0.015em", color:C.ink, marginBottom:"10px", lineHeight:1.2 }}>{sp.title}</p>
                <p style={{ fontSize:"13.5px", fontWeight:400, color:C.dim, lineHeight:1.55 }}>{sp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────────────────── */}
      <section id="about" className="section-pad" ref={revealAbout.ref} style={{ padding:"120px 48px", borderTop:`1px solid ${C.border}`, ...revealAbout.revealStyle }}>
        <div className="about-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"80px", alignItems:"start", maxWidth:"1200px" }}>
          <div style={{ background:C.surface, aspectRatio:"4/5", display:"flex", alignItems:"flex-end", justifyContent:"flex-start", padding:"20px 24px" }}>
            <span style={{ fontSize:"10px", fontWeight:500, letterSpacing:"0.1em", color:C.muted }}>[PORTRAIT PHOTOGRAPH]</span>
          </div>
          <div>
            <h2 style={{ fontFamily:displayFont, fontSize:"clamp(44px,6vw,92px)", fontWeight:700, lineHeight:0.93, letterSpacing:"-0.035em", marginBottom:"44px" }}>HI, I&apos;M<br />SHANVI.</h2>
            <p style={{ fontSize:"clamp(16px,1.6vw,19px)", fontWeight:400, lineHeight:1.65, color:C.dim, marginBottom:"32px", maxWidth:"440px" }}>
              I&apos;m a product designer who likes figuring out why things work the way they do — and what happens when they don&apos;t.
            </p>
            <p style={{ fontSize:"clamp(15px,1.4vw,17px)", fontWeight:400, lineHeight:1.65, color:C.muted, marginBottom:"64px", maxWidth:"420px" }}>
              I make digital products, service systems, and the occasional zine. I care about research, craft, and the moment a user says "oh, I get it now."
            </p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"40px" }}>
              <div>
                <p style={{ fontSize:"10px", fontWeight:700, letterSpacing:"0.14em", color:C.muted, marginBottom:"18px" }}>INTERESTED IN</p>
                {["Products", "People", "Behaviour", "Systems", "Culture", "Technology"].map(item => (
                  <p key={item} style={{ fontSize:"15px", fontWeight:500, lineHeight:2.1, color:C.ink }}>{item}</p>
                ))}
              </div>
              <div>
                <p style={{ fontSize:"10px", fontWeight:700, letterSpacing:"0.14em", color:C.muted, marginBottom:"18px" }}>CURRENTLY</p>
                <p style={{ fontSize:"15px", fontWeight:500, color:C.muted, fontStyle:"italic", lineHeight:1.8 }}>[placeholder]</p>
                <p style={{ marginTop:"40px", fontSize:"10px", fontWeight:700, letterSpacing:"0.14em", color:C.muted, marginBottom:"18px" }}>EDUCATION</p>
                <p style={{ fontSize:"15px", fontWeight:500, color:C.ink, lineHeight:1.8 }}>[placeholder]</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── I'M CURIOUS ABOUT ─────────────────────────────────────────────── */}
      <section id="curious" className="section-pad" ref={revealCuriosities.ref} style={{ padding:"0 48px 120px", ...revealCuriosities.revealStyle }}>
        <SectionHeading>I&apos;M CURIOUS ABOUT...</SectionHeading>
        {CURIOSITIES.map((q, i) => (
          <div
            key={i}
            style={{
              padding:         "28px 0",
              borderBottom:    `1px solid ${C.border}`,
              borderLeft:      `3px solid ${hoveredCuriosity === i ? C.accent : "transparent"}`,
              paddingLeft:     hoveredCuriosity === i ? "22px" : "0px",
              transition:      "border-left-color 0.22s ease, padding-left 0.4s cubic-bezier(0.22,1,0.36,1)",
            }}
            onMouseEnter={() => setHoveredCuriosity(i)}
            onMouseLeave={() => setHoveredCuriosity(null)}
          >
            <p style={{
              fontFamily:    displayFont,
              fontSize:      "clamp(26px,3.8vw,50px)",
              fontWeight:    700,
              lineHeight:    1.18,
              letterSpacing: "-0.022em",
              color:         hoveredCuriosity === i ? C.accent : C.ink,
              maxWidth:      "880px",
              transition:    "color 0.22s ease",
              cursor:        "default",
            }}>
              {q}
            </p>
          </div>
        ))}
      </section>

      {/* ── CONTACT ───────────────────────────────────────────────────────── */}
      <section id="contact" className="section-pad" ref={revealContact.ref} style={{ padding:"120px 48px 100px", borderTop:`1px solid ${C.border}`, ...revealContact.revealStyle }}>
        <h2 style={{ fontFamily:displayFont, fontSize:"clamp(60px,10vw,156px)", fontWeight:700, lineHeight:0.88, letterSpacing:"-0.04em", marginBottom:"36px" }}>HAVE<br />SOMETHING<br />MESSY?</h2>
        <p style={{ fontSize:"clamp(17px,1.8vw,21px)", fontWeight:400, color:C.muted, marginBottom:"64px" }}>I&apos;d probably like it.</p>
        <div className="contact-links" style={{ display:"flex", gap:"48px", alignItems:"center", flexWrap:"wrap" }}>
          <a
            href="mailto:hello@shanvibhadauriya.com"
            style={{
              fontSize:        "clamp(18px,2.8vw,30px)",
              fontWeight:      800,
              letterSpacing:   "-0.02em",
              color:           C.ink,
              textDecoration:  "none",
              borderBottom:    `2.5px solid ${C.accent}`,
              paddingBottom:   "3px",
              transition:      "color 0.2s ease, letter-spacing 0.3s ease",
              display:         "inline-block",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = C.accent; e.currentTarget.style.letterSpacing = "-0.005em"; }}
            onMouseLeave={e => { e.currentTarget.style.color = C.ink;    e.currentTarget.style.letterSpacing = "-0.02em"; }}
          >
            LET&apos;S TALK ↗
          </a>
          <div style={{ display:"flex", gap:"28px" }}>
            {["LinkedIn ↗", "Instagram ↗", "Resume ↗"].map(link => (
              <a
                key={link}
                href="#"
                style={{ fontSize:"11.5px", fontWeight:500, letterSpacing:"0.07em", color:C.muted, textDecoration:"none", transition:"color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = C.ink)}
                onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
        <div style={{ marginTop:"120px" }}>
          <Footer padding="24px 0" />
        </div>
      </section>
    </div>
  );
}
