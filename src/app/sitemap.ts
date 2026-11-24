import type { MetadataRoute } from 'next'
import { serviceHref, serviceOrder } from '@/data/services'
import { audienceHref, audienceOrder } from '@/data/audiences'
import { absoluteUrl } from '@/lib/schema'
import { articlePath, getAllArticles, lastModified } from '@/lib/blog/articles'
import { getCategories } from '@/lib/blog/categories'

// Only indexable pages. Left out on purpose: the
// Markdown versions of articles (/blog/<slug>.md), /llms.txt and /llms-full.txt.
//
// lastModified only where the date is real (articles: `updated ?? date`; /blog: the newest
// article). The other pages have none rather than the build date, which would tell search
// engines that every page changes on every deploy.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, categories] = await Promise.all([getAllArticles(), getCategories()])
  const newest = articles.map(lastModified).sort().at(-1)

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
    // Category pages that exist (at least one article), dated by their newest article.
    ...categories.map((c) => page(c.path, 0.5, articles.filter((a) => a.category === c.slug).map(lastModified).sort().at(-1))),
    ...articles.map((a) => page(articlePath(a.slug), 0.6, lastModified(a))),
    page('/sobre', 0.6),
    page('/contato', 0.5),
  ]
}
