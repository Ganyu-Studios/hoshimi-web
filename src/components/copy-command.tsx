"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Install snippet with a copy-to-clipboard affordance. Flat and monospaced so
 * it reads as a command, not a card.
 */
export function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(id);
  }, [copied]);

  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(command).then(() => setCopied(true));
      }}
      aria-label={`Copy "${command}" to clipboard`}
      className="group inline-flex items-center gap-3 rounded-lg border border-border bg-card/60 px-4 py-2.5 text-left font-mono text-sm transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span className="select-none text-muted-foreground">$</span>
      <span className="text-foreground">{command}</span>
      <span className="ms-2 text-muted-foreground transition-colors group-hover:text-primary">
        {copied ? (
          <Check className="size-4 text-emerald-500" />
        ) : (
          <Copy className="size-4" />
        )}
      </span>
    </button>
  );
}
