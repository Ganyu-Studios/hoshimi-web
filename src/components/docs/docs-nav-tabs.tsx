"use client";

import Link from "fumadocs-core/link";
import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useEffect, useRef } from "react";

export type DocsNavTab = {
  title: ReactNode;
  url: string;
};

// Section switcher (Guide / API) rendered in the navbar slot where the search
// field used to live. The `data-header-tabs` attribute keeps NavTabsRail's
// sliding underline working: it measures the anchors that are direct children.
export function DocsNavTabs({ tabs }: { tabs: DocsNavTab[] }) {
  const pathname = usePathname();
  const router = useRouter();

  // The most specific tab whose url prefixes the path wins (/docs/api beats /docs).
  const active = tabs
    .filter((tab) => pathname === tab.url || pathname.startsWith(`${tab.url}/`))
    .sort((a, b) => b.url.length - a.url.length)[0];
  const activeIndex = active ? tabs.indexOf(active) : -1;

  // Alt + ArrowUp / ArrowDown moves to the previous / next section, wrapping
  // around. Alt + ArrowLeft / ArrowRight is left alone: browsers use it for
  // history back / forward.
  // The tabs array is rebuilt on every layout render, so the listener reads the
  // latest values from a ref and is registered once instead of re-subscribing.
  const latest = useRef({ tabs, activeIndex });
  useEffect(() => {
    latest.current = { tabs, activeIndex };
  });

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const { tabs, activeIndex } = latest.current;
      if (tabs.length < 2) return;
      if (!e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;

      const { target } = e;
      if (
        target instanceof Element &&
        target.closest("input, textarea, select, [contenteditable]")
      )
        return;

      e.preventDefault();
      const step = e.key === "ArrowDown" ? 1 : -1;
      const next = (activeIndex + step + tabs.length) % tabs.length;
      router.push(tabs[next].url);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router]);

  return (
    <nav
      data-header-tabs=""
      aria-label="Documentation sections"
      className="flex flex-row items-stretch gap-5 overflow-x-auto"
    >
      {tabs.map((tab) => {
        const isActive = tab === active;
        return (
          <Link
            key={tab.url}
            href={tab.url}
            aria-current={isActive ? "page" : undefined}
            className={`inline-flex items-center text-sm font-medium text-nowrap transition-colors hover:text-fd-foreground ${
              isActive ? "text-fd-primary" : "text-fd-muted-foreground"
            }`}
          >
            {tab.title}
          </Link>
        );
      })}
    </nav>
  );
}
