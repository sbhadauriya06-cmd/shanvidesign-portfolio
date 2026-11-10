/**
 * The Kutir case study, exactly as designed in Figma ("Kutir Case", node
 * 256:3676 on the "Mac & mobile" page): a 1440×43498 frame on black.
 *
 * The opening hero is rebuilt from its own layers (photo, logo, laptop and
 * fades baked into one image, the three detail chips as real text). Everything
 * below it is the frame itself, exported at 2x and cut into 1200px-tall
 * slices so it loads progressively. It scales with the page width, like the
 * homepage sections. Do not edit the content here: change it in Figma and
 * re-export (scratchpad tooling: kutir.cjs).
 */

/** Slices of the frame below the hero, top to bottom, with their height in Figma px. */
const SLICES: [string, number][] = [
  ["01", 1200], ["02", 1200], ["03", 1200], ["04", 1200], ["05", 1200], ["06", 1200],
  ["07", 1200], ["08", 1200], ["09", 1200], ["10", 1200], ["11", 1200], ["12", 1200],
  ["13", 1200], ["14", 1200], ["15", 1200], ["16", 1200], ["17", 1200], ["18", 1200],
  ["19", 1200], ["20", 1200], ["21", 1200], ["22", 1200], ["23", 1200], ["24", 1200],
  ["25", 1200], ["26", 1200], ["27", 1200], ["28", 1200], ["29", 1200], ["30", 1200],
  ["31", 1200], ["32", 1200], ["33", 1200], ["34", 1200], ["35", 1200], ["36", 158],
];

const CHIPS: [string, string, number][] = [
  ["Domain", "UI UX", 867],
  ["Duration", "6 + 2 weeks", 978],
  ["Location", "Bhopal, MP", 1089],
];

const srcSet = (name: string) => `/kutir/${name}.webp 1440w, /kutir/${name}@2x.webp 2880w`;

export default function Kutir() {
  return (
    <main className="case">
      <h1 className="case-sr">Kutir case study</h1>

      <div className="case-hero">
        <img src="/kutir/kutir-hero.webp" srcSet={srcSet("kutir-hero")} sizes="100vw" width={1440} height={1340} alt="" />
        {CHIPS.map(([label, value, y]) => (
          <div key={label} className="case-chip" style={{ top: `calc(${y} * var(--u))` }}>
            <p className="case-chip-label">{label}</p>
            <p className="case-chip-value">{value}</p>
          </div>
        ))}
      </div>

      {SLICES.map(([n, h], i) => (
        <img
          key={n}
          className="case-slice"
          src={`/kutir/kutir-${n}.webp`}
          srcSet={srcSet(`kutir-${n}`)}
          sizes="100vw"
          width={1440}
          height={h}
          loading={i < 2 ? "eager" : "lazy"}
          decoding="async"
          alt=""
        />
      ))}
    </main>
  );
}
