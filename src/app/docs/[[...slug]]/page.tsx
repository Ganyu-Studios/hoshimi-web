import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from "fumadocs-ui/layouts/notebook/page";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { Popup, PopupContent, PopupTrigger } from "fumadocs-twoslash/ui";
import { AutoTypeTable } from "fumadocs-typescript/ui";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ApiReference,
  apiReferenceMetadata,
  apiReferenceStaticParams,
} from "@/components/api-reference/api-reference";
import { getMDXComponents } from "@/components/mdx";
import { getPageImage, getPageMarkdownUrl, source } from "@/lib/source";
import { gitConfig } from "@/lib/shared";

// The API reference shares this catch-all instead of a sibling route: a nested
// `/docs/api/[[...]]` route is shadowed by this optional catch-all in Next, so a
// single route dispatches on the leading `api` segment.
function apiSlugFor(slug: string[] | undefined) {
  return slug?.[0] === "api" ? slug.slice(1) : undefined;
}

export default async function Page(props: PageProps<"/docs/[[...slug]]">) {
  const params = await props.params;

  const apiSlug = apiSlugFor(params.slug);
  if (apiSlug) return <ApiReference apiSlug={apiSlug} />;

  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const markdownUrl = getPageMarkdownUrl(page).url;

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      className="text-slate-900 dark:text-slate-100"
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0 text-slate-700 dark:text-slate-300">
        {page.data.description}
      </DocsDescription>
      <div className="flex flex-row items-center gap-2 border-b border-slate-300/70 pb-6 dark:border-slate-700/70">
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <ViewOptionsPopover
          markdownUrl={markdownUrl}
          githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${page.path}`}
        />
      </div>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
            AutoTypeTable,
            Popup,
            PopupContent,
            PopupTrigger,
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return [
    ...source.generateParams(),
    ...apiReferenceStaticParams().map((slug) => ({ slug })),
  ];
}

export async function generateMetadata(
  props: PageProps<"/docs/[[...slug]]">,
): Promise<Metadata> {
  const params = await props.params;

  const apiSlug = apiSlugFor(params.slug);
  if (apiSlug) return apiReferenceMetadata(apiSlug);

  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}
