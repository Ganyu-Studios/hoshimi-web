import { createSearchAPI } from "fumadocs-core/search/server";
import { apiEntries } from "@/lib/api-reference/generated";
import { apiKindSingleLabel } from "@/lib/api-reference/kinds";
import { apiSearchEntries } from "@/lib/api-reference/search";
import { source } from "@/lib/source";

type StructuredData = {
  headings: { id: string; content: string }[];
  contents: { heading: string | undefined; content: string }[];
};

const apiContentBySlug = new Map(
  apiSearchEntries.map((entry) => [entry.slug, entry.content]),
);

// Indexes both the MDX guide pages and every generated API export so exports
// (and their members) are findable from the search bar.
export const { GET } = createSearchAPI("advanced", {
  // https://docs.orama.com/docs/orama-js/supported-languages
  language: "english",
  indexes: async () => {
    const docs = await Promise.all(
      source.getPages().map(async (page) => {
        const raw = (page.data as { structuredData?: unknown }).structuredData;
        const structuredData = (
          typeof raw === "function" ? await raw() : raw
        ) as StructuredData;

        return {
          id: page.url,
          title: page.data.title,
          description: page.data.description,
          url: page.url,
          structuredData,
        };
      }),
    );

    const api = apiEntries.map((entry) => ({
      id: `api-${entry.slug}`,
      title: entry.name,
      description: entry.summary || apiKindSingleLabel[entry.kind],
      url: `/docs/api/${entry.slug}`,
      structuredData: {
        headings: [],
        contents: [
          { heading: undefined, content: `${entry.name} — ${entry.kind}` },
          ...(entry.summary
            ? [{ heading: undefined, content: entry.summary }]
            : []),
          {
            heading: undefined,
            content: apiContentBySlug.get(entry.slug) ?? entry.name,
          },
        ],
      } satisfies StructuredData,
    }));

    return [...docs, ...api];
  },
});
