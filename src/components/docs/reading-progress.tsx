"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// A thin frost-gradient bar pinned to the top of the viewport that fills as the
// reader scrolls through a docs page. Resets on navigation.
//
// fumadocs' notebook layout may scroll either the window or an inner container
// depending on viewport, so we listen on the capture phase (scroll doesn't
// bubble, but capture catches scrolls from any descendant) and measure whichever
// scroller actually moved — ignoring the sidebar / TOC scrollers by requiring the
// scroller to be the document root or an ancestor of the page article.
export function ReadingProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);

  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname intentionally re-runs the effect on client navigation so progress resets for the new page.
  useEffect(() => {
    let frame = 0;

    const root = () => document.scrollingElement ?? document.documentElement;

    const measure = (el: Element) => {
      const max = el.scrollHeight - el.clientHeight;
      const ratio = max > 0 ? el.scrollTop / max : 0;
      setProgress(Math.min(1, Math.max(0, ratio)));
    };

    const scrollerFor = (target: EventTarget | null): Element | null => {
      if (!target || target === document || target === window) return root();
      const el = target as Element;
      const page = document.getElementById("nd-page");
      // The window root, or a container that actually wraps the page content.
      if (el === root() || (page && el.contains?.(page))) return el;
      return null;
    };

    const onScroll = (event: Event) => {
      const el = scrollerFor(event.target);
      if (!el) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => measure(el));
    };

    const onResize = () => measure(root());

    measure(root());
    window.addEventListener("scroll", onScroll, {
      capture: true,
      passive: true,
    });
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("resize", onResize);
    };
  }, [pathname]);

  return (
    <div className="hoshimi-progress" aria-hidden>
      <div
        className="hoshimi-progress-fill"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
