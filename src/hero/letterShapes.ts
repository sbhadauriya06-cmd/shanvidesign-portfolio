/**
 * Letterforms as geometric strokes, not pixel maps. Each letter lives in a
 * shared 0–100 (x) by 0–140 (y) box so every composition maps onto the
 * object stage the same way regardless of screen size — see compose.ts for
 * how points are sampled along these strokes and stage.tsx for how the box
 * is scaled to the viewport.
 *
 * A "line" is a straight stroke; an "arc" samples an ellipse between two
 * angles (degrees, 0 = +x axis, sweeping clockwise since y grows downward);
 * a "curve" is an arbitrary parametric path for shapes lines/arcs can't
 * express cleanly (S). Deliberately not a font/grid — see compose.ts for
 * how jitter and object-to-point assignment keep this from reading as one.
 */

export type Stroke =
  | { type: "line"; from: [number, number]; to: [number, number] }
  | { type: "arc"; cx: number; cy: number; rx: number; ry: number; start: number; end: number }
  | { type: "curve"; fn: (t: number) => [number, number] };

export const LETTER_BOX = { width: 100, height: 140 };

const line = (from: [number, number], to: [number, number]): Stroke => ({ type: "line", from, to });
const arc = (cx: number, cy: number, rx: number, ry: number, start: number, end: number): Stroke => ({ type: "arc", cx, cy, rx, ry, start, end });

export const LETTER_STROKES: Record<string, Stroke[]> = {
  D: [
    line([15, 8], [15, 132]),
    arc(15, 70, 44, 62, -88, 88),
  ],
  E: [
    line([15, 8], [15, 132]),
    line([15, 8], [80, 8]),
    line([15, 68], [65, 72]),
    line([15, 132], [80, 132]),
  ],
  S: [
    { type: "curve", fn: (t: number) => [50 - 30 * Math.sin(2 * Math.PI * t), 8 + 124 * t] },
  ],
  I: [
    line([37, 8], [63, 8]),
    line([50, 8], [50, 132]),
    line([37, 132], [63, 132]),
  ],
  G: [
    arc(52, 70, 42, 62, 38, 322),
    line([88, 45], [88, 76]),
    line([88, 76], [54, 76]),
  ],
  N: [
    line([15, 8], [15, 132]),
    line([85, 8], [85, 132]),
    line([15, 8], [85, 132]),
  ],
};

export const SEQUENCE = ["RANDOM", "D", "E", "S", "I", "G", "N"] as const;
export type SequenceKey = (typeof SEQUENCE)[number];
