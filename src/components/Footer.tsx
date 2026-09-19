import { C } from "../tokens";

/**
 * Bottom identity row shared by every page. `padding` defaults to the
 * standalone case (own horizontal margin); pass "24px 0" when nesting
 * inside a container that already carries the page's horizontal padding.
 */
export default function Footer({ padding = "24px 48px" }: { padding?: string }) {
  return (
    <div
      className="footer-row"
      style={{ padding, display:"flex", justifyContent:"space-between", alignItems:"center", borderTop:`1px solid ${C.border}` }}
    >
      <span style={{ fontSize:"10px", fontWeight:600, letterSpacing:"0.14em", color:C.muted }}>SHANVI BHADAURIYA</span>
      <span style={{ fontSize:"10px", fontWeight:500, letterSpacing:"0.08em", color:C.muted }}>PRODUCT DESIGNER</span>
    </div>
  );
}
