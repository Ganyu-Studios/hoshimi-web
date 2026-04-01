import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { appName, gitConfig } from "./shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: appName,
    },
    links: [
      {
        text: "Docs",
        url: "/docs",
        active: "nested-url",
      },
      {
        text: "Core API",
        url: "/core-api/index.html",
      },
      {
        text: "GitHub",
        url: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
        external: true,
      },
      {
        text: "NPM",
        url: "https://www.npmjs.com/package/hoshimi",
        external: true,
      },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
