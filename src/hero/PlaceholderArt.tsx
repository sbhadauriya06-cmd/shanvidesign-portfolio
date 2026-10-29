import type { ObjectId } from "./objects";

/**
 * Deliberately plain stand-ins for objects that don't have a real photograph
 * yet. They share the page's paper tones and the same drop shadow as the
 * photos, but make no attempt to look photographic — swap them out for real
 * cutouts (see objects.ts) rather than refining these.
 */
export default function PlaceholderArt({ id }: { id: ObjectId }) {
  switch (id) {
    case "pencil":
      return (
        <svg viewBox="0 0 300 20" width="100%" height="100%" aria-hidden>
          <rect x="30" y="2" width="226" height="16" fill="#E2B94E" />
          <rect x="30" y="9" width="226" height="2" fill="#C99A2E" opacity=".55" />
          <polygon points="0,10 30,2 30,18" fill="#EBD3A4" />
          <polygon points="0,10 11,6.4 11,13.6" fill="#3A3633" />
          <rect x="256" y="2" width="20" height="16" fill="#BDB7AE" />
          <rect x="276" y="2" width="24" height="16" rx="3" fill="#D98F87" />
        </svg>
      );
    case "notebook":
      return (
        <svg viewBox="0 0 400 500" width="100%" height="100%" aria-hidden>
          <defs>
            <pattern id="desk-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M20 0H0V20" fill="none" stroke="#C9BFA8" strokeWidth="1" opacity=".55" />
            </pattern>
          </defs>
          <rect width="400" height="500" rx="5" fill="#F3EEE1" />
          <rect width="400" height="500" rx="5" fill="url(#desk-grid)" />
          <rect width="26" height="500" rx="5" fill="#2E2A27" opacity=".9" />
          <path d="M70 120 C110 70 160 160 210 110 S300 90 330 130" fill="none" stroke="#6E675E" strokeWidth="2.4" strokeLinecap="round" opacity=".7" />
          <rect x="70" y="190" width="150" height="86" rx="6" fill="none" stroke="#6E675E" strokeWidth="2.2" opacity=".6" />
          <path d="M70 330 H300 M70 360 H250 M70 390 H280" stroke="#6E675E" strokeWidth="2.2" strokeLinecap="round" opacity=".5" />
        </svg>
      );
    case "receipt":
      return (
        <svg viewBox="0 0 120 300" width="100%" height="100%" aria-hidden>
          <path d="M0 0H120V292L110 298 100 292 90 298 80 292 70 298 60 292 50 298 40 292 30 298 20 292 10 298 0 292Z" fill="#FAF7EE" />
          <path d="M14 26H70M14 44H104M14 58H88M14 90H104M14 104H62M14 118H96M14 150H104M14 164H78M14 178H100M14 232H104" stroke="#8D867B" strokeWidth="3" strokeLinecap="round" opacity=".55" />
        </svg>
      );
    case "polaroidA":
    case "polaroidB": {
      const a = id === "polaroidA";
      return (
        <svg viewBox="0 0 200 240" width="100%" height="100%" aria-hidden>
          <rect width="200" height="240" fill="#FBF9F3" />
          <rect x="14" y="14" width="172" height="170" fill={a ? "#C3BBAA" : "#B5BDB8"} />
          <path d={a ? "M14 150 L70 96 L110 136 L140 108 L186 154 V184 H14Z" : "M14 170 C60 120 100 150 186 100 V184 H14Z"} fill={a ? "#A89F8D" : "#9AA39E"} />
        </svg>
      );
    }
    default:
      return null;
  }
}
