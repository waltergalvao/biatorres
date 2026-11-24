// Draws the blog's share images on the edge (routes in src/app/og/blog). See src/lib/blog/og.ts.

import { homeHero } from '@/data/home'
import { fetchPhoto, renderOgCard, unsplashPhoto } from '@/lib/og'
import { BLOG_HEADLINE, BLOG_LABEL, BLOG_OG_DATA_PATH, categoryHeadline, type BlogOgData } from './og'

export type BlogOgTarget = { kind: 'blog' } | { kind: 'category'; slug: string } | { kind: 'article'; slug: string }

/**
 * Options for fetching a file of this same deployment (the post list, a cover in /public). The
 * URL comes from the request, so it works locally, on previews and in production. A protected
 * preview answers 401 to a server-side fetch, so the visitor's cookie and Vercel's automation
 * bypass secret (when the project has one) are passed along. `no-store`: the URL of a file stays
 * the same from one deploy to the next, and Next's fetch cache outlives deploys.
 */
function sameOrigin(request: Request): RequestInit {
  const headers = new Headers()
  const cookie = request.headers.get('cookie')
  if (cookie) headers.set('cookie', cookie)
  const bypass = process.env.VERCEL_AUTOMATION_BYPASS_SECRET
  if (bypass) headers.set('x-vercel-protection-bypass', bypass)
  return { headers, cache: 'no-store' }
}

async function blogData(request: Request): Promise<BlogOgData> {
  const res = await fetch(new URL(BLOG_OG_DATA_PATH, request.url), sameOrigin(request))
  // Throw rather than draw a generic card: that one would be cached for a year.
  if (!res.ok) throw new Error(`${BLOG_OG_DATA_PATH}: HTTP ${res.status}`)
  return res.json()
}

const cover = (request: Request, path: string) => fetchPhoto(new URL(path, request.url), sameOrigin(request))

const notFound = () => new Response('Not found', { status: 404 })

/** The share image of /blog, a category page or a post; 404 for one that doesn't exist. */
export async function renderBlogOg(request: Request, target: BlogOgTarget) {
  const { articles, categories } = await blogData(request)
  const label = (slug: string) => categories.find((c) => c.slug === slug)?.label

  if (target.kind === 'blog') {
    const [latest] = articles
    return renderOgCard({
      label: BLOG_LABEL,
      ...BLOG_HEADLINE,
      photo: { data: await (latest ? cover(request, latest.image) : unsplashPhoto(homeHero.image)) },
    })
  }

  if (target.kind === 'category') {
    // Same rule as the pages: a category exists once a post uses it.
    const latest = articles.find((a) => a.category === target.slug)
    const name = label(target.slug)
    if (!latest || !name) return notFound()
    return renderOgCard({ label: BLOG_LABEL, ...categoryHeadline(name), photo: { data: await cover(request, latest.image) } })
  }

  const article = articles.find((a) => a.slug === target.slug)
  if (!article) return notFound()
  return renderOgCard({
    label: `Blog · ${label(article.category) ?? 'arquitetura de interiores'}`,
    title: article.title,
    photo: { data: await cover(request, article.image) },
  })
}
