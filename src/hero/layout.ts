/**
 * The hero's two arrangements, read straight from the Figma frames. Each row
 * is an object's centre, size and rotation in that frame's own pixels, and the
 * row order is the frame's layer order (first = bottom of the pile).
 *
 * Both modes use the same ids, so switching just moves each object from one
 * row to the other. Fitting a frame to the viewport lives in Hero.tsx.
 */

export type Mode = "chaos" | "order";

export type ItemId =
  | "music" | "terminal" | "gingham" | "ticket" | "earphones" | "nametag"
  | "scribnotes" | "notebook" | "shuttlecock" | "pencil" | "wax" | "shavings"
  | "lighter" | "cassette" | "polaroid" | "paint" | "camera" | "plate" | "toast"
  | "role" | "verb" | "shanvi" | "bhadauriya" | "toggle";

/** [id, centre x, centre y, width, height, rotation in degrees] */
type Row = [ItemId, number, number, number, number, number];

export interface Frame { width: number; height: number; rows: Row[] }

export const FRAMES: Record<"desktop" | "mobile", Record<Mode, Frame>> = {
  desktop: {
    chaos: { width: 1440, height: 1000, rows: [
      ["music", 1112.4, 36.4, 278.8, 372.1, -128.04],
      ["terminal", 1216, 832.8, 381.2, 238.3, 0.19],
      ["gingham", 72.3, 187.9, 597, 468, 8.35],
      ["ticket", 100.3, 572.4, 119.8, 186.8, 8.65],
      ["earphones", 202.6, 580.9, 226.6, 229.9, 169.98],
      ["nametag", 103.7, 80.7, 114.3, 114.3, -17.49],
      ["scribnotes", 1324.5, 266, 191, 232, 0],
      ["role", 719.5, 572, 229, 22, 0],
      ["verb", 719.5, 599.5, 133, 17, 0],
      ["shanvi", 719, 343.5, 276, 71, 0],
      ["bhadauriya", 719.5, 454.5, 457, 71, 0],
      ["notebook", 151.2, 795.1, 731.1, 590.1, 1.98],
      ["shuttlecock", 44, 845, 216, 216, 0],
      ["pencil", 878.2, 514.2, 98.3, 174.9, 24.72],
      ["wax", 1338.9, 59, 135.1, 121.3, 14.87],
      ["shavings", 1422.5, 154.5, 125, 125, 0],
      ["lighter", 341.4, 835.9, 53.5, 161.6, 22.33],
      ["cassette", 1199.7, 167.8, 282, 183, -15.98],
      ["polaroid", 1170.1, 626.1, 214.3, 251.6, 29.63],
      ["toggle", 712, 765, 88, 44, 0],
      ["paint", 221.9, 303.1, 132.9, 244, -116.66],
      ["camera", 194.3, 160.9, 259.8, 150.2, 8.22],
      ["plate", 1360, 614, 440, 440, 0],
      ["toast", 1383.2, 613.1, 174.9, 174, -30],
    ] },
    order: { width: 1440, height: 1000, rows: [
      ["terminal", -33, 862.8, 381.2, 238.3, 0.19],
      ["polaroid", 282.3, 855.7, 214.3, 251.6, -0.88],
      ["music", 147.4, 98.1, 278.8, 372.1, 0],
      ["scribnotes", 660.5, 200, 191, 232, 0],
      ["role", 868, 747, 229, 22, 0],
      ["verb", 868, 774.5, 133, 17, 0],
      ["toggle", 712, 765, 88, 44, 0],
      ["ticket", 673.9, 15.4, 119.8, 186.8, 0],
      ["lighter", 251.7, 189.8, 53.5, 161.6, 0],
      ["gingham", -61.4, 506.1, 597, 468, 0.02],
      ["plate", -10.9, 510.1, 440, 440, 90.02],
      ["toast", 1, 510.4, 174.9, 174, 60.02],
      ["cassette", 438, 189.5, 282, 183, 0],
      ["earphones", 513.6, -11.1, 226.6, 229.9, 169.98],
      ["nametag", 354.1, 52.1, 114.3, 114.3, 0],
      ["camera", 519.9, 907.1, 259.8, 150.2, 0],
      ["shavings", 778.5, 582.5, 125, 125, 0],
      ["notebook", 534.3, 502.4, 731.1, 590.1, 8.06],
      ["wax", 369.9, 429.9, 135.1, 121.3, -21.11],
      ["pencil", 729.2, 553, 98.3, 174.9, 24.72],
      ["paint", 513.9, 786.1, 132.9, 244, 90],
      ["shanvi", 868, 518.5, 276, 71, 0],
      ["bhadauriya", 868, 629.5, 457, 71, 0],
      ["shuttlecock", 708.2, 875.2, 216, 216, -44.69],
    ] },
  },
  mobile: {
    chaos: { width: 390, height: 844, rows: [
      ["scribnotes", 294, 163.3, 95.5, 116, -23.56],
      ["terminal", 355, 697.5, 275.4, 172.1, 0.19],
      ["paint", 173.2, 49.4, 66.5, 122, 29.95],
      ["ticket", 194.4, 673.1, 59.9, 93.4, 51.45],
      ["role", 194.5, 457, 143, 14, 0],
      ["verb", 195, 477, 78, 10, 0],
      ["shanvi", 195, 347, 128, 34, 0],
      ["bhadauriya", 195.5, 397, 225, 34, 0],
      ["notebook", 44.6, 723.3, 365.5, 295.1, 19.58],
      ["lighter", 108.2, 789.1, 26.7, 80.8, -26.92],
      ["pencil", 274.6, 409, 49.1, 87.4, 24.72],
      ["earphones", 27.5, 603.5, 113.3, 115, 139.04],
      ["gingham", 17.3, 141.9, 298.5, 234, -59.75],
      ["nametag", 34.8, 100.8, 57.1, 57.1, -17.49],
      ["camera", 85.6, 142.4, 129.9, 75.1, 8.22],
      ["plate", 383, 574, 220, 220, 0],
      ["toast", 394.6, 573.5, 87.4, 87, -30],
      ["toggle", 200, 557, 44, 22, 0],
      ["music", 359.2, 0.4, 147.8, 197.2, -128.04],
      ["wax", 254.1, 41.3, 67.6, 60.6, -9.1],
      ["cassette", 308.8, 96.2, 124.9, 80.9, 15],
      ["shavings", 383.3, 165.3, 62.5, 62.5, 0],
      ["polaroid", -9.2, 263.5, 107.1, 125.8, -14.77],
    ] },
    order: { width: 390, height: 844, rows: [
      ["terminal", 462, 419.5, 275.4, 172.1, 0.19],
      ["toggle", 195, 557, 44, 22, 0],
      ["shavings", 275.2, 330.3, 62.5, 62.5, 0],
      ["paint", 11.2, 458, 66.5, 122, 180],
      ["notebook", 176, 420.5, 365.5, 295.1, 8.7],
      ["lighter", 20.2, 361.1, 26.7, 80.8, 0],
      ["earphones", 108.4, 576.5, 90.7, 92, 139.04],
      ["nametag", 194.6, 603.6, 57.1, 57.1, 0],
      ["scribnotes", 353.8, 284, 95.5, 116, 0],
      ["wax", 100.1, 365.3, 67.6, 60.6, -9.1],
      ["pencil", 261.6, 453, 49.1, 87.4, 24.72],
      ["gingham", -14.7, 735, 298.5, 234, 0],
      ["plate", 11, 735, 220, 220, 0],
      ["toast", 22.6, 734.5, 87.4, 87, -30],
      ["music", 333.7, 734.4, 147.4, 196.7, 0],
      ["ticket", 28.7, 575.7, 59.9, 93.4, 2.12],
      ["cassette", 322.5, 576.5, 124.9, 80.9, 0],
      ["camera", 195.9, 799.4, 129.9, 75.1, 0],
      ["polaroid", 194.6, 694.9, 107.1, 125.8, 0],
      ["role", 37, 207, 143, 14, 0],
      ["verb", 37, 227, 78, 10, 0],
      ["shanvi", 37, 97, 128, 34, 0],
      ["bhadauriya", 37, 147, 225, 34, 0],
    ] },
  },
};

/** Exports that carry a little shadow, so they run slightly larger than their node. */
export const OVERSCAN: Partial<Record<ItemId, [number, number]>> = {
  terminal: [1.018, 1.03],
  polaroid: [1.038, 1.033],
};

/** Objects Figma gives a soft drop shadow. */
export const SHADOWED: ItemId[] = ["pencil", "shavings", "lighter", "cassette", "camera", "toast"];
