import { useSyncExternalStore } from "react";

// Phones, and anything portrait enough (tablets held upright) that the hero is
// taller than it is wide — there the desk stacks under the headline instead
// of sitting beside it. Landscape tablets and laptops keep the wide layout.
const QUERY = "(max-width: 768px), (max-aspect-ratio: 9/10)";

const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/** True when the stacked (mobile) layout applies. */
export function useIsMobile() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => false);
}
