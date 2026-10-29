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
    desktop: {
      // Left / bottom: the notebook bleeds off two edges; a name tag and pencil
      // sit across its corner. Lighter and wax tuck behind the type.
      notebook:  { x: 11, y: 92,  w: 26,  r: -7,  z: 2 },
      nametag:   { x: 25, y: 84,  w: 10,  r: -5,  z: 6 },
      pencil:    { x: 32, y: 91,  w: 12,  r: 14,  z: 7 },
      lighter:   { x: 32, y: 62,  w: 3.2, r: -12, z: 4 },
      wax:       { x: 36, y: 41,  w: 8.5, r: 12,  z: 4 },
      polaroidA: { x: 41, y: 14,  w: 7,   r: 9,   z: 3 },

      // Right: a loose, overlapping pile — spray can leans into the stickers,
      // the paint tube rests on the earphones.
      receipt:   { x: 54, y: 15,  w: 5,   r: -12, z: 2 },
      dream:     { x: 74, y: 22,  w: 24,  r: -4,  z: 3 },
      spraycan:  { x: 58, y: 43,  w: 5.6, r: 7,   z: 5 },
      camera:    { x: 79, y: 40,  w: 14,  r: 5,   z: 6 },
      ticket:    { x: 94, y: 33,  w: 7,   r: 11,  z: 4 },
      paint:     { x: 68, y: 68,  w: 6.2, r: -26, z: 7 },
      earphones: { x: 74, y: 79,  w: 9,   r: -8,  z: 6 },
      polaroidB: { x: 87, y: 78,  w: 7,   r: -7,  z: 5 },
    },
    mobile: {
      wax:       { x: 86, y: 29,  w: 25, r: 12,  z: 4 },
      dream:     { x: 50, y: 54,  w: 68, r: -3,  z: 3 },
      camera:    { x: 27, y: 66,  w: 40, r: -7,  z: 5 },
      spraycan:  { x: 81, y: 68,  w: 15, r: 9,   z: 6 },
      paint:     { x: 64, y: 77,  w: 14, r: -22, z: 7 },
      ticket:    { x: 13, y: 80,  w: 17, r: -8,  z: 4 },
      lighter:   { x: 46, y: 82,  w: 7,  r: 16,  z: 5 },
      earphones: { x: 34, y: 88,  w: 22, r: 6,   z: 6 },
    },
  },
};
