import {
  ArrowRight,
  AudioLines,
  BookOpenText,
  Braces,
  Cable,
  ListMusic,
  Play,
  Server,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { CopyCommand } from "@/components/copy-command";
import { HoshimiLogo } from "@/components/logo";

const features = [
  {
    icon: Braces,
    title: "Typed Core",
    description:
      "Strict, TypeScript-first typings and type guards across the whole surface — the public API is generated from source so it never drifts.",
  },
  {
    icon: Server,
    title: "Node Management",
    description:
      "Automatic node handling with session resumption, so players survive restarts and reconnects without losing state.",
  },
  {
    icon: Play,
    title: "Built-in Autoplay",
    description:
      "Keep the queue flowing with native autoplay for YouTube and Spotify — no extra plugins required.",
  },
  {
    icon: ListMusic,
    title: "Live Lyrics",
    description:
      "First-class lyrics control with live, time-synced updates you can surface straight to your listeners.",
  },
  {
    icon: Cable,
    title: "REST + WebSocket",
    description:
      "Dual transport with fully typed helpers and a granular, debug-friendly event system for total control.",
  },
  {
    icon: AudioLines,
    title: "Extensible by Design",
    description:
      "Override nodes, players, queues and storage with your own structures — safety and validation come first.",
  },
];

const runtimes = ["Node.js 22+", "Bun 1.3+", "Deno 2.5+"];
const usedBy = ["Stelle", "Miyu", "GoTTY"];

export default function HomePage() {
  return (
    <main className="relative flex-1 overflow-hidden">
      <div aria-hidden className="absolute inset-0 hoshimi-grid opacity-40" />
      <div
        aria-hidden
        className="hoshimi-aurora pointer-events-none absolute inset-0"
      />
      <div
        aria-hidden
        className="hoshimi-stars pointer-events-none absolute inset-0"
      />

      <section className="hoshimi-animate-in relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-20 sm:py-28">
        <span className="hoshimi-badge inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-cyan-900 dark:text-cyan-100/90">
          <Sparkles className="size-3.5 hoshimi-twinkle" />
          Frost-powered Lavalink v4 client
        </span>

        <div className="max-w-3xl space-y-6">
          <h1 className="flex items-center gap-3 text-balance text-4xl font-semibold leading-tight sm:text-6xl">
            <HoshimiLogo className="hidden size-10 shrink-0 sm:block hoshimi-twinkle" />
            <span>
              Build Lavalink v4 bots with a
              <span className="hoshimi-text-glow hoshimi-text-shimmer">
                {" "}
                stylish, strict and extendable API
              </span>
            </span>
          </h1>
          <p className="max-w-2xl text-base text-slate-700 dark:text-slate-200/85 sm:text-lg">
            Official documentation for Hoshimi — a typed Lavalink v4 client
            that's easy to use and always up to date. Built with strict typing,
            clean architecture and extensibility in mind, then documented down
            to nodes, players, filters, queues, storage and structures.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/docs"
            className="group inline-flex items-center gap-2 rounded-xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-cyan-200 hover:shadow-xl hover:shadow-cyan-400/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          >
            Open Documentation
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/docs/api"
            className="group inline-flex items-center gap-2 rounded-xl border border-cyan-700/25 bg-white/70 px-5 py-3 text-sm font-medium text-cyan-950 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-500/40 hover:bg-white dark:border-cyan-100/25 dark:bg-white/5 dark:text-cyan-50 dark:hover:bg-white/10"
          >
            Explore Public API
            <BookOpenText className="size-4 transition-transform duration-200 group-hover:scale-110" />
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          <CopyCommand command="pnpm add hoshimi" />
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
            <span className="uppercase tracking-[0.18em]">Runs on</span>
            {runtimes.map((rt) => (
              <span
                key={rt}
                className="rounded-md border border-cyan-700/15 bg-white/50 px-2 py-0.5 font-medium text-cyan-900 dark:border-cyan-100/15 dark:bg-white/5 dark:text-cyan-100"
              >
                {rt}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="hoshimi-card hoshimi-lift group rounded-2xl p-5"
            >
              <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-cyan-900 dark:text-cyan-100">
                <span className="inline-flex size-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-700 transition-colors duration-200 group-hover:bg-cyan-500/20 dark:text-cyan-200">
                  <Icon className="size-4" />
                </span>
                {title}
              </h2>
              <p className="text-sm text-slate-700 dark:text-slate-200/75">
                {description}
              </p>
            </article>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
          <span className="uppercase tracking-[0.18em] text-xs">
            Trusted by
          </span>
          {usedBy.map((name) => (
            <span
              key={name}
              className="font-medium text-slate-700 dark:text-slate-200"
            >
              {name}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}
