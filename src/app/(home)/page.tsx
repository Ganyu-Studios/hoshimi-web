import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { CopyCommand } from "@/components/copy-command";
import { HeroCode } from "@/components/home/hero-code";

const features = [
  {
    title: "Typed end to end",
    description:
      "Strict TypeScript across the whole surface, with type guards where it counts. The public API reference is generated from the source, so it never drifts.",
  },
  {
    title: "Nodes that recover",
    description:
      "Session resumption keeps players alive through restarts and reconnects, without losing the queue or the position.",
  },
  {
    title: "Autoplay built in",
    description:
      "Native autoplay for YouTube and Spotify keeps the queue moving. No extra plugins to install or wire up.",
  },
  {
    title: "Live, synced lyrics",
    description:
      "Lyrics are a first-class feature, with time-synced updates you can show to listeners as the track plays.",
  },
  {
    title: "REST and WebSocket",
    description:
      "Both transports behind typed helpers, plus a granular event system that makes debugging a node straightforward.",
  },
  {
    title: "Replace any layer",
    description:
      "Swap nodes, players, queues and storage for your own structures. Validation stays on, so overrides can't break the rest.",
  },
];

const paths = [
  {
    href: "/docs",
    title: "Guide",
    description: "Set up the manager, wire the gateway, play a first track.",
  },
  {
    href: "/docs/api",
    title: "API reference",
    description: "Every public class, function, interface and type.",
  },
  {
    href: "/docs/recipes",
    title: "Recipes",
    description: "Small, copyable solutions for common bot features.",
  },
];

const runtimes = ["Node.js 22+", "Bun 1.3+", "Deno 2.5+"];
const usedBy = ["Stelle", "Miyu", "GoTTY"];

export default function HomePage() {
  return (
    <main className="flex-1">
      <section className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pt-16 pb-20 sm:pt-24 sm:pb-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
        <div className="space-y-8">
          <h1 className="text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]">
            A typed Lavalink client for modern music bots.
          </h1>

          <p className="max-w-lg text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Strict typing, a clean architecture, and every layer replaceable.
            Nodes, players, queues, filters and storage, all documented down to
            the structure.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link
              href="/docs"
              className="group inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Read the docs
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/docs/api"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-primary"
            >
              Browse the API
              <ArrowUpRight className="size-4 text-muted-foreground" />
            </Link>
          </div>

          <div className="space-y-3">
            <CopyCommand command="pnpm add hoshimi" />
            <p className="text-xs text-muted-foreground">
              {runtimes.join("  ·  ")}
            </p>
          </div>
        </div>

        <HeroCode />
      </section>

      <section className="border-t border-border">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
          <h2 className="max-w-md text-2xl font-semibold tracking-tight sm:text-3xl">
            What you get out of the box
          </h2>

          <dl className="mt-12 grid gap-x-16 md:grid-cols-2">
            {features.map(({ title, description }) => (
              <div key={title} className="border-t border-border py-6">
                <dt className="font-semibold">{title}</dt>
                <dd className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                  {description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Start here
          </h2>

          <ul className="mt-10 divide-y divide-border border-y border-border">
            {paths.map(({ href, title, description }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group flex items-center justify-between gap-6 py-5 transition-colors hover:text-primary focus-visible:outline-none focus-visible:text-primary"
                >
                  <span className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
                    <span className="text-lg font-semibold sm:w-40">
                      {title}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {description}
                    </span>
                  </span>
                  <ArrowRight className="size-5 shrink-0 text-muted-foreground transition-all duration-200 group-hover:translate-x-1 group-hover:text-primary" />
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-10 text-sm text-muted-foreground">
            Used by{" "}
            {usedBy.map((name, i) => (
              <span key={name}>
                <span className="font-medium text-foreground">{name}</span>
                {i < usedBy.length - 1 ? ", " : ""}
              </span>
            ))}
            .
          </p>
        </div>
      </section>
    </main>
  );
}
