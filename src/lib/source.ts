import { docs } from "collections/server";
import { type InferPageType, loader } from "fumadocs-core/source";
import { icons } from "lucide-react";
import { type CSSProperties, createElement } from "react";
import { docsContentRoute, docsImageRoute, docsRoute } from "./shared";

// Tints the lucide icon referenced by a folder's `icon` meta field so the
// sidebar mirrors the colored-by-section look of the Seyfert docs.
const iconSidebarColors: Partial<Record<keyof typeof icons, string>> = {
  Boxes: "#8b5cf6",
  BookOpen: "#f59e0b",
  Lightbulb: "#eab308",
  Rocket: "#6366f1",
  Wrench: "#f97316",
  Package: "#14b8a6",
  Workflow: "#22c55e",
  Server: "#3b82f6",
  Music: "#ec4899",
};

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: docsRoute,
  source: docs.toFumadocsSource(),
  icon(name) {
    if (name && name in icons) {
      const iconName = name as keyof typeof icons;

      return createElement(icons[iconName], {
        size: 16,
        style: { color: iconSidebarColors[iconName] } as CSSProperties,
      });
    }
  },
});

export function getPageImage(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, "image.png"];

  return {
    segments,
    url: `${docsImageRoute}/${segments.join("/")}`,
  };
}

export function getPageMarkdownUrl(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, "content.md"];

  return {
    segments,
    url: `${docsContentRoute}/${segments.join("/")}`,
  };
}

export async function getLLMText(page: InferPageType<typeof source>) {
  const processed = await page.data.getText("processed");

  return `# ${page.data.title} (${page.url})

${processed}`;
}
