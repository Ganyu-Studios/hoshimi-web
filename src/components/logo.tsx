"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";

/**
 * Hoshimi brand mark — a four-point sparkle star ("hoshi" = star) rendered with
 * the cyan→violet gradient used across the site. Decorative, so it is hidden
 * from assistive tech.
 *
 * The gradient id is generated per-instance with `useId` because the brand
 * title is rendered in several places at once (desktop nav, mobile menu,
 * sidebar). A shared static id collides across those copies, and when the first
 * copy lives in a hidden subtree some browsers fail to paint the gradient,
 * leaving the visible logo blank.
 */
export function HoshimiLogo({ className }: { className?: string }) {
  const gradientId = useId();

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn("size-5", className)}
    >
      <defs>
        <linearGradient id={gradientId} x1="2" y1="2" x2="22" y2="22">
          <stop offset="0%" stopColor="hsl(187 100% 70%)" />
          <stop offset="55%" stopColor="hsl(205 95% 72%)" />
          <stop offset="100%" stopColor="hsl(278 100% 76%)" />
        </linearGradient>
      </defs>
      <path
        d="M12 2.5c.6 4.3 2.7 6.4 7 7-4.3.6-6.4 2.7-7 7-.6-4.3-2.7-6.4-7-7 4.3-.6 6.4-2.7 7-7Z"
        fill={`url(#${gradientId})`}
      />
      <circle cx="19.5" cy="5" r="1.4" fill={`url(#${gradientId})`} />
    </svg>
  );
}
