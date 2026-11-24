# beatriztorres.com.br

## Design tokens

Brand colors and fonts live in one file: [`src/design/tokens.ts`](src/design/tokens.ts). Run `npm run dev` and open `/marca` to see them all.

**Internal pages** (`/marca`, and `/social` for the Instagram posts) are named `page.dev.tsx` / `route.dev.ts`. They exist under `npm run dev` only; `next.config.mjs` leaves the `.dev` extensions out of production builds, so they are never deployed.

**Change a color:** edit its `hex` in `tokens.ts`. Tailwind writes every color as a CSS variable on `:root` (`--color-clay: 160 69 36`), and every class (`bg-clay`, `text-ink/70`, `border-line`…) reads that variable, so the whole site follows. Re-check the contrast notes at the top of the file when you do.

**Use the brand outside the site** (social media images, Canva, Figma, e-mail):

```ts
import { hex, colors, fonts } from '@/design/tokens'

hex.clay           // '#A04524'
colors.clay.role   // 'Ação principal e destaques (terracota)'
fonts.display.family // 'Fraunces'
```

`next/og` / Satori can't read CSS variables, so images generated in code should use `hex`.

**Re-theme a part of the page** without touching the tokens, by overriding the variables:

```css
[data-theme='campanha'] {
  --color-clay: 30 90 140; /* R G B, no commas */
}
```

**Add a color:** add it to `colors` in `tokens.ts` and map it in `tailwind.config.ts` (`newName: color('newName')`). Never write a hex value in a component.

## SEO, AEO and GEO

The site is built to be understood by search engines and by AI assistants (ChatGPT, Claude, Perplexity, Google AI Overviews, Copilot). Most of it is generated from the same data files as the pages, so it stays in sync on its own.

| What | Where | Notes |
|---|---|---|
| Titles, descriptions, canonical, Open Graph, Twitter | `pageMetadata()` in [`src/lib/metadata.ts`](src/lib/metadata.ts) | Services and landing pages read `seo` from `src/data/services.ts` / `src/data/audiences.ts`. Title about 40 characters (the layout adds " \| Beatriz Torres"), description 140 to 160. |
| Structured data (JSON-LD) | [`src/lib/schema.ts`](src/lib/schema.ts), rendered with `<JsonLd>` | The business (`ProfessionalService`), the website and Beatriz (`Person`) are on every page and linked by `@id`. Pages add `WebPage`/`ProfilePage`/`ContactPage`, `BreadcrumbList`, `Service` with the public prices and `FAQPage` with the questions shown on the page. |
| Share images | `opengraph-image.tsx` files, drawn by [`src/lib/og.tsx`](src/lib/og.tsx) | Default image plus one per service and landing page, with the price. `/logo.png` and the Apple icon come from the same file. |
| Sitemap | [`src/app/sitemap.ts`](src/app/sitemap.ts) | Indexable pages only. `lastmod` only where the date is real (blog articles). |
| robots.txt | [`src/app/robots.ts`](src/app/robots.ts) | Everyone allowed, AI crawlers named explicitly. `/md/` blocked (`/marca` and `/social` aren't deployed). |
| `/llms.txt`, `/llms-full.txt` | [`src/lib/llms.ts`](src/lib/llms.ts) | Markdown summary (and full text) of services, prices, audiences, process, FAQ and blog articles, for AI assistants and agents. |
| `Link` headers | `headers()` in `next.config.mjs` | Every page points to `/sitemap.xml` and `/llms.txt`. |

**When you add a page:** export `metadata = pageMetadata({...})`, add a `graph(webPageSchema(...), breadcrumbSchema(...))` with `<JsonLd>`, and add the path to `sitemap.ts` (and to the page list in `src/lib/llms.ts` if it matters to clients). Internal pages get `robots: { index: false, follow: false }` and stay out of the sitemap.

**Rules:** mark up only what is visible on the page; no `Review` or `AggregateRating` until the testimonials are real; don't add credentials (CAU number, schools) to the schema until they are confirmed on the site.

**Check:** paste a page URL into [Rich Results Test](https://search.google.com/test/rich-results) or [validator.schema.org](https://validator.schema.org), and share a link on WhatsApp to see the card.

## Blog

Posts are MDX pages in `src/app/blog/(posts)/<slug>/page.mdx`; the folder name is the URL. To write one, use the `artigos-blog` skill (`.claude/skills/artigos-blog/SKILL.md`): it has the voice, the structure (quick answer, question headings, `## Perguntas frequentes`), the rules (no prices in articles, link to the service pages) and the file template.

From each post the site builds: the page (breadcrumb, dates, table of contents, author box, related posts, WhatsApp CTAs), `BlogPosting` + `BreadcrumbList` + `FAQPage` JSON-LD (the FAQ comes from the `## Perguntas frequentes` section), `/blog/<slug>.md` (also served at `/blog/<slug>` to clients that send `Accept: text/markdown`), `/blog/rss.xml`, and the entries in the sitemap and `/llms*.txt`. Categories live in `src/lib/blog/categories.ts`; a category gets a page (`/blog/categoria/<slug>`) once an article uses it. The code is in `src/lib/blog/` and `src/components/blog/`.

### IndexNow

After a production deploy that adds or changes pages, tell Bing (and so ChatGPT search and Copilot) right away:

```bash
npm run indexnow -- --dry-run   # see what would be sent
npm run indexnow                # pages with lastmod in the last 3 days (blog articles)
npm run indexnow -- --all       # every page, e.g. after changing prices
```

The key file is `public/eef4f03111b1a8f9df1666c2a7ca61b6.txt`; it must stay published for submissions to be accepted.
