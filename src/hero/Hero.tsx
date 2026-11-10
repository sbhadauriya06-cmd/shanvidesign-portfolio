import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { FRAMES, OVERSCAN, SHADOWED, type ItemId, type Mode } from "./layout";
import { useIsPortrait } from "./useIsMobile";
import Notebook from "../components/Notebook";

const TEXT: ItemId[] = ["role", "verb", "shanvi", "bhadauriya"];

export default function Hero() {
  const [mode, setMode] = useState<Mode>("chaos");
  const [moving, setMoving] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const mobile = useIsPortrait();
  const frame = FRAMES[mobile ? "mobile" : "desktop"][mode];

  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    // The Figma frame, scaled to the page width: every object keeps its exact
    // position and size relative to the frame, at any screen size.
    const apply = () => el.style.setProperty("--s", String(el.clientWidth / frame.width));
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
  }, [frame.width]);

  // Objects only animate for a mode change, never while the window resizes.
  const toggle = () => {
    setMoving(true);
    setMode(m => (m === "chaos" ? "order" : "chaos"));
    window.setTimeout(() => setMoving(false), 850);
  };

  const items = frame.rows.map(([id, cx, cy, w, h, r], z) => {
    const style = { "--cx": cx, "--cy": cy, "--w": w, "--h": h, "--r": `${r}deg`, zIndex: z } as CSSProperties;
    return { id, style };
  });
  const styleOf = (id: ItemId) => items.find(i => i.id === id)!.style;

  return (
    <section className={`hero ${mode === "order" ? "is-order" : ""}`} style={{ aspectRatio: `${frame.width} / ${frame.height}` }}>
      <div ref={stageRef} className={`hero-stage ${moving ? "is-moving" : ""}`}>
        {items.filter(i => !TEXT.includes(i.id) && i.id !== "toggle").map(({ id, style }) => {
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

        <button
          type="button"
          role="switch"
          aria-checked={mode === "order"}
          aria-label="Tidy the desk"
          className="hero-toggle"
          style={styleOf("toggle")}
          onClick={toggle}
        >
          <span className="hero-toggle-knob" />
        </button>
      </div>
    </section>
  );
}
