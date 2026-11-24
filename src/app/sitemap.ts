import type { MetadataRoute } from 'next'
import { serviceHref, serviceOrder } from '@/data/services'
import { audienceHref, audienceOrder } from '@/data/audiences'
import { absoluteUrl } from '@/lib/schema'
import { articlePath, getAllArticles } from '@/lib/blog/articles'

// Only indexable pages. Left out on purpose: /marca and /social (internal, noindex), the
// Markdown versions of articles (/blog/<slug>.md), /llms.txt and /llms-full.txt.
//
// lastModified only where the date is real (articles: `updated ?? date`; /blog: the newest
// article). The other pages have none rather than the build date, which would tell search
// engines that every page changes on every deploy.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles()
  const articleDate = (a: (typeof articles)[number]) => a.updated ?? a.date
  const newest = articles.map(articleDate).sort().at(-1)

  const page = (path: string, priority: number, lastModified?: string): MetadataRoute.Sitemap[number] => ({
    url: absoluteUrl(path),
    ...(lastModified ? { lastModified } : {}),
    priority,
  })

  return [
    page('/', 1),
    ...serviceOrder.map((slug) => page(serviceHref(slug), 0.9)),
    ...audienceOrder.map((slug) => page(audienceHref(slug), 0.8)),
    page('/blog', 0.7, newest),
    ...articles.map((a) => page(articlePath(a.slug), 0.6, articleDate(a))),
    page('/sobre', 0.6),
    page('/contato', 0.5),
  ]
}
