import { getAllArticles } from '@/lib/blog/articles'
import { CATEGORIES } from '@/lib/blog/categories'
import type { BlogOgData } from '@/lib/blog/og'

/**
 * The posts the blog's share images can draw, built from the MDX posts at build time. Read by
 * the edge routes next to this one, which can't read the posts folder (see src/lib/blog/og.ts).
 */
export const dynamic = 'force-static'

export async function GET() {
  const data: BlogOgData = {
    articles: (await getAllArticles()).map(({ slug, title, category, image }) => ({ slug, title, category, image })),
    categories: CATEGORIES.map(({ slug, label }) => ({ slug, label })),
  }
  return Response.json(data, { headers: { 'X-Robots-Tag': 'noindex' } })
}
