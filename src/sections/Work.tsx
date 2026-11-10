import { useState, type CSSProperties } from "react";
import { Link } from "react-router";
import { useIsMobile } from "../hero/useIsMobile";

/** left, top, width, height in the Figma frame's pixels; `grow` = hover scale */
type Layer = { src: string; x: number; y: number; w: number; h: number; grow?: number };

// Placeholder copy, as in Figma, until the real descriptions are written.
const LOREM = "LoremIpsum LoremIpsum LoremIpsum LoremIpsum LoremIpsum LoremIpsum LoremIpsum LoremIpsum";

const PROJECTS: { slug: string; title: string; text: string; cover: string; preview: Layer[] }[] = [
  {
    slug: "kutir", title: "Kutir", cover: "cover-kutir",
    text: "A unified platform leveraging AI and transparency to maximize resident engagement and trust.",
    preview: [
      { src: "kutir-back", x: 863, y: 320.2, w: 503, h: 188.4 },
      { src: "kutir-phone1", x: 894, y: 75, w: 138, h: 328, grow: 1.12 },
      { src: "kutir-phone2", x: 1037, y: 98, w: 137, h: 326, grow: 1.12 },
    ],
  },
  {
    slug: "kalakshetra", title: "Kalakshetra", cover: "cover-kala", text: LOREM,
    preview: [
      { src: "kala-back", x: 929, y: 206, w: 463, h: 412 },
      { src: "kala-phones", x: 844, y: 294, w: 416, h: 414, grow: 1.22 },
    ],
  },
  {
    slug: "reframe-india", title: "Reframe", cover: "cover-reframe", text: LOREM,
    preview: [
      { src: "reframe-back", x: 1000, y: 328, w: 392, h: 272 },
      { src: "reframe-phone1", x: 869.3, y: 431.3, w: 181.5, h: 379.5, grow: 1.09 },
      { src: "reframe-phone2", x: 1053.3, y: 502.3, w: 181.5, h: 379.5, grow: 1.09 },
    ],
  },
  {
    slug: "goghy", title: "GoGHY", cover: "cover-goghy", text: LOREM,
    preview: [
      { src: "goghy-back", x: 886, y: 519, w: 527.5, h: 283.5 },
      { src: "goghy-stand", x: 881, y: 565, w: 206, h: 363 },
      { src: "goghy-board", x: 953, y: 578, w: 98, h: 350, grow: 1.11 },
    ],
  },
];

function WorkMobile() {
  return (
    <div className="work-m">
      <div className="section-head"><h2>WORK</h2><span>2025-26</span></div>
      <div className="work-m-list">
        {PROJECTS.map(p => (
          <Link key={p.slug} to={`/work/${p.slug}`} className="work-m-card">
            <img src={`/site/${p.cover}.webp`} width={640} height={640} alt="" loading="lazy" />
            <h3>{p.title}</h3>
            <p>{p.text}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

function WorkDesktop() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className={`work ${active !== null ? "is-lit" : ""}`} onMouseLeave={() => setActive(null)}>
      <div className="section-head"><h2>WORK</h2><span>2025-26</span></div>

      <div className="work-rows">
        {PROJECTS.map((p, i) => (
          <Link
            key={p.slug}
            to={`/work/${p.slug}`}
            className={`work-row ${active === i ? "is-active" : ""}`}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
          >
            <span className="work-row-box" />
            <span className="work-row-body">
              <img src={`/site/${p.cover}.webp`} width={640} height={640} alt="" loading="lazy" />
              <span className="work-row-text">
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </span>
            </span>
          </Link>
        ))}
      </div>

      {PROJECTS.map((p, i) => (
        <Link key={p.slug} to={`/work/${p.slug}`} className={`work-preview ${active === i ? "is-on" : ""}`} tabIndex={-1} aria-hidden="true">
          {p.preview.map(l => (
            <img
              key={l.src}
              src={`/site/${l.src}.webp`}
              alt=""
              loading="lazy"
              className={l.grow ? "can-grow" : undefined}
              style={{ "--x": l.x, "--y": l.y, "--w": l.w, "--h": l.h, "--grow": l.grow ?? 1 } as CSSProperties}
            />
          ))}
        </Link>
      ))}
    </div>
  );
}

export default function Work() {
  const mobile = useIsMobile();
  return <section id="work" className="fig-section">{mobile ? <WorkMobile /> : <WorkDesktop />}</section>;
}
