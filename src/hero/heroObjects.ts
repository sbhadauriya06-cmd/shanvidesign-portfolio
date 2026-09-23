/**
 * Hero object catalogue — the physical "things" that rearrange into
 * letters. This file is the ONLY place image paths are declared; swap or
 * add files under public/hero-objects/ and update the `image` path here
 * (or just replace a file in place — same filename, new picture) without
 * touching any animation/composition logic.
 *
 * `size` and `aspect` describe the object's natural footprint: `size` is
 * its width as a percentage of the object stage's width (the stage keeps
 * a fixed aspect ratio, so this scales fluidly with viewport), `aspect`
 * is width/height so images never get stretched. Larger `size` objects
 * are preferred as visual anchors when compositions are generated (see
 * compose.ts) — smaller ones fill in the gaps.
 */

export interface HeroObjectDef {
  id: string;
  /** Public path, e.g. "/hero-objects/bangles.png". 404s fall back to a labeled placeholder. */
  image: string;
  alt: string;
  /** Width as % of the stage width. */
  size: number;
  /** width / height, so the aspect ratio is preserved regardless of size. */
  aspect: number;
  z: number;
}

const asset = (id: string) => `/hero-objects/${id}.png`;

export const HERO_OBJECTS: HeroObjectDef[] = [
  { id: "bangles",   image: asset("bangles"),   alt: "Stack of colourful bangles",        size: 9.5, aspect: 1,    z: 8 },
  { id: "book",      image: asset("book"),      alt: "Paperback book",                     size: 8.0, aspect: 0.73, z: 3 },
  { id: "rock",      image: asset("rock"),      alt: "Small found rock",                   size: 7.5, aspect: 1.33, z: 7 },
  { id: "bhondu",    image: asset("bhondu"),    alt: "Bhondu, a keychain",                  size: 6.0, aspect: 0.48, z: 9 },
  { id: "writing",   image: asset("writing"),   alt: "A handwritten note",                  size: 9.0, aspect: 1.4,  z: 6 },
  { id: "sound",     image: asset("sound"),     alt: "A small speaker",                     size: 6.0, aspect: 1,    z: 9 },
  { id: "ashes",     image: asset("ashes"),     alt: "An incense holder",                   size: 5.5, aspect: 1.57, z: 3 },
  { id: "pencil",    image: asset("pencil"),    alt: "A pencil",                             size: 1.1, aspect: 0.085, z: 15 },
  { id: "eraser",    image: asset("eraser"),    alt: "An eraser",                            size: 5.0, aspect: 2.2,  z: 4 },
  { id: "coin1",     image: asset("coin"),      alt: "A coin",                               size: 3.2, aspect: 1,    z: 9 },
  { id: "coin2",     image: asset("coin"),      alt: "A smaller coin",                       size: 2.4, aspect: 1,    z: 7 },
  { id: "paperclip", image: asset("paperclip"), alt: "A paperclip",                          size: 1.8, aspect: 0.41, z: 16 },
  { id: "rubber",    image: asset("rubber"),    alt: "A rubber",                             size: 4.0, aspect: 1.45, z: 8 },
  { id: "key",       image: asset("key"),       alt: "A key",                                size: 1.8, aspect: 0.37, z: 10 },
  { id: "ticket",    image: asset("ticket"),    alt: "A ticket stub",                        size: 7.5, aspect: 2.5,  z: 7 },
  { id: "dice",      image: asset("dice-obj"),  alt: "A die",                                size: 2.8, aspect: 1,    z: 12 },
  { id: "leaf",      image: asset("leaf"),      alt: "A pressed leaf",                       size: 3.3, aspect: 0.65, z: 6 },
  { id: "tape",      image: asset("tape"),      alt: "Washi tape",                           size: 6.3, aspect: 3.3,  z: 8 },
  { id: "film",      image: asset("film"),      alt: "A film negative strip",                size: 3.3, aspect: 0.48, z: 9 },
  { id: "envelope",  image: asset("envelope"),  alt: "An envelope",                          size: 4.3, aspect: 1.3,  z: 11 },
  { id: "button",    image: asset("button"),    alt: "A button",                             size: 3.0, aspect: 1,    z: 5 },
  { id: "cork",      image: asset("cork"),      alt: "A cork",                               size: 3.3, aspect: 1,    z: 3 },
  { id: "stamp",     image: asset("stamp"),     alt: "A postage stamp",                      size: 4.0, aspect: 1,    z: 8 },
  { id: "fragment",  image: asset("fragment"),  alt: "A torn paper fragment",                size: 6.3, aspect: 1.4,  z: 9 },
  { id: "pill",      image: asset("pill"),      alt: "A capsule",                            size: 2.3, aspect: 1.8,  z: 6 },
  { id: "bottlecap", image: asset("bottlecap"), alt: "A bottle cap",                         size: 2.8, aspect: 1,    z: 7 },
  { id: "pin",       image: asset("pin"),       alt: "A pin badge",                          size: 1.3, aspect: 0.45, z: 7 },
  { id: "thread",    image: asset("thread"),    alt: "A spool of thread",                    size: 3.0, aspect: 1,    z: 6 },
];
