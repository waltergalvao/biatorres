// Page metadata for the blog. Next.js doesn't deep-merge nested metadata (a page's openGraph
// replaces the layout's), so each page states the site name, locale and image again here.

import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/schema'
import { articleMarkdownPath, articlePath, findArticleSlug, type Article } from './articles'
import { getCategory } from './categories'
import { getImageSize } from './image'
import { AUTHOR, RSS_PATH, SITE_NAME, titleWithBrand } from './site'

/** Listing pages: /blog and the category pages. */
export async function blogPageMetadata({
  title,
  description,
  path,
  cover,
}: {
  title: string
  description: string
  path: string
  /** The newest listed article: its cover is the page's share image. */
  cover?: Pick<Article, 'image' | 'imageAlt'>
}): Promise<Metadata> {
  const size = cover && (await getImageSize(cover.image))
  const images = cover ? [{ url: cover.image, alt: cover.imageAlt, ...(size ?? {}) }] : undefined
  return {
    title,
    description,
    alternates: { canonical: path, types: { 'application/rss+xml': RSS_PATH } },
    openGraph: { title, description, url: path, siteName: SITE_NAME, locale: 'pt_BR', type: 'website', images },
    twitter: { card: images ? 'summary_large_image' : 'summary', title, description, images },
  }
}

/**
 * Metadata of a post. In the MDX file:
 *
 *   export const generateMetadata = () => articleMetadata(article)
 */
export async function articleMetadata(article: Article): Promise<Metadata> {
  const slug = await findArticleSlug(article)
  const title = titleWithBrand(article.title)
  const url = slug ? articlePath(slug) : undefined
  const size = await getImageSize(article.image)
  const images = [{ url: article.image, alt: article.imageAlt, ...(size ?? {}) }]
  const section = getCategory(article.category)?.label

  return {
    title,
    description: article.description,
    authors: [{ name: AUTHOR.name, url: absoluteUrl(AUTHOR.path) }],
    alternates: url
      ? {
          canonical: url,
          types: { 'text/markdown': articleMarkdownPath(slug!), 'application/rss+xml': RSS_PATH },
        }
      : undefined,
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      url,
      siteName: SITE_NAME,
      locale: 'pt_BR',
      publishedTime: article.date,
      modifiedTime: article.updated ?? article.date,
      authors: [absoluteUrl(AUTHOR.path)],
      section,
      images,
    },
    twitter: { card: 'summary_large_image', title: article.title, description: article.description, images },
  }
}
