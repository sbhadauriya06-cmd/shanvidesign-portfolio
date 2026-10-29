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
 *
 * Every object must sit fully inside the hero — rotated corners and cast
 * shadow included — and clear the fixed nav along the top.
 */

export type Mode = "chaos" | "order" | "notebook";

export interface Placement { x: number; y: number; w: number; r: number; z: number }
export type Layout = Partial<Record<ObjectId, Placement>>;

export const TEXT_LAYER = 10;

export const LAYOUTS: Partial<Record<Mode, { desktop: Layout; mobile: Layout }>> = {
  chaos: {
    // Wide: everything lives in the outer quarter of each side and the middle
    // is left clear for the name.
    desktop: {
      // Left
      diary:     { x: 15,  y: 80, w: 25,  r: -7,  z: 2 },
      nametag:   { x: 23,  y: 64, w: 11,  r: -9,  z: 6 },
      pencil:    { x: 15,  y: 84, w: 2.4, r: 64,  z: 7 },
      lighter:   { x: 6.5, y: 52, w: 3.6, r: -22, z: 4 },
      shavings:  { x: 9,   y: 36, w: 9,   r: 20,  z: 3 },
      polaroid:  { x: 16,  y: 21, w: 12,  r: 8,   z: 3 },

      // Right
      dream:     { x: 86,  y: 21, w: 24,  r: -4,  z: 3 },
      camera:    { x: 82,  y: 37, w: 14,  r: 5,   z: 6 },
      spraycan:  { x: 94,  y: 55, w: 6.5, r: 6,   z: 5 },
      ticket:    { x: 78,  y: 54, w: 8,   r: -8,  z: 4 },
      paint:     { x: 89,  y: 72, w: 6.5, r: -24, z: 7 },
      wax:       { x: 79,  y: 76, w: 9.5, r: 14,  z: 5 },
      earphones: { x: 92,  y: 86, w: 10,  r: -8,  z: 6 },
    },
    // Stacked: same idea turned on its side — a cluster above the name and
    // one below, with the name's band kept clear between them.
    mobile: {
      dream:     { x: 38, y: 18, w: 62, r: -4,  z: 3 },
      wax:       { x: 81, y: 24, w: 24, r: 12,  z: 4 },
      camera:    { x: 25, y: 71, w: 42, r: -7,  z: 5 },
      spraycan:  { x: 79, y: 73, w: 15, r: 9,   z: 6 },
      paint:     { x: 61, y: 82, w: 14, r: -22, z: 7 },
      ticket:    { x: 13, y: 85, w: 17, r: -8,  z: 4 },
      lighter:   { x: 43, y: 90, w: 7,  r: 16,  z: 5 },
      earphones: { x: 28, y: 90, w: 22, r: 6,   z: 6 },
    },
  },
};
