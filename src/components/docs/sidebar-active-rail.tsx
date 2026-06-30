"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Box = { top: number; height: number };

// A vertical accent bar that slides to the active sidebar entry. It is portaled
// into the sidebar's scroll content so it can be absolutely positioned against
// it, and animates with a CSS transition (no motion dependency).
//
// Within a section the same element persists, so the `transform` transition
// slides it. Switching tabs swaps the whole sidebar tree (a new content node),
// which re-keys the element and plays a fade-in instead of a hard jump.
export function SidebarActiveRail() {
  const pathname = usePathname();
  const [content, setContent] = useState<HTMLElement | null>(null);
  const [box, setBox] = useState<Box | null>(null);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      const viewport = document.querySelector<HTMLElement>(
        "#nd-sidebar [data-radix-scroll-area-viewport]",
      );
      const contentEl = viewport?.firstElementChild as HTMLElement | null;

      if (!viewport || !contentEl) {
        setContent(null);
        setBox(null);
        return;
      }

      const active = document.querySelector<HTMLElement>(
        '#nd-sidebar a[data-active="true"]:not(:has(.lucide-chevron-down))',
      );
      const activeRect = active?.getBoundingClientRect();
      // No active page link, or it is hidden inside a collapsed folder (no
      // layout box). Nothing to point at — hide the rail instead of stranding
      // it at a stale position.
      if (!active || active.offsetParent === null || !activeRect?.height) {
        setBox(null);
        return;
      }

      contentEl.style.position = "relative";
      const contentRect = contentEl.getBoundingClientRect();
      setContent(contentEl);
      setBox({
        top: activeRect.top - contentRect.top,
        height: activeRect.height,
      });
    };

    const scheduleMeasure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => requestAnimationFrame(measure));
    };

    scheduleMeasure();
    // One late pass after the section swap / scroll-into-view settles.
    const timer = setTimeout(measure, 160);
    window.addEventListener("resize", scheduleMeasure);

    const sidebar = document.querySelector("#nd-sidebar");
    const observer = new MutationObserver(scheduleMeasure);
    if (sidebar) {
      observer.observe(sidebar, {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: ["data-active"],
      });
    }

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      window.removeEventListener("resize", scheduleMeasure);
      observer.disconnect();
    };
  }, [pathname]);

  if (!content || !box) return null;

  // `key` is the active tab: navigating within a tab keeps the same element
  // (so it slides), switching tabs swaps it (so it fades in instead of popping).
  const section = pathname.startsWith("/docs/api") ? "api" : "guide";

  return createPortal(
    <span
      key={section}
      aria-hidden
      className="hoshimi-sidebar-rail"
      style={{
        transform: `translateY(${box.top}px)`,
        height: `${box.height}px`,
      }}
    />,
    content,
  );
}
