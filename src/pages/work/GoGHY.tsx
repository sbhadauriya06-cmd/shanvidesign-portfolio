/**
 * The GoGHY case study: the presentation slides from the GoGHY Figma file
 * ("presentation final sections" page), one after another with no gaps, in
 * this order: Context, Secondary Research, System Mappings, Primary Research,
 * Analysis, then the two "Solution" sections (left one first, as on the
 * canvas). Each 1280×720 slide is exported at 2x and shown at the page's
 * width. Change the slides in Figma and re-export (scratchpad: slides.cjs).
 */

const SLIDES = Array.from({ length: 44 }, (_, i) => String(i + 1).padStart(2, "0"));

export default function GoGHY() {
  return (
    <main className="slides">
      <h1 className="case-sr">GoGHY case study</h1>
      {SLIDES.map((n, i) => (
        <img
          key={n}
          src={`/goghy/goghy-${n}.webp`}
          srcSet={`/goghy/goghy-${n}.webp 1280w, /goghy/goghy-${n}@2x.webp 2560w`}
          sizes="100vw"
          width={1280}
          height={720}
          loading={i < 2 ? "eager" : "lazy"}
          decoding="async"
          alt=""
        />
      ))}
    </main>
  );
}
