import { useParams, useNavigate, Link } from "react-router";
import { C } from "../tokens";
import { useReveal, useReadingProgress } from "../hooks";

// ─── Project data ─────────────────────────────────────────────────────────────

interface Section {
  heading: string;
  body:    string;
  imgLabel?: string;
}

interface WorkProject {
  num:      string;
  title:    string;
  year:     string;
  type:     string;
  role:     string;
  overview: string;
  challenge: string;
  sections: Section[];
  nextSlug:  string;
  nextTitle: string;
  prevSlug:  string;
  prevTitle: string;
  accent:    string;
}

const PROJECTS: Record<string, WorkProject> = {
  "kutir": {
    num:      "01",
    title:    "KUTIR",
    year:     "2024",
    type:     "PRODUCT DESIGN · UX/UI · STRATEGY",
    role:     "End-to-end product design: discovery system, maker profiles, checkout and communication flows.",
    overview: "A platform for discovering local makers and their work — built for the buyer who knows quality when they feel it.",
    challenge: "The Indian handmade economy is enormous. But buying directly from makers is still mediated by chance — a market visit, a recommendation, a lucky find on Instagram. Kutir was conceived to make discovery intentional. The deeper brief was about trust: how do you assess quality you cannot touch, provenance you cannot verify, and a maker whose story you don't yet know?",
    sections: [
      {
        heading:  "RESEARCH",
        body:     "We spoke to 22 buyers and 14 makers across craft categories: ceramics, textiles, leather, and handmade furniture. The central tension was trust. Buyers couldn't assess quality without touching the object; makers couldn't justify explaining provenance to every stranger who found them on an app. Discovery was the easy problem. Trust was the real one.",
        imgLabel: "Research synthesis map",
      },
      {
        heading:  "THE SYSTEM",
        body:     "We designed around three discovery modes: browsing by material, searching by maker, and a serendipitous 'wandering' feed. The maker profile became the centrepiece — not a marketplace listing, but a studio visit. Process photography, provenance of materials, limited runs flagged as they appear. The purchase flow was designed to encourage conversation over transaction.",
        imgLabel: "Maker profile screens",
      },
      {
        heading:  "OUTCOME",
        body:     "40 screens across discovery, purchase, and post-purchase flows. Usability tested with 8 target users across two rounds. Three distinct buyer personas emerged from research, each with meaningfully different paths through the experience. Prototype handed to development team with 60-page design documentation.",
        imgLabel: "Key screen flows",
      },
    ],
    nextSlug:  "kalakshetra",
    nextTitle: "KALAKSHETRA",
    prevSlug:  "udgam-branding",
    prevTitle: "UDGAM BRANDING",
    accent:    "#C2421F",
  },

  "kalakshetra": {
    num:      "02",
    title:    "KALAKSHETRA",
    year:     "2023",
    type:     "SERVICE DESIGN · RESEARCH · EDITORIAL",
    role:     "Service design research, communications audit, strategic frameworks. Solo researcher, 8 weeks.",
    overview: "Mapping what a classical arts institution communicates — and what it silently forgets.",
    challenge: "Kalakshetra Foundation, Chennai, has trained classical dancers for nearly a century. Its institutional reputation is immense within its world. But for anyone arriving from outside that world — a curious student, an international researcher, a first-time visitor — the institution is nearly invisible. The brief was to understand the gap between internal prestige and external legibility, and to propose what a contemporary communications strategy might look like.",
    sections: [
      {
        heading:  "THE AUDIT",
        body:     "A systematic communications audit across all touchpoints: web presence, printed prospectus, public programming calendar, social channels, and on-campus visitor experience. The gap was stark. The institution communicated primarily to people who already understood it. Everything assumed prior knowledge — of the tradition, of the pedagogy, of the geography.",
        imgLabel: "Communications audit diagram",
      },
      {
        heading:  "FIELD WORK",
        body:     "Three weeks in Chennai. Conversations with current students, administrative staff, working alumni, and curious visitors who had arrived with incorrect expectations. The oral tradition of the institution was extraordinarily rich — the recorded, designed, findable version of that tradition was nearly absent. The institution's own story existed largely in the memories of people who had been there.",
        imgLabel: "Field research notes",
      },
      {
        heading:  "FRAMEWORKS",
        body:     "A set of communication frameworks: audience segmentation by proximity to the tradition, a content principles document, and a proposed editorial calendar. A speculative redesign of three key touchpoints — the student prospectus, the public event poster, and the first-time visitor experience on campus. Each redesign was grounded in the audit and tested through informal feedback sessions.",
        imgLabel: "Redesign proposals",
      },
    ],
    nextSlug:  "goghy",
    nextTitle: "GoGHY",
    prevSlug:  "kutir",
    prevTitle: "KUTIR",
    accent:    "#4A3A6A",
  },

  "goghy": {
    num:      "03",
    title:    "GoGHY",
    year:     "2024",
    type:     "PRODUCT DESIGN · BRAND · UX/UI",
    role:     "Product design and UX/UI. Collaborated with one developer. 10 weeks.",
    overview: "A fitness app that doesn't pretend becoming healthy is simple, satisfying, or linear.",
    challenge: "Most fitness apps optimise for streaks and gamification — behavioural techniques that work until they catastrophically don't. GoGHY was designed for a different kind of user: someone who already knows what they should do, and keeps not doing it. The design problem was motivation at zero. Not the excited new user, but the one who's been here before.",
    sections: [
      {
        heading:  "BEHAVIOURAL RESEARCH",
        body:     "Desk research into motivation science, habit formation, and relapse patterns in health behaviour change. Interviews with 12 people who had 'tried and stopped' multiple fitness apps. The common thread: the apps made failure feel dramatic. Missing a day triggered visible penalties — lost streaks, missed milestones, comparison data that now showed you falling behind. The apps optimised for engagement by punishing disengagement.",
        imgLabel: "Research and insight cards",
      },
      {
        heading:  "DESIGN PRINCIPLES",
        body:     "No streaks. No leaderboards. No social comparison features. Progress tracked exclusively against personal history, displayed with intentional ambiguity — directional trends rather than precise numbers. Notifications strictly opt-in, with suggested phrasing designed to feel like a reminder from a friend rather than a system alert. The interface designed to take up as little mental space as possible.",
        imgLabel: "Design principles documentation",
      },
      {
        heading:  "OUTCOME",
        body:     "A beta tested with 40 users over 8 weeks. Retention at the 4-week mark was 68%, against an industry average closer to 24%. Self-reported guilt on missed days — measured via exit interviews — dropped significantly compared to reported previous app experiences. The key learning: designing for the low-motivation state improved the high-motivation experience too.",
        imgLabel: "Beta testing results",
      },
    ],
    nextSlug:  "reframe-india",
    nextTitle: "REFRAME INDIA",
    prevSlug:  "kalakshetra",
    prevTitle: "KALAKSHETRA",
    accent:    "#2A5040",
  },

  "reframe-india": {
    num:      "04",
    title:    "REFRAME INDIA",
    year:     "2023",
    type:     "RESEARCH · EDITORIAL DESIGN · SYSTEMS",
    role:     "Research, editorial design, content systems. Part of a 3-person team.",
    overview: "What does India look like when you stop reaching for the familiar image?",
    challenge: "India's visual representation in mainstream international media collapses regularly into a small set of images: the overwhelming crowd, the saturated colour, the abject poverty, the spectacular spirituality. These archetypes are not inaccurate — but they are extremely selective. Reframe India was a research-editorial project asking what images get made — and chosen — when those archetypes are actively resisted.",
    sections: [
      {
        heading:  "THE STUDY",
        body:     "We analysed 400+ magazine covers, news features, and travel editorials from 2010–2023, sourced from 18 international and national publications. Each image was tagged by subject matter, compositional type, photographer nationality, and whether it could be traced to a known visual archetype. The patterns were stark: 78% of international features drew from the same visual vocabulary, irrespective of what the story was actually about.",
        imgLabel: "Data analysis visualisations",
      },
      {
        heading:  "THE COUNTER-ARCHIVE",
        body:     "We assembled a counter-archive of 200+ images from Indian documentary photographers working outside mainstream editorial channels — artists whose practice was rooted in specificity, locality, and the particular rather than the representative. This archive became the visual argument of the project: these images exist and are being made. They are simply not being selected.",
        imgLabel: "Counter-archive spreads",
      },
      {
        heading:  "EDITORIAL OUTPUT",
        body:     "A designed zine-format publication presenting the methodology, the data visualisations, and selections from the counter-archive. A poster series extracting 5 key statistics for exhibition contexts. An open-source content brief for photo editors and commissioning editors who want to do this differently. The zine was distributed at 3 design and journalism events.",
        imgLabel: "Final zine and poster series",
      },
    ],
    nextSlug:  "udgam-branding",
    nextTitle: "UDGAM BRANDING",
    prevSlug:  "goghy",
    prevTitle: "GoGHY",
    accent:    "#8A4A20",
  },

  "udgam-branding": {
    num:      "05",
    title:    "UDGAM BRANDING",
    year:     "2024",
    type:     "BRAND IDENTITY · VISUAL DESIGN · TYPOGRAPHY",
    role:     "Brand identity: logo, typography system, colour palette, collateral applications, guidelines. 6 weeks.",
    overview: "Identity for a design studio whose name is Sanskrit for 'source' — and whose work returns to it.",
    challenge: "Udgam is a Pune-based studio working at the intersection of design, craft, and education. They needed an identity that felt rooted without becoming decorative, contemporary without rejecting heritage. The brief explicitly placed applying Indian visual motifs off the table — they had seen too many 'Indian design studios' reach for lotus flowers and block-print textures. The question was: what does rootedness mean when it is not ornamental?",
    sections: [
      {
        heading:  "THE BRIEF INSIDE THE BRIEF",
        body:     "What does 'rooted' mean if not pattern and ornament? We spent the first two weeks on this question. The answer arrived through typography — specifically the structural logic of the Devanagari script: the shirorekha (the defining horizontal headline stroke), the modular unit system, the distinctive balance between weight and air within a character. These structural principles became the organising logic for the Latin identity, without mimicking the script.",
        imgLabel: "Type exploration studies",
      },
      {
        heading:  "THE SYSTEM",
        body:     "A wordmark built on a custom-drawn geometric typeface with echoes of Devanagari's horizontal discipline — strong caplines, controlled modulation, deliberate negative space. A three-colour palette: deep indigo, warm cream, terracotta. A grid system whose proportions are derived from classical Sanskrit manuscript formats. All collateral — letterhead, invoice, packaging, signage — designed as a single coherent system from the same proportional logic.",
        imgLabel: "Identity system in use",
      },
      {
        heading:  "OUTCOME",
        body:     "Full identity system: primary and secondary marks, typographic hierarchy, colour system, photography brief, and application guidelines document. Applied across website, printed business collateral, social media presence, and studio physical signage. The client described it as 'feeling like it came from somewhere' — which was exactly the brief.",
        imgLabel: "Collateral applications",
      },
    ],
    nextSlug:  "kutir",
    nextTitle: "KUTIR",
    prevSlug:  "reframe-india",
    prevTitle: "REFRAME INDIA",
    accent:    "#3A3A6A",
  },
};

