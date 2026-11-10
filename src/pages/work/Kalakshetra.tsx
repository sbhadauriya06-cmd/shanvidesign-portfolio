import { createPortal } from "react-dom";

/**
 * The Kalakshetra case study, exactly as designed in Figma ("Kalakshetra
 * Case", node 249:2125 on the "Mac & mobile" page): a 1440×37031 frame on
 * #F8F4EC with a fixed nav bar.
 *
 * The frame's 16 sections are exported at 2x, stacked and cut into
 * 1200px-tall slices so the page loads progressively; it scales with the page
 * width, like the homepage. The nav stays fixed at the top, as in the Figma
 * prototype, and its links (plus the "Scroll" cue and "Back to top") jump to
 * the sections they point to in Figma. Do not edit the content here: change it
 * in Figma and re-export (scratchpad tooling: kala.cjs).
 */

/** Slices of the frame, top to bottom, with their height in Figma px. */
const SLICES: [string, number][] = [
  ["01", 1200], ["02", 1200], ["03", 1200], ["04", 1200], ["05", 1200], ["06", 1200],
  ["07", 1200], ["08", 1200], ["09", 1200], ["10", 1200], ["11", 1200], ["12", 1200],
  ["13", 1200], ["14", 1200], ["15", 1200], ["16", 1200], ["17", 1200], ["18", 1200],
  ["19", 1200], ["20", 1200], ["21", 1200], ["22", 1200], ["23", 1200], ["24", 1200],
  ["25", 1200], ["26", 1200], ["27", 1200], ["28", 1200], ["29", 1200], ["30", 1200],
  ["31", 1031],
];

const FRAME_W = 1440;
const NAV_H = 64;

/** Nav links: label, hotspot x and width (Figma px), and the y of the section it scrolls to. */
const NAV: [string, number, number, number][] = [
  ["Context", 760, 52, 940],
  ["The gap", 840, 52, 2280],
  ["Visitors", 920, 59, 9100],
  ["Research", 1007, 59, 10900],
  ["Problem", 1094, 52, 18312],
  ["Proposal", 1174, 59, 21716],
  ["Outcomes", 1261, 59, 34646],
];

/** Other links drawn in the frame: label, x, y, w, h (Figma px), target y. */
const LINKS: [string, number, number, number, number, number][] = [
  ["Scroll to the introduction", 1240.71, 792.85, 70.86, 8.26, 940],
  ["Back to top", 1200.94, 36939.86, 108.46, 8.25, 0],
];

type Box = [number, number, number, number]; // x, y, w, h in Figma px

/**
 * The seven visitor reviews ("Not just us") have a hover state in Figma
 * (Review Card component, State=Hover, smart animate 350ms ease-out): the
 * screenshot zooms in, dims, the key sentence stays lit with a marker and an
 * underline, and a red tag names the problem. Rebuilt here from those layers:
 * card position and size, the zoomed image box, each highlight's default and
 * hover box (relative to the card), and the tag.
 */
const REVIEWS: { id: string; card: Box; img: Box; hl: [Box, Box][]; tag: string; tagW: number }[] = [
  { id: "2313", card: [120, 9540, 520, 215], img: [0, -137.75, 884, 365.5], tag: "“without much information”", tagW: 201,
    hl: [[[5.2, 135.02, 222.04, 18.49], [8.84, 91.78, 377.47, 31.43]]] },
  { id: "2315", card: [180, 9799, 500, 184], img: [-11.9, -116.99, 900, 331.2], tag: "“no information or guide available”", tagW: 245,
    hl: [[[62, 107.27, 167, 17.66], [99.7, 76.1, 300.6, 31.8]]] },
  { id: "2317", card: [120, 10028, 400, 208], img: [-61.3, -62.4, 520, 270.4], tag: "“Directional signage … would make an important difference”", tagW: 392,
    hl: [[[209.6, 110.45, 188.8, 22.88], [211.18, 81.18, 245.44, 29.74]], [[3.6, 128.34, 328.8, 22.88], [-56.62, 104.44, 427.44, 29.74]]] },
  { id: "2319", card: [160, 10280, 520, 202], img: [-15.27, -50.5, 650, 252.5], tag: "“missing information”", tagW: 163,
    hl: [[[5.2, 164.23, 430.04, 18.99], [-8.77, 154.78, 537.55, 23.74]]] },
  { id: "2321", card: [740, 9520, 540, 271], img: [-81.14, -151.52, 918, 460.7], tag: "“lack of guidance”", tagW: 136,
    hl: [[[107.46, 158.54, 198.18, 20.6], [101.55, 117.99, 336.91, 35.01]]] },
  { id: "2323", card: [720, 9835, 500, 179], img: [-192, -102.82, 850, 304.3], tag: "“lack of information placards”", tagW: 211,
    hl: [[[182, 104.36, 156, 17.54], [117.4, 74.59, 265.2, 29.82]]] },
  { id: "2325", card: [800, 10058, 460, 372], img: [-121.9, -186, 690, 558], tag: "“lack of guides”", tagW: 118,
    hl: [[[158.24, 182.65, 304.52, 22.32], [115.46, 87.98, 456.78, 33.48]], [[6.44, 196.42, 111.32, 22.32], [-112.24, 108.62, 166.98, 33.48]], [[204.24, 336.29, 198.72, 22.32], [184.46, 318.43, 298.08, 33.48]]] },
];

