import type { ReactNode } from "react";

/**
 * The open diary, used on the hero and in Other Things. Its Figma frame is a
 * little larger than the book, which sits rotated inside it, so everything
 * here is a percentage of that frame. `children` is the writing on the page.
 */
export default function Notebook({ children }: { children?: ReactNode }) {
  return (
    <div className="notebook">
      <img className="notebook-book" src="/site/diary.webp" width={736} height={552} alt="" draggable={false} />
      {children}
    </div>
  );
}
