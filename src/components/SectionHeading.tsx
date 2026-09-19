import { C, T } from "../tokens";

/** Eyebrow label + hairline border-top used to open every home-page section. */
export default function SectionHeading({
  children, right, marginBottom = 72,
}: {
  children: React.ReactNode;
  right?:   React.ReactNode;
  marginBottom?: number;
}) {
  return (
    <div
      style={{
        display:        "flex",
        justifyContent: "space-between",
        alignItems:     "baseline",
        borderTop:      `1px solid ${C.border}`,
        paddingTop:     "20px",
        marginBottom:   `${marginBottom}px`,
      }}
    >
      <span style={{ ...T.eyebrow }}>{children}</span>
      {right && <span style={{ fontSize:"10px", fontWeight:400, letterSpacing:"0.08em", color:C.muted }}>{right}</span>}
    </div>
  );
}
