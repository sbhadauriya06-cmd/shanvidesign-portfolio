import { Link } from "react-router";

/** Reframe's case study isn't ready yet: the project page says so. */
export default function ReframeIndia() {
  return (
    <main className="soon">
      <p className="soon-title">Reframe</p>
      <h1 className="soon-label">Coming soon</h1>
      <Link to="/#work" className="soon-back">Back to work</Link>
    </main>
  );
}
