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
    // is left clear for the name. Objects enter from the left and right
    // edges — a few lose a slice of their side to the viewport (never more
    // than about a third, and never the part that identifies them), while
    // tops and bottoms always stay whole.
    desktop: {
      // Left
      diary:     { x: 13,  y: 80, w: 29,  r: -7,  z: 2 },
      nametag:   { x: 24,  y: 63, w: 12,  r: -9,  z: 6 },
      pencil:    { x: 17,  y: 84, w: 2.6, r: 64,  z: 7 },
      lighter:   { x: 3.5, y: 54, w: 4,   r: -22, z: 4 },
      shavings:  { x: 3,   y: 38, w: 10,  r: 20,  z: 3 },
      polaroid:  { x: 6,   y: 22, w: 13,  r: 8,   z: 3 },

      // Right
      dream:     { x: 91,  y: 21, w: 26,  r: -4,  z: 3 },
      camera:    { x: 95,  y: 38, w: 15,  r: 5,   z: 6 },
      spraycan:  { x: 97.5,y: 56, w: 7.5, r: 6,   z: 5 },
      ticket:    { x: 80,  y: 54, w: 8.5, r: -8,  z: 4 },
      paint:     { x: 93,  y: 72, w: 7,   r: -24, z: 7 },
      wax:       { x: 81,  y: 77, w: 10.5,r: 14,  z: 5 },
      earphones: { x: 96,  y: 85, w: 12,  r: -8,  z: 6 },
    },
    // Stacked: same idea turned on its side — a cluster above the name and
    // one below, with the name's band kept clear between them.
    mobile: {
      dream:     { x: 31, y: 18, w: 72, r: -4,  z: 3 },
      wax:       { x: 88, y: 23, w: 26, r: 12,  z: 4 },
      camera:    { x: 22, y: 69, w: 44, r: -7,  z: 5 },
      spraycan:  { x: 91, y: 71, w: 16, r: 9,   z: 6 },
      paint:     { x: 63, y: 81, w: 14, r: -22, z: 7 },
      diary:     { x: 28, y: 86, w: 56, r: -6,  z: 3 },
      pencil:    { x: 30, y: 88, w: 5.5,r: 64,  z: 7 },
      earphones: { x: 87, y: 90, w: 21, r: -6,  z: 6 },
    },
  },
};
