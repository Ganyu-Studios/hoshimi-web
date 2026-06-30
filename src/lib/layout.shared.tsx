import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { HoshimiLogo } from "@/components/logo";
import { appName, gitConfig } from "./shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="group/brand inline-flex items-center gap-2 font-semibold">
          <HoshimiLogo className="size-5 transition-transform duration-300 ease-out group-hover/brand:rotate-[18deg] group-hover/brand:scale-110" />
          {appName}
        </span>
      ),
    },
    links: [
      {
        text: "NPM",
        url: "https://www.npmjs.com/package/hoshimi",
        external: true,
      },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
