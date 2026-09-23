import { useState } from "react";
import { C } from "../tokens";
import { HERO_OBJECTS } from "./heroObjects";
import { LETTER_BOX } from "./letterShapes";
import { getComposition, STAGGER_MS, type Placement } from "./compose";

// The stage keeps this fixed aspect ratio (see index.css .hero-object-stage),
// so a width-% and a height-% cover physically different pixel amounts.
// An object's height must be expressed as a % of the stage's height, not
// reused from its width-relative `size`, or images stretch.
const STAGE_ASPECT = LETTER_BOX.width / LETTER_BOX.height;

/**
 * One object: a real image if it loads, otherwise a quiet labeled
 * placeholder (never a substitute illustration) so the field is honest
 * about what's real content vs. awaiting an asset. Swapping in a real
 * image later needs no code change — just a matching file in
 * public/hero-objects/.
 */
function HeroObject({ id, image, alt }: { id: string; image: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center",
          border: `1px dashed ${C.border}`, borderRadius: "3px", background: "rgba(24,22,20,0.02)",
        }}
      >
        <span style={{ fontSize: "6px", fontWeight: 600, letterSpacing: "0.06em", color: C.muted, textAlign: "center", padding: "1px", textTransform: "uppercase" }}>
          {id}
        </span>
      </div>
    );
  }

  return (
    <img
      src={image}
      alt={alt}
      draggable={false}
      onError={() => setFailed(true)}
      style={{ width: "100%", height: "100%", objectFit: "contain", display: "block", pointerEvents: "none", userSelect: "none" }}
    />
  );
}

export default function HeroObjectField({ stateKey }: { stateKey: string }) {
  const composition = getComposition(stateKey);

  return (
    <div className="hero-object-stage">
      {HERO_OBJECTS.map(obj => {
        const p: Placement = composition[obj.id];
        const delay = STAGGER_MS[obj.id];
        // width is a % of stage width; convert the object's true height
        // (size / aspect, in the same units as width) into a % of stage
        // height so object-fit:contain never has to compensate for skew.
        const heightPct = (obj.size / obj.aspect) / STAGE_ASPECT;

        return (
          <div
            key={obj.id}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${obj.size}%`,
              height: `${heightPct}%`,
              transform: `translate(-50%,-50%) rotate(${p.r}deg) scale(${p.scale})`,
              zIndex: obj.z,
              transition: `left 1200ms cubic-bezier(0.34,0.1,0.16,1) ${delay}ms, top 1200ms cubic-bezier(0.34,0.1,0.16,1) ${delay}ms, transform 1200ms cubic-bezier(0.34,0.1,0.16,1) ${delay}ms`,
              willChange: "left, top, transform",
            }}
          >
            <HeroObject id={obj.id} image={obj.image} alt={obj.alt} />
          </div>
        );
      })}
    </div>
  );
}
