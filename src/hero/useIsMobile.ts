import { useSyncExternalStore } from "react";

function useMedia(query: string) {
  return useSyncExternalStore(
    cb => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/**
 * Keep these two queries in step with index.css.
 * The hero picks its frame by shape: a phone on its side still fits the wide
 * desktop frame. Sections go by width too, since their text needs the room.
 */
export const useIsPortrait = () => useMedia("(max-aspect-ratio: 9/10)");
export const useIsMobile = () => useMedia("(max-width: 768px), (max-aspect-ratio: 9/10)");
