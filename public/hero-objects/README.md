# Hero object images

Drop transparent PNG or WebP cutouts in this folder using the exact
filenames below — the code in `src/hero/heroObjects.ts` references them by
path already, so no code change is needed. Until a file exists, that object
renders as a small dashed placeholder labeled with its id, instead of a
drawn illustration.

Recommended: photograph/scan on a plain background, cut out with a clean
transparent edge, export around 400–800px on the longest side (they're
displayed small — a few percent of the hero's width — so this keeps files
light). Keep each file's natural aspect ratio; the code preserves it
automatically (`object-fit: contain`), so don't pre-crop to a square unless
the real object is roughly square.

| File | Used for |
|---|---|
| `bangles.png` | stack of bangles |
| `book.png` | the book |
| `rock.png` | the found rock |
| `bhondu.png` | Bhondu (keychain) |
| `writing.png` | the handwritten note |
| `sound.png` | the small speaker |
| `ashes.png` | the incense holder |
| `pencil.png` | the pencil |
| `eraser.png` | the eraser |
| `coin.png` | shared by both coins (rendered at two different sizes) |
| `paperclip.png` | the paperclip |
| `rubber.png` | the rubber |
| `key.png` | the key |
| `ticket.png` | the ticket stub |
| `dice-obj.png` | the die (as a still-life object — separate from the roll button's own icon, which stays hand-drawn UI) |
| `leaf.png` | the pressed leaf |
| `tape.png` | the washi tape |
| `film.png` | the film negative strip |
| `envelope.png` | the envelope |
| `button.png` | the button |
| `cork.png` | the cork |
| `stamp.png` | the postage stamp |
| `fragment.png` | the torn paper fragment |
| `pill.png` | the capsule |
| `bottlecap.png` | the bottle cap |
| `pin.png` | the pin badge |
| `thread.png` | the spool of thread |

To add or remove an object entirely (not just swap its image), edit the
`HERO_OBJECTS` array in `src/hero/heroObjects.ts` — the letter/random
compositions in `src/hero/compose.ts` adapt automatically to however many
objects are listed there.