/** CSS variables for a box that moves between a default (0) and a hover (1) state. */
const boxVars = (a: Box, b: Box) =>
  ({ "--x0": a[0], "--y0": a[1], "--w0": a[2], "--h0": a[3], "--x1": b[0], "--y1": b[1], "--w1": b[2], "--h1": b[3] }) as React.CSSProperties;

function Review({ id, card, img, hl, tag, tagW }: (typeof REVIEWS)[number]) {
  const [, , w, h] = card;
  const src = `/kalakshetra/review-${id}.webp`;
  const whole: Box = [0, 0, w, h];
  return (
    <div className="kala-review" aria-hidden="true" style={{ left: `calc(${card[0]} * var(--u))`, top: `calc(${card[1]} * var(--u))`, width: `calc(${w} * var(--u))`, height: `calc(${h} * var(--u))` }}>
      <img className="kala-box" src={src} alt="" loading="lazy" decoding="async" style={boxVars(whole, img)} />
      <span className="kala-dim" />
      {hl.map(([a, b], i) => {
        // The lit window shows the same image, kept aligned with the one below.
        const win = boxVars([-a[0], -a[1], w, h], [img[0] - b[0], img[1] - b[1], img[2], img[3]]);
        return (
          <span key={i}>
            <span className="kala-box kala-hl" style={boxVars(a, b)}>
              <img className="kala-box" src={src} alt="" loading="lazy" decoding="async" style={win} />
              <span className="kala-marker" />
            </span>
            <span className="kala-box kala-underline" style={boxVars([a[0], a[1] + a[3], a[2], 3], [b[0], b[1] + b[3], b[2], 3])} />
          </span>
        );
      })}
      <span className="kala-tag" style={{ width: `calc(${tagW} * var(--u))` }}>{tag}</span>
    </div>
  );
}

const srcSet = (name: string) => `/kalakshetra/${name}.webp 1440w, /kalakshetra/${name}@2x.webp 2880w`;

/** Scroll so the frame's y (Figma px) sits at the top of the window, as Figma's "scroll to" does. */
function scrollToFrameY(e: React.MouseEvent, y: number) {
  e.preventDefault();
  const page = document.querySelector<HTMLElement>(".kala");
  if (!page) return;
  const top = page.getBoundingClientRect().top + window.scrollY + (y * page.clientWidth) / FRAME_W;
  const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top, behavior: calm ? "auto" : "smooth" });
}

const pct = (v: number, of: number) => `${(v / of) * 100}%`;

export default function Kalakshetra() {
  // The nav lives on <body>, so the page's entrance animation never moves it.
  const nav = (
    <nav className="kala-nav" aria-label="Case study sections">
      <img src="/kalakshetra/kala-nav.webp" srcSet={srcSet("kala-nav")} sizes="100vw" width={FRAME_W} height={NAV_H} alt="" />
      {NAV.map(([label, x, w, y]) => (
        <a
          key={label}
          href="#"
          className="kala-hotspot"
          aria-label={label}
          style={{ left: pct(x, FRAME_W), width: pct(w, FRAME_W), top: pct(22, NAV_H), height: pct(25, NAV_H) }}
          onClick={e => scrollToFrameY(e, y)}
        />
      ))}
    </nav>
  );

  return (
    <main className="case kala">
      <h1 className="case-sr">Kalakshetra case study</h1>
      {createPortal(nav, document.body)}

      {SLICES.map(([n, h], i) => (
        <img
          key={n}
          className="case-slice"
          src={`/kalakshetra/kala-${n}.webp`}
          srcSet={srcSet(`kala-${n}`)}
          sizes="100vw"
          width={FRAME_W}
          height={h}
          loading={i < 2 ? "eager" : "lazy"}
          decoding="async"
          alt=""
        />
      ))}

      {REVIEWS.map(r => <Review key={r.id} {...r} />)}

      {LINKS.map(([label, x, y, w, h, to]) => (
        <a
          key={label}
          href="#"
          className="kala-hotspot kala-link"
          aria-label={label}
          style={{ left: `calc(${x - 8} * var(--u))`, top: `calc(${y - 8} * var(--u))`, width: `calc(${w + 16} * var(--u))`, height: `calc(${h + 16} * var(--u))` }}
          onClick={e => scrollToFrameY(e, to)}
        />
      ))}
    </main>
  );
}
