import type * as PageTree from "fumadocs-core/page-tree";
import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import { FullSearchTrigger } from "fumadocs-ui/layouts/shared/slots/search-trigger";
import {
  Box,
  Braces,
  GraduationCap,
  Component as InterfaceIcon,
  ListTree,
  Sigma,
  SquareFunction,
  Variable as VariableIcon,
} from "lucide-react";
import { type CSSProperties, createElement, type ReactNode } from "react";
import { type DocsNavTab, DocsNavTabs } from "@/components/docs/docs-nav-tabs";
import { NavTabsRail } from "@/components/docs/nav-tabs-rail";
import { SidebarActiveRail } from "@/components/docs/sidebar-active-rail";
import {
  type ApiEntry,
  type ApiKind,
  apiEntries,
} from "@/lib/api-reference/generated";
import {
  apiKindLabel,
  apiKindOrder,
  apiKindSlug,
  apiKindStyles,
} from "@/lib/api-reference/kinds";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";

const apiKindIcons: Record<ApiKind, typeof Box> = {
  Class: Box,
  Function: SquareFunction,
  Interface: InterfaceIcon,
  TypeAlias: Sigma,
  Enum: ListTree,
  Variable: VariableIcon,
};

const apiEntriesByKind = new Map<ApiKind, ApiEntry[]>();
for (const entry of apiEntries) {
  const list = apiEntriesByKind.get(entry.kind);
  if (list) list.push(entry);
  else apiEntriesByKind.set(entry.kind, [entry]);
}

function coloredIcon(Icon: typeof Box, color: string, key: string): ReactNode {
  return createElement(Icon, {
    key,
    size: 16,
    style: { color } as CSSProperties,
  });
}

function apiKindFolder(kind: ApiKind): PageTree.Folder {
  const entries = apiEntriesByKind.get(kind) ?? [];

  return {
    type: "folder",
    $id: `api-${kind.toLowerCase()}`,
    name: apiKindLabel[kind],
    icon: coloredIcon(
      apiKindIcons[kind],
      apiKindStyles[kind].iconColor,
      `api-${kind}-icon`,
    ),
    defaultOpen: false,
    children: [
      {
        type: "page",
        $id: `api-kind-${kind.toLowerCase()}-overview`,
        name: "Overview",
        url: `/docs/api/${apiKindSlug[kind]}`,
      },
      ...entries.map((entry) => ({
        type: "page" as const,
        $id: `api-entry-${entry.slug}`,
        name: entry.name,
        url: `/docs/api/${entry.slug}`,
      })),
    ],
  };
}

function apiRootFolder(): PageTree.Folder {
  return {
    type: "folder",
    root: true,
    $id: "api-reference",
    name: "API",
    icon: coloredIcon(Braces, "#8b5cf6", "api-root-icon"),
    index: {
      type: "page",
      $id: "api-root-index",
      name: "Overview",
      url: "/docs/api",
    },
    // Overview is also a child so the navbar tab counts as active on the
    // `/docs/api` landing page (isLayoutTabActive only scans child pages).
    children: [
      {
        type: "page",
        $id: "api-root-index-link",
        name: "Overview",
        url: "/docs/api",
      },
      ...apiKindOrder.map((kind) => apiKindFolder(kind)),
    ],
  };
}

function guideRootFolder(): PageTree.Folder {
  const tree = source.getPageTree();
  const index = tree.children.find(
    (child) => child.type === "page" && child.url === "/docs",
  );

  return {
    type: "folder",
    root: true,
    $id: "guide-root",
    name: "Guide",
    icon: coloredIcon(GraduationCap, "#6366f1", "guide-root-icon"),
    index: index?.type === "page" ? index : undefined,
    // Keep the index page among the children so the Guide tab activates on the
    // `/docs` landing page too.
    children: tree.children,
  };
}

function tabFor(folder: PageTree.Folder, fallbackUrl: string): DocsNavTab {
  // The icon is folded into the title: the tab renders a single node.
  return {
    title: (
      <span className="inline-flex items-center gap-2">
        {folder.icon}
        {folder.name}
      </span>
    ),
    url: folder.index?.url ?? fallbackUrl,
  };
}

function buildTree(): { tree: PageTree.Root; tabs: DocsNavTab[] } {
  const guide = guideRootFolder();
  const api = apiRootFolder();

  return {
    tree: {
      $id: "docs-root",
      name: "Documentation",
      children: [guide, api],
    },
    tabs: [tabFor(guide, "/docs"), tabFor(api, "/docs/api")],
  };
}

export default function Layout({ children }: LayoutProps<"/docs">) {
  const { tree, tabs } = buildTree();
  const base = baseOptions();

  return (
    <div className="hoshimi-docs">
      <SidebarActiveRail />
      <NavTabsRail />
      <DocsLayout
        {...base}
        tree={tree}
        // Sections are switched from our own navbar tabs, so fumadocs' tab UI
        // (second navbar row / sidebar dropdown) is turned off.
        tabs={false}
        sidebar={{
          defaultOpenLevel: 0,
          // Search lives at the top of the sidebar (and its mobile drawer).
          banner: <FullSearchTrigger className="w-full" />,
        }}
        searchToggle={{
          components: {
            // The slot that used to hold the search field now holds the tabs.
            lg: <DocsNavTabs tabs={tabs} />,
          },
        }}
      >
        {children}
      </DocsLayout>
    </div>
  );
}
