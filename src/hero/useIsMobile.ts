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
 * Keep this query in step with index.css. The hero and the sections switch
 * to their phone designs together: on a narrow window or a portrait screen.
 */
export const useIsMobile = () => useMedia("(max-width: 768px), (max-aspect-ratio: 9/10)");
