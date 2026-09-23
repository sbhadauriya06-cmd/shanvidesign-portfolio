import { HERO_OBJECTS } from "./heroObjects";
import { LETTER_BOX, LETTER_STROKES, type Stroke } from "./letterShapes";

/**
 * Turns a letter's strokes (or, for RANDOM, an open field) into one (x, y,
 * rotation, scale) per hero object. Everything here is deterministic —
 * same inputs always produce the same layout — so the composition is
 * stable across renders/reloads rather than reshuffling randomly, per the
 * brief's "reproducible, not regenerated every render" requirement.
 *
 * The core idea: sample points along the letter's strokes (proportional to
 * each stroke's length, with jitter so it never reads as a grid), then
 * assign the largest objects to the most *isolated* points — those have
 * the most surrounding negative space and read well as anchors — and the
 * smallest objects to the densest points, where they read as detail
 * filling a gap. That's what gives "larger objects as anchors, smaller
 * ones fill gaps" without hand-placing every object per letter.
 */

export interface Placement { x: number; y: number; r: number; scale: number }

// ── Deterministic PRNG (mulberry32) + string seeding ────────────────────────

function mulberry32(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seedFromString(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// ── Stroke geometry: point + tangent angle at t ∈ [0,1] ─────────────────────

function pointOnStroke(stroke: Stroke, t: number): [number, number] {
  if (stroke.type === "line") {
    const [x1, y1] = stroke.from, [x2, y2] = stroke.to;
    return [x1 + (x2 - x1) * t, y1 + (y2 - y1) * t];
  }
  if (stroke.type === "arc") {
    const deg = stroke.start + (stroke.end - stroke.start) * t;
    const rad = (deg * Math.PI) / 180;
    return [stroke.cx + stroke.rx * Math.cos(rad), stroke.cy + stroke.ry * Math.sin(rad)];
  }
  return stroke.fn(t);
}

function tangentAngle(stroke: Stroke, t: number): number {
  const eps = 0.01;
  const t0 = Math.max(0, t - eps), t1 = Math.min(1, t + eps);
  const [x0, y0] = pointOnStroke(stroke, t0);
  const [x1, y1] = pointOnStroke(stroke, t1);
  return (Math.atan2(y1 - y0, x1 - x0) * 180) / Math.PI;
}

function strokeLength(stroke: Stroke): number {
  if (stroke.type === "line") {
    const [x1, y1] = stroke.from, [x2, y2] = stroke.to;
    return Math.hypot(x2 - x1, y2 - y1);
  }
  if (stroke.type === "arc") {
    return (Math.abs(stroke.end - stroke.start) * Math.PI) / 180 * ((stroke.rx + stroke.ry) / 2);
  }
  let len = 0;
  const samples = 24;
  let prev = stroke.fn(0);
  for (let i = 1; i <= samples; i++) {
    const p = stroke.fn(i / samples);
    len += Math.hypot(p[0] - prev[0], p[1] - prev[1]);
    prev = p;
  }
  return len;
}

// ── Sample N points along a letter's strokes, proportional to length ───────

function sampleLetterPoints(strokes: Stroke[], count: number, rng: () => number) {
  const lengths = strokes.map(strokeLength);
  const total = lengths.reduce((a, b) => a + b, 0);

  const perStroke = lengths.map(len => Math.max(1, Math.round((len / total) * count)));
  // Reconcile rounding so the sum matches `count` exactly.
  let diff = count - perStroke.reduce((a, b) => a + b, 0);
  while (diff !== 0) {
    const i = diff > 0
      ? perStroke.indexOf(Math.min(...perStroke))
      : perStroke.indexOf(Math.max(...perStroke));
    perStroke[i] += diff > 0 ? 1 : -1;
    diff += diff > 0 ? -1 : 1;
  }

  const points: { x: number; y: number; angle: number }[] = [];
  strokes.forEach((stroke, i) => {
    const n = perStroke[i];
    for (let k = 0; k < n; k++) {
      // Evenly spaced along the stroke, then nudged — irregular, not a grid.
      const tBase = n === 1 ? 0.5 : k / (n - 1);
      const t = Math.min(1, Math.max(0, tBase + (rng() - 0.5) * (0.55 / Math.max(n, 1))));
      const [x, y] = pointOnStroke(stroke, t);
      const angle = tangentAngle(stroke, t);
      // Perpendicular jitter so objects sit near the stroke, not glued to a
      // hairline — some fall slightly inside/outside the silhouette.
      const normalRad = ((angle + 90) * Math.PI) / 180;
      const jitter = (rng() - 0.5) * 9;
      points.push({ x: x + Math.cos(normalRad) * jitter, y: y + Math.sin(normalRad) * jitter, angle });
    }
  });
  return points;
}

// ── Public API ───────────────────────────────────────────────────────────

const objectsBySize = [...HERO_OBJECTS].sort((a, b) => b.size - a.size);

export function getLetterComposition(letter: string): Record<string, Placement> {
  const strokes = LETTER_STROKES[letter];
  const rng = mulberry32(seedFromString(`letter-${letter}`));
  const points = sampleLetterPoints(strokes, HERO_OBJECTS.length, rng);

  // Isolation = distance to nearest neighbour. High isolation -> good anchor
  // spot for a larger object; low isolation (crowded) -> a small object
  // reads better there, filling the gap rather than fighting for space.
  const isolation = points.map((p, i) => {
    let min = Infinity;
    points.forEach((q, j) => {
      if (i === j) return;
      min = Math.min(min, Math.hypot(p.x - q.x, p.y - q.y));
    });
    return min;
  });
  const pointOrder = points.map((_, i) => i).sort((a, b) => isolation[b] - isolation[a]);

  const result: Record<string, Placement> = {};
  objectsBySize.forEach((obj, rank) => {
    const p = points[pointOrder[rank]];
    const wobble = (rng() - 0.5) * 50; // organic, not perfectly tangent-aligned
    const scale = 0.92 + rng() * 0.16;
    result[obj.id] = {
      x: (p.x / LETTER_BOX.width) * 100,
      y: (p.y / LETTER_BOX.height) * 100,
      r: p.angle + wobble,
      scale,
    };
  });
  return result;
}

export function getRandomComposition(): Record<string, Placement> {
  const rng = mulberry32(seedFromString("random-field"));
  const margin = 8;
  const placed: { x: number; y: number }[] = [];

  const result: Record<string, Placement> = {};
  for (const obj of HERO_OBJECTS) {
    let x = 0, y = 0;
    // A few rejection-sampling attempts for natural spacing; give up and
    // accept (occasional overlap is fine — even wanted) rather than loop.
    for (let attempt = 0; attempt < 12; attempt++) {
      x = margin + rng() * (LETTER_BOX.width - margin * 2);
      y = margin + rng() * (LETTER_BOX.height - margin * 2);
      const tooClose = placed.some(p => Math.hypot(p.x - x, p.y - y) < 11);
      if (!tooClose) break;
    }
    placed.push({ x, y });
    result[obj.id] = {
      x: (x / LETTER_BOX.width) * 100,
      y: (y / LETTER_BOX.height) * 100,
      r: rng() * 360,
      scale: 0.85 + rng() * 0.3,
    };
  }
  return result;
}

export function getComposition(key: string): Record<string, Placement> {
  return key === "RANDOM" ? getRandomComposition() : getLetterComposition(key);
}

/**
 * Fixed per-object stagger offset (ms), same regardless of which
 * transition is playing — so objects consistently start moving at
 * slightly different times without needing to know source/target state.
 */
export const STAGGER_MS: Record<string, number> = (() => {
  const rng = mulberry32(seedFromString("stagger"));
  const map: Record<string, number> = {};
  HERO_OBJECTS.forEach(obj => { map[obj.id] = Math.round(rng() * 420); });
  return map;
})();
