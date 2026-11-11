import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { FRAMES, OVERSCAN, SHADOWED, type ItemId } from "./layout";
import { useIsMobile } from "./useIsMobile";
import Notebook from "../components/Notebook";

const TEXT: ItemId[] = ["role", "verb", "shanvi", "bhadauriya"];

/** Extra scrolling, in viewport heights, over which the desk tidies itself. */
const TIDY_DISTANCE = 1.2;

export default function Hero() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  // Same switch as the sections below, so the mobile page always gets the mobile hero.
  const mobile = useIsMobile();
  const frames = FRAMES[mobile ? "mobile" : "desktop"];
  const { chaos, order } = frames;
  // Past halfway, the pile takes the Order frame's layer order.
  const [tidy, setTidy] = useState(false);

  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    // The Figma frame, scaled to the page width: every object keeps its exact
    // position and size relative to the frame, at any screen size.
    const apply = () => el.style.setProperty("--s", String(el.clientWidth / chaos.width));
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
  }, [chaos.width]);

  // The hero stays on screen (sticky) while the page scrolls through the tall
  // wrapper around it; that scroll is the tidying, from Chaos (0) to Order (1).
  // Once it's done, the page carries on to the sections below.
  useEffect(() => {
    const wrap = scrollRef.current, hero = heroRef.current;
    if (!wrap || !hero) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      // The stretch where the hero is pinned: the wrapper's extra height.
      const range = wrap.offsetHeight - hero.offsetHeight;
      const p = range > 0 ? Math.min(1, Math.max(0, -wrap.getBoundingClientRect().top / range)) : 0;
      hero.style.setProperty("--p", p.toFixed(4));
      setTidy(p >= 0.5);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [mobile]);

  // One fixed order of objects in the page (the Chaos frame's); the current
  // half of the scroll only picks each object's z-index. Reordering elements
  // would make React move them around the page.
  const layer = tidy ? order : chaos;
  const items = chaos.rows.filter(([id]) => id !== "toggle").map(([id, cx, cy, w, h, r]) => {
    const to = order.rows.find(row => row[0] === id)!;
    const style = {
      "--cx0": cx, "--cy0": cy, "--w0": w, "--h0": h, "--r0": r,
      "--cx1": to[1], "--cy1": to[2], "--w1": to[3], "--h1": to[4], "--r1": to[5],
      zIndex: layer.rows.findIndex(row => row[0] === id),
    } as CSSProperties;
    return { id, style };
  });
  const styleOf = (id: ItemId) => items.find(i => i.id === id)!.style;

  return (
    <div ref={scrollRef} className="hero-scroll" style={{ "--tidy": TIDY_DISTANCE, "--fh": chaos.height } as CSSProperties}>
      <section ref={heroRef} className="hero" style={{ aspectRatio: `${chaos.width} / ${chaos.height}` }}>
        <div className="hero-stage">
          {items.filter(i => !TEXT.includes(i.id)).map(({ id, style }) => {
            const over = OVERSCAN[id];
            return (
              <div key={id} className="hero-obj" style={style} aria-hidden="true">
                {id === "notebook" ? (
                  <Notebook>
                    <div className="notebook-note">
                      <p>i figure things out!</p>
                      <ul><li>21</li><li>puzzles</li><li>month-end budget</li><li>systems !</li><li>complex ones too</li></ul>
                    </div>
                  </Notebook>
                ) : (
                  <img
                    src={`/site/${id}.webp`}
                    alt=""
                    draggable={false}
                    className={SHADOWED.includes(id) ? "has-shadow" : undefined}
                    style={over ? { position: "absolute", left: "50%", top: "50%", width: `${over[0] * 100}%`, height: `${over[1] * 100}%`, transform: "translate(-50%,-50%)" } : undefined}
                  />
                )}
              </div>
            );
          })}

          <h1 className="hero-title">
            <span className="hero-text hero-name" style={styleOf("shanvi")}>Shanvi</span>{" "}
            <span className="hero-text hero-name" style={styleOf("bhadauriya")}>Bhadauriya</span>
          </h1>
          <p className="hero-text hero-role" style={styleOf("role")}>Product Design</p>
          <p className="hero-text hero-verb" style={styleOf("verb")}>verb &amp; noun</p>
        </div>
      </section>
    </div>
  );
}
