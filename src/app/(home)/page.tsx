import Link from "next/link";
import {
  ArrowRight,
  BookOpenText,
  Braces,
  Cable,
  Layers,
  Sparkles,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="relative flex-1 overflow-hidden">
      <div className="absolute inset-0 hoshimi-grid opacity-40" />

      <section className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-20 sm:py-28">
        <span className="hoshimi-badge inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-cyan-900 dark:text-cyan-100/90">
          <Sparkles className="size-3.5" />
          Hoshimi Documentation
        </span>

        <div className="max-w-3xl space-y-6">
          <h1 className="text-balance text-4xl font-semibold leading-tight sm:text-6xl">
            Build Lavalink v4 bots with a
            <span className="hoshimi-text-glow">
              {" "}
              stylish, strict and extendable API
            </span>
          </h1>
          <p className="max-w-2xl text-base text-slate-700 dark:text-slate-200/85 sm:text-lg">
            Official documentation for Hoshimi, a typed Lavalink v4 client built
            for modern music bots. Learn the fundamentals fast, then dive into
            nodes, players, filters, queues, storage, and extensible structures.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
          >
            Open Documentation
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/core-api/index.html"
            className="inline-flex items-center gap-2 rounded-xl border border-cyan-700/25 bg-white/70 px-5 py-3 text-sm font-medium text-cyan-950 transition hover:bg-white dark:border-cyan-100/25 dark:bg-white/5 dark:text-cyan-50 dark:hover:bg-white/10"
          >
            Explore Public API
            <BookOpenText className="size-4" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <article className="hoshimi-card rounded-2xl p-5">
            <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-cyan-900 dark:text-cyan-100">
              <Braces className="size-4" />
              Typed Core
            </h2>
            <p className="text-sm text-slate-700 dark:text-slate-200/75">
              The complete public API is documented from source definitions, so
              classes, methods, and types stay in sync.
            </p>
          </article>
          <article className="hoshimi-card rounded-2xl p-5">
            <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-cyan-900 dark:text-cyan-100">
              <Layers className="size-4" />
              Modular Systems
            </h2>
            <p className="text-sm text-slate-700 dark:text-slate-200/75">
              Hoshimi separates node, player, queue and storage concerns so you
              can override structures safely.
            </p>
          </article>
          <article className="hoshimi-card rounded-2xl p-5">
            <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-cyan-900 dark:text-cyan-100">
              <Cable className="size-4" />
              Ready for Scale
            </h2>
            <p className="text-sm text-slate-700 dark:text-slate-200/75">
              Designed for music bots with multiple nodes, resumable sessions
              and explicit control over transport.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
