import type { ObjectId } from "./objects";

/**
 * Authored layouts — every position is a deliberate choice, not generated.
 *
 *   x, y  centre of the object, as % of the hero's width / height
 *   w     object width, as % of the hero's width (height follows the image's
 *         own aspect ratio, so nothing stretches)
 *   r     rotation in degrees
 *   z     stacking order. The headline sits at z 10: below that an object
 *         is behind the type, above it the object is in front of it.
 *
 * An object left out of a layout simply isn't shown at that breakpoint
 * (mobile gets a smaller, separately composed set). Stage 3 adds `order`
 * and `notebook`; the same ids keep their identity across all three.
 */

export type Mode = "chaos" | "order" | "notebook";

export interface Placement { x: number; y: number; w: number; r: number; z: number }
export type Layout = Partial<Record<ObjectId, Placement>>;

export const TEXT_LAYER = 10;

export const LAYOUTS: Partial<Record<Mode, { desktop: Layout; mobile: Layout }>> = {
  chaos: {
    // Wide: everything lives in the outer fifth of each side and the middle is
    // left clear for the name. Objects are large and bleed off the edges — a
    // desk seen close up, not a scatter of icons.
    desktop: {
      // Left
      notebook:  { x: 9,  y: 88,  w: 31,  r: -8,  z: 2 },
      nametag:   { x: 18, y: 64,  w: 12,  r: -9,  z: 6 },
      pencil:    { x: 14, y: 93,  w: 14,  r: 11,  z: 7 },
      lighter:   { x: 4,  y: 42,  w: 3.8, r: -22, z: 4 },
      receipt:   { x: 5,  y: 19,  w: 5.5, r: -12, z: 2 },
      polaroidA: { x: 14, y: 21,  w: 8.5, r: 8,   z: 3 },

      // Right
      dream:     { x: 86, y: 23,  w: 24,  r: -4,  z: 3 },
      camera:    { x: 83, y: 39,  w: 15,  r: 5,   z: 6 },
      spraycan:  { x: 96, y: 53,  w: 7,   r: 6,   z: 5 },
      ticket:    { x: 79, y: 55,  w: 8.5, r: -8,  z: 4 },
      paint:     { x: 88, y: 71,  w: 7,   r: -24, z: 7 },
      wax:       { x: 78, y: 77,  w: 10,  r: 14,  z: 5 },
      earphones: { x: 93, y: 89,  w: 11,  r: -8,  z: 6 },
      polaroidB: { x: 72, y: 90,  w: 8.5, r: -7,  z: 3 },
    },
    // Stacked: same idea turned on its side — a cluster above the name and
    // one below, with the name's band kept clear between them.
    mobile: {
      dream:     { x: 38, y: 17,  w: 62,  r: -4,  z: 3 },
      wax:       { x: 87, y: 24,  w: 24,  r: 12,  z: 4 },
      camera:    { x: 25, y: 71,  w: 42,  r: -7,  z: 5 },
      spraycan:  { x: 81, y: 73,  w: 15,  r: 9,   z: 6 },
      paint:     { x: 61, y: 82,  w: 14,  r: -22, z: 7 },
      ticket:    { x: 11, y: 86,  w: 17,  r: -8,  z: 4 },
      lighter:   { x: 43, y: 90,  w: 7,   r: 16,  z: 5 },
      earphones: { x: 28, y: 94,  w: 22,  r: 6,   z: 6 },
    },
  },
};