// ─── Image placeholder ────────────────────────────────────────────────────────

function ImgBlock({ label, tall }: { label: string; tall?: boolean }) {
  return (
    <div
      style={{
        width:          "100%",
        paddingTop:     tall ? "66%" : "56%",
        background:     C.surface,
        position:       "relative",
        borderRadius:   "2px",
      }}
    >
      <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"flex-end", padding:"16px 20px" }}>
        <span style={{ fontSize:"9px", fontWeight:600, letterSpacing:"0.14em", color:C.muted }}>{label.toUpperCase()}</span>
      </div>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function WorkDetail() {
  const { slug }    = useParams<{ slug: string }>();
  const navigate    = useNavigate();
  const project     = slug ? PROJECTS[slug] : undefined;
  const progress    = useReadingProgress();
  const revealOver  = useReveal(60);
  const revealSects = [useReveal(), useReveal(80), useReveal(160)] as const;
  const revealFull  = useReveal();
  const revealRef   = useReveal();
  const revealNav   = useReveal();

  if (!project) {
    return (
      <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", padding:"0 48px" }}>
        <p style={{ fontSize:"11px", fontWeight:600, letterSpacing:"0.14em", color:C.muted, marginBottom:"24px" }}>PROJECT NOT FOUND</p>
        <Link to="/" style={{ fontSize:"20px", fontWeight:800, letterSpacing:"-0.02em", color:C.ink, textDecoration:"none", borderBottom:`2px solid ${C.accent}` }}>← BACK TO INDEX</Link>
      </div>
    );
  }

  return (
    <div>

      {/* Reading progress bar */}
      <div style={{
        position:   "fixed",
        top:        0,
        left:       0,
        zIndex:     200,
        height:     "2px",
        width:      `${progress}%`,
        background: project.accent,
        transition: "width 0.08s linear",
        pointerEvents: "none",
      }} />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section style={{ padding:"140px 48px 80px", borderBottom:`1px solid ${C.border}` }}>

        {/* Back + number */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:"80px" }} className="hero-in">
          <button
            onClick={() => navigate("/")}
            style={{ fontSize:"11px", fontWeight:600, letterSpacing:"0.12em", color:C.muted, background:"none", border:"none", cursor:"pointer", padding:0, transition:"color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = C.ink)}
            onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
          >
            ← WORK
          </button>
          <span style={{ fontSize:"11px", fontWeight:600, letterSpacing:"0.14em", color:C.muted }}>{project.num} / 05</span>
        </div>

        {/* Meta + accent line */}
        <div style={{ display:"flex", alignItems:"center", gap:"20px", marginBottom:"36px" }} className="hero-in">
          <div style={{ width:"32px", height:"2px", background:project.accent, flexShrink:0 }} />
          <span style={{ fontSize:"10.5px", fontWeight:600, letterSpacing:"0.12em", color:project.accent }}>{project.year}</span>
          <span style={{ fontSize:"10px", color:C.border }}>·</span>
          <span style={{ fontSize:"10.5px", fontWeight:600, letterSpacing:"0.1em", color:C.muted }}>{project.type}</span>
        </div>

        {/* Title */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", alignItems:"end", gap:"48px" }} className="work-grid hero-in-late">
          <h1
            style={{ fontSize:"clamp(72px,10vw,160px)", fontWeight:800, lineHeight:0.88, letterSpacing:"-0.04em", color:C.ink }}
          >
            {project.title}
          </h1>
          <div>
            <p style={{ fontSize:"clamp(18px,2vw,24px)", fontWeight:400, lineHeight:1.55, color:C.dim, maxWidth:"480px" }}>
              {project.overview}
            </p>
          </div>
        </div>
      </section>

      {/* ── Overview strip ────────────────────────────────────────────────── */}
      <section ref={revealOver.ref} style={{ padding:"80px 48px", borderBottom:`1px solid ${C.border}`, background:C.surface, ...revealOver.revealStyle }}>
        <div style={{ display:"grid", gridTemplateColumns:"200px 1fr", gap:"80px", maxWidth:"1100px" }} className="work-grid">
          <div>
            <p style={{ fontSize:"10px", fontWeight:700, letterSpacing:"0.14em", color:C.muted, marginBottom:"16px" }}>ROLE</p>
            <p style={{ fontSize:"14.5px", fontWeight:400, color:C.dim, lineHeight:1.7 }}>{project.role}</p>
          </div>
          <div>
            <p style={{ fontSize:"10px", fontWeight:700, letterSpacing:"0.14em", color:C.muted, marginBottom:"16px" }}>THE PROBLEM</p>
            <p style={{ fontSize:"clamp(16px,1.6vw,19px)", fontWeight:400, color:C.ink, lineHeight:1.7, maxWidth:"680px" }}>{project.challenge}</p>
          </div>
        </div>
      </section>

      {/* ── Process sections ──────────────────────────────────────────────── */}
      {project.sections.map((section, i) => (
        <section
          key={i}
          ref={revealSects[i]?.ref}
          style={{ padding:"96px 48px", borderBottom:`1px solid ${C.border}`, ...(revealSects[i]?.revealStyle ?? {}) }}
        >
          <div style={{ display:"flex", alignItems:"center", gap:"16px", marginBottom:"56px" }}>
            <span style={{
              fontSize:      "10px",
              fontWeight:    700,
              letterSpacing: "0.18em",
              color:         project.accent,
              fontVariantNumeric: "tabular-nums",
            }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <div style={{ width:"40px", height:"1px", background:project.accent, opacity:0.4 }} />
            <h2
              style={{ fontSize:"clamp(22px,3vw,38px)", fontWeight:800, letterSpacing:"-0.022em", color:C.ink }}
            >
              {section.heading}
            </h2>
          </div>

          <div
            style={{ display:"grid", gridTemplateColumns: i % 2 === 0 ? "1fr 1fr" : "1fr 1fr", gap:"56px", alignItems:"start" }}
            className="work-grid"
          >
            {i % 2 === 0 ? (
              <>
                <div>
                  <p style={{ fontSize:"clamp(15px,1.5vw,18px)", fontWeight:400, lineHeight:1.75, color:C.dim }}>{section.body}</p>
                </div>
                <ImgBlock label={section.imgLabel ?? section.heading} tall />
              </>
            ) : (
              <>
                <ImgBlock label={section.imgLabel ?? section.heading} tall />
                <div>
                  <p style={{ fontSize:"clamp(15px,1.5vw,18px)", fontWeight:400, lineHeight:1.75, color:C.dim }}>{section.body}</p>
                </div>
              </>
            )}
          </div>
        </section>
      ))}

      {/* ── Full-width image ──────────────────────────────────────────────── */}
      <section ref={revealFull.ref} style={{ padding:"0", ...revealFull.revealStyle }}>
        <div style={{ width:"100%", paddingTop:"42%", background:C.surface, position:"relative", borderTop:`1px solid ${C.border}` }}>
          <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ fontSize:"10px", fontWeight:600, letterSpacing:"0.18em", color:C.muted }}>KEY VISUAL · DELIVERABLE</span>
          </div>
        </div>
      </section>

      {/* ── Reflection ────────────────────────────────────────────────────── */}
      <section ref={revealRef.ref} style={{ padding:"96px 48px", borderBottom:`1px solid ${C.border}`, borderTop:`1px solid ${C.border}`, ...revealRef.revealStyle }}>
        <div style={{ display:"flex", alignItems:"flex-start", gap:"40px", maxWidth:"860px" }}>
          <div style={{ width:"3px", background:project.accent, flexShrink:0, alignSelf:"stretch", minHeight:"60px" }} />
          <div>
            <p style={{ fontSize:"10px", fontWeight:700, letterSpacing:"0.14em", color:C.muted, marginBottom:"24px" }}>WHAT I LEARNED</p>
            <p style={{ fontSize:"clamp(22px,2.8vw,34px)", fontWeight:700, lineHeight:1.35, letterSpacing:"-0.02em", color:C.ink }}>
              [Space for a reflection or key insight — add the sentence that made this project worthwhile.]
            </p>
          </div>
        </div>
      </section>

      {/* ── Navigation: prev / next ───────────────────────────────────────── */}
      <section ref={revealNav.ref} style={{ display:"grid", gridTemplateColumns:"1fr 1fr", ...revealNav.revealStyle }}>
        <div
          style={{ padding:"56px 48px", borderRight:`1px solid ${C.border}`, borderTop:`1px solid ${C.border}`, cursor:"pointer", transition:"background 0.25s ease" }}
          onClick={() => navigate(`/work/${project.prevSlug}`)}
          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = C.surface; }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = ""; }}
        >
          <p style={{ fontSize:"10px", fontWeight:600, letterSpacing:"0.12em", color:C.muted, marginBottom:"14px" }}>← PREVIOUS</p>
          <p style={{ fontSize:"clamp(20px,2.8vw,36px)", fontWeight:800, letterSpacing:"-0.03em", color:C.ink, lineHeight:1.05 }}>{project.prevTitle}</p>
        </div>
        <div
          style={{ padding:"56px 48px", borderTop:`1px solid ${C.border}`, cursor:"pointer", transition:"background 0.25s ease", textAlign:"right" }}
          onClick={() => navigate(`/work/${project.nextSlug}`)}
          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = C.surface; }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = ""; }}
        >
          <p style={{ fontSize:"10px", fontWeight:600, letterSpacing:"0.12em", color:C.muted, marginBottom:"14px" }}>NEXT →</p>
          <p style={{ fontSize:"clamp(20px,2.8vw,36px)", fontWeight:800, letterSpacing:"-0.03em", color:C.ink, lineHeight:1.05 }}>{project.nextTitle}</p>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <div
        style={{ padding:"24px 48px", display:"flex", justifyContent:"space-between", alignItems:"center", borderTop:`1px solid ${C.border}` }}
        className="footer-row"
      >
        <span style={{ fontSize:"10px", fontWeight:600, letterSpacing:"0.14em", color:C.muted }}>SHANVI BHADAURIYA</span>
        <span style={{ fontSize:"10px", fontWeight:500, letterSpacing:"0.08em", color:C.muted }}>PRODUCT DESIGNER</span>
      </div>
    </div>
  );
}
