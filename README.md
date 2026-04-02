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

| Route                     | Description                                            |
| ------------------------- | ------------------------------------------------------ |
| `app/(home)`              | The route group for your landing page and other pages. |
| `app/docs`                | The documentation layout and pages.                    |
| `app/api/search/route.ts` | The Route Handler for search.                          |

### Fumadocs MDX

A `source.config.ts` config file has been included, you can customise different options like frontmatter schema.

Read the [Introduction](https://fumadocs.dev/docs/mdx) for further details.

### Core API generation

The TypeDoc site in `public/core-api` is generated from the `hoshimi` git submodule.

To refresh it after updating the submodule, run:

```bash
pnpm core-api:build
```

If the submodule is not present yet, initialize it first:

```bash
git submodule update --init --recursive
```

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
  - `buildCommand`: `SKIP_CORE_API_BUILD=1 pnpm build`

### Why `SKIP_CORE_API_BUILD=1`?

The docs core API (`public/core-api`) is generated from the `hoshimi` git submodule.
In Vercel builds, the submodule might not be present, so we skip TypeDoc generation and use the committed static artifacts in `public/core-api` and `public/core-api.json`.

If you update the submodule locally, regenerate these artifacts before pushing:

```bash
git submodule update --init --recursive
pnpm core-api:build
```
