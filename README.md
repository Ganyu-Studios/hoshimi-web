# docs

This is a Next.js application generated with
[Create Fumadocs](https://github.com/fuma-nama/fumadocs).

Run development server:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open http://localhost:3000 with your browser to see the result.

## Explore

In the project, you can see:

- `lib/source.ts`: Code for content source adapter, [`loader()`](https://fumadocs.dev/docs/headless/source-api) provides the interface to access your content.
- `lib/layout.shared.tsx`: Shared options for layouts, optional but preferred to keep.

| Route                          | Description                                            |
| ------------------------------ | ------------------------------------------------------ |
| `app/(home)`                   | The route group for your landing page and other pages. |
| `app/docs`                     | The documentation layout and pages.                    |
| `app/docs/api/[[...apiSlug]]`  | The generated API reference (index, kinds, exports).   |
| `app/api/search/route.ts`      | The Route Handler for search.                          |

### Fumadocs MDX

A `source.config.ts` config file has been included, you can customise different options like frontmatter schema.

Read the [Introduction](https://fumadocs.dev/docs/mdx) for further details.

### API reference generation

The API reference under `/docs/api` is generated from the `hoshimi` package's
bundled type declarations (`node_modules/hoshimi/dist/index.d.cts`).
`scripts/generate-api-reference.mjs` parses them with the TypeScript compiler API
and emits typed data under `src/lib/api-reference/` (`generated.ts`, `details.ts`,
`details/*.ts`, `search.ts`). Those files are generated, git-ignored, and rebuilt
automatically on `postinstall`, `predev`, and `prebuild`.

To regenerate manually:

```bash
pnpm api:generate
```

Because `hoshimi` is a regular dependency, no git submodule or TypeDoc build is
required — the declarations are always present after `pnpm install`.

## Learn More

To learn more about Next.js and Fumadocs, take a look at the following
resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js
  features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Fumadocs](https://fumadocs.dev) - learn about Fumadocs

## Deploy on Vercel

This project is ready to deploy on Vercel as a Next.js app.

1. Import this repository in Vercel.
2. Keep the detected framework as Next.js.
3. Build settings are already defined in `vercel.json`:
  - `installCommand`: `pnpm install --frozen-lockfile`
  - `buildCommand`: `pnpm build`

The API reference is regenerated during the build from the installed `hoshimi`
dependency, so no extra steps are needed on Vercel. Set `SKIP_CORE_API_BUILD=1`
to skip API reference generation during a build if necessary.
