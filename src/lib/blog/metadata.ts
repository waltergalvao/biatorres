// Page metadata for the blog, built on the site-wide pageMetadata() (src/lib/metadata.ts), so
// blog pages get the same title suffix (from the root layout's template), site name and locale.

import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import { absoluteUrl } from '@/lib/schema'
import { articleMarkdownPath, articlePath, findArticleSlug, type Article } from './articles'
import { getCategory } from './categories'
import { articleOgImage, blogOgImage } from './og'
import { AUTHOR, RSS_PATH } from './site'

type OgImages = ReturnType<typeof blogOgImage>

/**
 * Listing pages: /blog and the category pages. A page-level openGraph replaces the parent's
 * whole openGraph object, images included, so each page states its share image here: a card
 * drawn by /og/blog (src/lib/blog/og.ts).
 */
export async function blogPageMetadata({
  images,
  ...page
}: {
  title: string
  description: string
  path: string
  /** blogOgImage() or categoryOgImage() from src/lib/blog/og.ts. */
  images: OgImages
}): Promise<Metadata> {
  const base = pageMetadata(page)
  return {
    ...base,
    alternates: { ...base.alternates, types: { 'application/rss+xml': RSS_PATH } },
    openGraph: { ...base.openGraph, images },
    twitter: { ...base.twitter, images },
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
  // The post's own card (title, category, cover), drawn by /og/blog/<slug>. Set here because
  // this openGraph replaces the parent's, images included.
  const images = slug ? articleOgImage(slug, article, getCategory(article.category)?.label) : blogOgImage()
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
