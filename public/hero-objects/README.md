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
| `diary.webp` | open diary with clips |
| `pencil.webp` | black pencil |
| `shavings.webp` | pencil shavings |
| `polaroid.webp` | polaroid portrait |

All thirteen were cut out automatically from the photos in `Clutter images/`
(polaroid by its outline, the rest by flood-filling the plain background), so
edges are good-enough rather than perfect — a hand-made cutout will look
cleaner.

Aim for ~2× the largest on-screen size (roughly 300–900px on the long side),
shot top-down with soft light from the upper left. Don't bake shadows into
the cutout — the site draws one consistent shadow itself.
