import { useEffect, useRef, useState, type CSSProperties } from "react";
import Notebook from "../components/Notebook";

/** Where each polaroid sits around the disc: card id, left, top (Figma pixels, relative to the disc). */
const CARDS: [number, number, number][] = [
  [15, 548, 111], [16, 785, 212], [17, 610, 401], [18, 503, 515], [19, 237, 645],
  [20, 18, 491], [21, -214, 584], [22, -149, 275], [23, 0, 65], [24, -256, 65],
  [25, -107, -141], [26, 182, -243], [27, 371, -92], [28, 585, -187],
];

/** Which polaroids are showing at each 30° of the turn. */
const STEPS: number[][] = [
  [27], [27, 26, 23, 25], [26, 24, 23, 25], [22, 24, 23], [20, 21, 22, 23], [19, 20, 21],
  [19, 20, 18], [19, 17, 18], [16, 17, 18], [15, 16, 17], [28, 27, 15], [28, 27, 26, 15],
];

const STEP_MS = 300;

export default function OtherThings() {
  // 0 = at rest; 1..12 = the steps of one full turn.
  const [step, setStep] = useState(0);
  const [turns, setTurns] = useState(0);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearInterval(timer.current), []);

  const spin = () => {
    if (step !== 0) return;
    // With reduced motion the polaroids still appear, but the disc stays still.
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let n = 0;
    const tick = () => {
      n += 1;
      if (n > STEPS.length) {
        window.clearInterval(timer.current);
        setStep(0);
        return;
      }
      setStep(n);
      if (!calm) setTurns(t => t + 1);
    };
    tick();
    timer.current = window.setInterval(tick, STEP_MS);
  };

  const showing = step > 0 ? STEPS[step - 1] : [];

  return (
    <section id="other-things" className="fig-section">
      <div className="other">
        <div className="section-head is-dark"><h2>OTHER THINGS I DO</h2><span>2024-26</span></div>

        <img className="other-clips" src="/site/paperclips.webp" alt="" loading="lazy" />
        <img className="other-scissors" src="/site/scissors.webp" alt="" loading="lazy" />
        <div className="other-diary" aria-hidden="true">
          <Notebook><p className="other-diary-note">Click CD<br />→</p></Notebook>
        </div>
        {/* Two polaroids lie loose on the phone layout's desk */}
        <img className="other-loose other-loose-a" src="/site/card27.webp" alt="" loading="lazy" />
        <img className="other-loose other-loose-b" src="/site/card23.webp" alt="" loading="lazy" />

        <div className="other-cd">
          <button type="button" className="other-disc" aria-label="Spin the CD" onClick={spin}>
            <img src="/site/cd.webp" alt="" loading="lazy" style={{ transform: `rotate(${-30 * turns}deg)` }} />
          </button>
          {CARDS.map(([id, x, y]) => (
            <img
              key={id}
              className={`other-card ${showing.includes(id) ? "is-on" : ""}`}
              src={`/site/card${id}.webp`}
              alt=""
              loading="lazy"
              style={{ "--x": x, "--y": y } as CSSProperties}
            />
          ))}
        </div>

        <img className="other-profile" src="/site/profile.webp" alt="" loading="lazy" />
      </div>
    </section>
  );
}
