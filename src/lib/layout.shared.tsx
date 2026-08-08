import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { DiscordLogo } from "@/components/discord";
import { HoshimiLogo } from "@/components/logo";
import { appName, discordUrl, gitConfig } from "./shared";

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
      {
        // `icon` puts it beside the GitHub button instead of in the text nav;
        // `text` is what the mobile menu falls back to, where icons are not shown.
        type: "icon",
        label: "Discord",
        icon: <DiscordLogo />,
        text: "Discord",
        url: discordUrl,
        external: true,
      },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
