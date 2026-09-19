export const C = {
  paper:   "#F5F2EC",
  ink:     "#181614",
  accent:  "#C2421F",
  muted:   "#8C8984",
  border:  "#E2DED8",
  dim:     "#4A4744",
  surface: "#EEEAE2",
} as const;

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * Recurring text treatments, named so the same values in Home/WorkDetail and
 * future work pages don't silently drift apart. Not a full type scale —
 * only the patterns that already repeat verbatim across pages.
 */
export const T = {
  eyebrow: {
    fontSize:      "11px",
    fontWeight:    600,
    letterSpacing: "0.14em",
    color:         C.muted,
  },
  label: {
    fontSize:      "10px",
    fontWeight:    700,
    letterSpacing: "0.14em",
    color:         C.muted,
  },
  meta: {
    fontSize:      "10.5px",
    fontWeight:    600,
    letterSpacing: "0.1em",
    color:         C.muted,
  },
} as const;
