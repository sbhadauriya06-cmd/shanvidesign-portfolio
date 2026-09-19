import { C } from "../tokens";

/**
 * Placeholder media slot with a caption. Stands in for real project imagery —
 * swap the background for an <img>/<video> per instance when real assets
 * exist; the caption + aspect-ratio contract stays the same.
 */
export default function MediaBlock({ label, tall }: { label: string; tall?: boolean }) {
  return (
    <div
      style={{
        width:          "100%",
        paddingTop:     tall ? "66%" : "56%",
        background:     C.surface,
        position:       "relative",
        borderRadius:   "2px",
      }}
    >
      <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"flex-end", padding:"16px 20px" }}>
        <span style={{ fontSize:"9px", fontWeight:600, letterSpacing:"0.14em", color:C.muted }}>{label.toUpperCase()}</span>
      </div>
    </div>
  );
}
