import { Link } from "react-router";
import { C } from "../tokens";

export default function NotFound() {
  return (
    <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", padding:"0 48px" }}>
      <p style={{ fontSize:"11px", fontWeight:600, letterSpacing:"0.14em", color:C.muted, marginBottom:"24px" }}>PAGE NOT FOUND</p>
      <Link to="/" style={{ fontSize:"20px", fontWeight:800, letterSpacing:"-0.02em", color:C.ink, textDecoration:"none", borderBottom:`2px solid ${C.accent}` }}>← BACK TO INDEX</Link>
    </div>
  );
}
