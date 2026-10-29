/**
 * The desk's objects — identity only (what each thing is). Where it sits in
 * each mode and breakpoint lives in layouts.ts, so swapping a picture never
 * touches layout and re-composing never touches the pictures.
 *
 * `w`/`h` are the image's natural pixel size: used for the aspect ratio (so
 * nothing is ever stretched and the page doesn't shift while images load).
 * To replace a cutout, drop a file with the same name into
 * public/hero-objects/ — if the new one has a different aspect ratio,
 * update w/h here.
 */

export type ObjectId =
  | "dream" | "camera" | "spraycan" | "paint" | "wax" | "ticket"
  | "lighter" | "earphones" | "nametag"
  | "diary" | "pencil" | "shavings" | "polaroid";

export interface DeskObject {
  id: ObjectId;
  src: string;
  w: number;
  h: number;
}

const photo = (id: ObjectId, file: string, w: number, h: number): DeskObject =>
  ({ id, src: `/hero-objects/${file}.webp`, w, h });

export const OBJECTS: DeskObject[] = [
  photo("dream",     "dream",     916, 403),
  photo("camera",    "camera",    353, 198),
  photo("spraycan",  "spraycan",  313, 890),
  photo("paint",     "paint",     276, 674),
  photo("wax",       "wax",       340, 306),
  photo("ticket",    "ticket",    212, 326),
  photo("lighter",   "lighter",   168, 552),
  photo("earphones", "earphones", 276, 298),
  photo("nametag",   "nametag",   636, 419),
  photo("diary",     "diary",     726, 445),
  photo("pencil",    "pencil",    92,  1001),
  photo("shavings",  "shavings",  524, 536),
  photo("polaroid",  "polaroid",  773, 665),
];
