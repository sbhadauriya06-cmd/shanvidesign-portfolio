import { useRef, useState, useEffect } from "react";

/** Fade-up reveal triggered once on first intersection */
export function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.06 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return {
    ref,
    revealStyle: {
      opacity:    vis ? 1 : 0,
      transform:  vis ? "none" : "translateY(24px)",
      transition: `opacity 0.85s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.85s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    } as React.CSSProperties,
  };
}

/** Reading-progress percentage (0–100) for scroll-based progress bar */
export function useReadingProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const d  = document.documentElement;
      const p  = d.scrollTop / (d.scrollHeight - d.clientHeight);
      setPct(Math.min(100, Math.max(0, p * 100)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return pct;
}
