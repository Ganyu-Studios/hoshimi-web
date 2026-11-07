import { codeToTokensWithThemes } from "shiki";

// Taken from the guides (setup, search and playback), condensed into one flow so
// the landing page shows the library instead of describing it.
const code = `import { createHoshimi, SearchSources } from 'hoshimi';

const manager = createHoshimi({
  sendPayload,
  defaultSearchSource: SearchSources.Spotify,
  nodes: [
    { host: 'localhost', port: 2333, password: 'youshallnotpass' },
  ],
});

const player = manager.createPlayer({ guildId, voiceId, textId });
if (!player.connected) await player.connect();

const result = await player.search({
  query: 'Lofi hip hop',
  requester,
});
await player.queue.add(result.tracks[0]);
await player.play();`;

/**
 * Static, server-rendered code sample. Tokens carry both theme colors as CSS
 * variables, so light/dark follows the site theme with no client JS.
 */
export async function HeroCode() {
  const tokens = await codeToTokensWithThemes(code, {
    lang: "ts",
    themes: { light: "github-light", dark: "github-dark" },
  });

  return (
    <figure className="overflow-hidden rounded-xl border border-border bg-card/70 shadow-[0_30px_60px_-40px_hsl(242_70%_2%/0.6)]">
      <figcaption className="flex items-center justify-between border-b border-border px-4 py-2.5 font-mono text-xs text-muted-foreground">
        <span>bot.ts</span>
        <span>TypeScript</span>
      </figcaption>
      <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-6 sm:p-5 sm:text-[13px]">
        <code>
          {tokens.map((line, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static, never reordered
            <span key={i} className="block">
              {line.length === 0 ? "​" : null}
              {line.map((token, j) => (
                <span
                  // biome-ignore lint/suspicious/noArrayIndexKey: static, never reordered
                  key={j}
                  className="text-(--shiki-light) dark:text-(--shiki-dark)"
                  style={
                    {
                      "--shiki-light": token.variants.light?.color,
                      "--shiki-dark": token.variants.dark?.color,
                    } as React.CSSProperties
                  }
                >
                  {token.content}
                </span>
              ))}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}
