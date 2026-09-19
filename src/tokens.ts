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
