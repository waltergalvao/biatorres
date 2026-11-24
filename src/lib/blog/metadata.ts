// Page metadata for the blog, built on the site-wide pageMetadata() (src/lib/metadata.ts), so
// blog pages get the same title suffix (from the root layout's template), site name and locale.

import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import { absoluteUrl } from '@/lib/schema'
import { articleMarkdownPath, articlePath, findArticleSlug, type Article } from './articles'
import { getCategory } from './categories'
import { getImageSize } from './image'
import { AUTHOR, RSS_PATH } from './site'

/**
 * Listing pages: /blog and the category pages. A page-level openGraph drops the inherited
 * default image (and that one shows a price, which the blog avoids), so the share image is
 * the cover of the newest article listed.
 */
export async function blogPageMetadata({
  cover,
  ...page
}: {
  title: string
  description: string
  path: string
  cover?: Pick<Article, 'image' | 'imageAlt'>
}): Promise<Metadata> {
  const base = pageMetadata(page)
  const size = cover && (await getImageSize(cover.image))
  const images = cover ? [{ url: cover.image, alt: cover.imageAlt, ...(size ?? {}) }] : undefined
  return {
    ...base,
    alternates: { ...base.alternates, types: { 'application/rss+xml': RSS_PATH } },
    ...(images ? { openGraph: { ...base.openGraph, images }, twitter: { ...base.twitter, images } } : {}),
  }
}

/**
 * Metadata of a post. In the MDX file:
 *
 *   export const generateMetadata = () => articleMetadata(article)
 */
export async function articleMetadata(article: Article): Promise<Metadata> {
  const slug = await findArticleSlug(article)
  const path = slug ? articlePath(slug) : '/blog'
  const size = await getImageSize(article.image)
  const images = [{ url: article.image, alt: article.imageAlt, ...(size ?? {}) }]
  // og:title is the article's title alone; the <title> gets the site suffix.
  const base = pageMetadata({ title: article.title, description: article.description, path, socialTitle: article.title })

  return {
    ...base,
    authors: [{ name: AUTHOR.name, url: absoluteUrl(AUTHOR.path) }],
    alternates: {
      ...base.alternates,
      types: {
        ...(slug ? { 'text/markdown': articleMarkdownPath(slug) } : {}),
        'application/rss+xml': RSS_PATH,
      },
    },
    openGraph: {
      ...base.openGraph,
      type: 'article',
      publishedTime: article.date,
      modifiedTime: article.updated ?? article.date,
      authors: [absoluteUrl(AUTHOR.path)],
      section: getCategory(article.category)?.label,
      images,
    },
    twitter: { ...base.twitter, images },
  }
}
