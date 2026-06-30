"use client";

import { Check, Copy, Terminal } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Install snippet with a copy-to-clipboard affordance, mirroring the docs'
 * "Copy Markdown" control. Frost-tinted to match the Hoshimi hero.
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
      className="hoshimi-card group flex w-full max-w-md items-center gap-3 rounded-xl px-4 py-3 text-left font-mono text-sm transition-all duration-200 hover:-translate-y-0.5"
    >
      <Terminal className="size-4 shrink-0 text-cyan-600 dark:text-cyan-300" />
      <span className="flex-1 truncate">
        <span className="select-none text-slate-400 dark:text-slate-500">
          ${" "}
        </span>
        <span className="text-slate-800 dark:text-slate-100">{command}</span>
      </span>
      <span className="shrink-0 text-slate-400 transition-colors group-hover:text-cyan-600 dark:group-hover:text-cyan-300">
        {copied ? (
          <Check className="size-4 text-emerald-500" />
        ) : (
          <Copy className="size-4" />
        )}
      </span>
    </button>
  );
}
