import { absoluteUrl } from '@/lib/schema'
import { articlePath, getAllArticles } from '@/lib/blog/articles'
import { getArticleMarkdown, MARKDOWN_HEADERS } from '@/lib/blog/markdown'

/**
 * Markdown version of each article. Public URL: /blog/<slug>.md (rewrite in next.config.mjs).
 * Also served at /blog/<slug> when the client asks for `Accept: text/markdown`
 * (src/middleware.ts). This internal path is marked noindex by the middleware.
 */
export const dynamic = 'force-static'
export const dynamicParams = false

export async function generateStaticParams() {
  return (await getAllArticles()).map((a) => ({ slug: a.slug }))
}

export async function GET(_request: Request, { params }: { params: { slug: string } }) {
  const markdown = await getArticleMarkdown(params.slug)
  if (!markdown) return new Response('Not found', { status: 404 })

  return new Response(markdown, {
    headers: {
      ...MARKDOWN_HEADERS,
      // The HTML page stays the canonical version for search engines.
      Link: `<${absoluteUrl(articlePath(params.slug))}>; rel="canonical"`,
    },
  })
}
