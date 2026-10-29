import { useLayoutEffect, useRef, type CSSProperties } from "react";
import { OBJECTS } from "./objects";
import { LAYOUTS, type Mode } from "./layouts";
import PlaceholderArt from "./PlaceholderArt";
import { useIsMobile } from "./useIsMobile";

/**
 * The personal desk behind the headline. Purely presentational for now:
 * it renders each object at the authored position for the current mode and
 * breakpoint.
 *
 * Layout values are percentages of the hero. The stage measures itself and
 * exposes its pixel size as --hw / --hh, so every object's position and width
 * is plain CSS arithmetic and moves as a single `transform` — no layout work
 * while animating, and no JS per object.
 *
 * The stage is decorative (aria-hidden): the headline and navigation stay
 * real, focusable DOM.
 */
export default function DeskField({ mode }: { mode: Mode }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const layout = LAYOUTS[mode]?.[isMobile ? "mobile" : "desktop"] ?? {};

  // Measure before first paint so objects never flash at the wrong size.
  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const apply = () => {
      el.style.setProperty("--hw", `${el.clientWidth}px`);
      el.style.setProperty("--hh", `${el.clientHeight}px`);
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={stageRef} className="desk-stage" aria-hidden="true">
      {OBJECTS.map(obj => {
        const p = layout[obj.id];
        if (!p) return null;
        const style = {
          "--x": p.x, "--y": p.y, "--w": p.w, "--r": `${p.r}deg`,
          zIndex: p.z,
          aspectRatio: `${obj.w} / ${obj.h}`,
        } as CSSProperties;

        return (
          <div key={obj.id} className="desk-obj" data-object={obj.id} style={style}>
            {obj.kind === "photo" ? (
              <img src={obj.src} width={obj.w} height={obj.h} alt="" draggable={false} decoding="async" />
            ) : (
              <PlaceholderArt id={obj.id} />
            )}
          </div>
        );
      })}
    </div>
  );
}
