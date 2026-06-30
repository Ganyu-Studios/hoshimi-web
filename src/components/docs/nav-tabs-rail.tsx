"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Box = { left: number; width: number };

// A horizontal accent bar that slides under the active navbar tab (Guide / API).
// It is portaled into fumadocs' `[data-header-tabs]` container so it can be
// absolutely positioned against it, and animates the move with a CSS transition
// — mirroring SidebarActiveRail but on the X axis. No motion dependency.
export function NavTabsRail() {
  const pathname = usePathname();
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const [box, setBox] = useState<Box | null>(null);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      const tabs = document.querySelector<HTMLElement>("[data-header-tabs]");
      if (!tabs || tabs.offsetParent === null) {
        setContainer(null);
        setBox(null);
        return;
      }

      const anchors = [
        ...tabs.querySelectorAll<HTMLAnchorElement>(":scope > a"),
      ];
      const isApi = pathname.startsWith("/docs/api");
      // The tab whose root matches the current section. Fall back to whichever
      // anchor fumadocs styled as active (text-fd-primary) if exact match fails.
      const active =
        anchors.find((a) => {
          const href = a.getAttribute("href") ?? "";
          return isApi ? href.startsWith("/docs/api") : href === "/docs";
        }) ?? anchors.find((a) => a.className.includes("text-fd-primary"));

      const aRect = active?.getBoundingClientRect();
      if (!active || !aRect?.width) {
        setBox(null);
        return;
      }

      const cRect = tabs.getBoundingClientRect();
      tabs.style.position = "relative";
      setContainer(tabs);
      setBox({
        left: aRect.left - cRect.left + tabs.scrollLeft,
        width: aRect.width,
      });
    };

    const scheduleMeasure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => requestAnimationFrame(measure));
    };

    scheduleMeasure();
    // One late pass after fonts/layout settle so the initial width is correct.
    const timer = setTimeout(measure, 160);
    window.addEventListener("resize", scheduleMeasure);

    const tabs = document.querySelector("[data-header-tabs]");
    const observer = new MutationObserver(scheduleMeasure);
    if (tabs) {
      observer.observe(tabs, {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: ["class", "data-active"],
      });
    }

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      window.removeEventListener("resize", scheduleMeasure);
      observer.disconnect();
    };
  }, [pathname]);

  if (!container || !box) return null;

  return createPortal(
    <span
      aria-hidden
      className="hoshimi-tab-rail"
      style={{
        transform: `translateX(${box.left}px)`,
        width: `${box.width}px`,
      }}
    />,
    container,
  );
}
