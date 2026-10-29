# Hero desk objects

Transparent-background cutouts used by the homepage hero (`src/hero/`).

**To replace a cutout:** save your own transparent PNG/WebP over the file of
the same name here. If it's `.png` instead of `.webp`, or its proportions
differ, update its entry in `src/hero/objects.ts` (`src`, `w`, `h`).

| File | Object |
|---|---|
| `dream.webp` | sticker wordmark |
| `camera.webp` | camera |
| `spraycan.webp` | spray can |
| `paint.webp` | paint tube |
| `wax.webp` | smiley wax seal |
| `ticket.webp` | library card |
| `lighter.webp` | lighter |
| `earphones.webp` | earphones + hair claw |
| `nametag.webp` | "Hello my name is" tag |

These nine were cut out automatically from the studio-background JPGs, so
edges are good-enough rather than perfect — a hand-made cutout will look
cleaner.

**Still vector stand-ins** (no photo yet; drawn in `src/hero/PlaceholderArt.tsx`):
notebook, pencil, receipt, two polaroids. To replace one, add a `photo(...)`
entry for it in `objects.ts` in place of the `placeholder(...)` one.

Aim for ~2× the largest on-screen size (roughly 300–900px on the long side),
shot top-down with soft light from the upper left. Don't bake shadows into
the cutout — the site draws one consistent shadow itself.
