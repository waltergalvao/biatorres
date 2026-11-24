// Share images of the blog: where they live and how pages point at them.
//
// Every post gets its own card (title, category, cover photo) with no file in the post's folder:
// the images are drawn by edge routes under /og/blog (src/app/og/blog), which read the list of
// posts from /og/blog/articles.json, a static file built from the MDX posts at build time. The
// edge runtime can't read the posts folder itself (see src/lib/og.tsx for why edge).
//
// No imports with side effects here: this file is used by the Node metadata code and by the
// edge routes.

import type { Metadata } from 'next'
import { OG_CONTENT_TYPE, OG_SIZE, ogVersion } from '@/lib/og-size'
import type { Article } from './articles'

/** What the edge routes know about each post (newest first) and each category. */
export type BlogOgData = {
  articles: (Pick<Article, 'title' | 'category' | 'image'> & { slug: string })[]
  categories: { slug: string; label: string }[]
}

export const BLOG_OG_DATA_PATH = '/og/blog/articles.json'

export const blogOgPath = {
  blog: '/og/blog',
  category: (slug: string) => `/og/blog/categoria/${slug}`,
  article: (slug: string) => `/og/blog/${slug}`,
}

/** Label of the /blog and category cards: says what the blog is about before the headline does. */
export const BLOG_LABEL = 'Blog de arquitetura de interiores'

/** The /blog headline, also drawn on its share image. */
export const BLOG_HEADLINE = { title: 'Respostas para quem vai morar bem em', accent: 'poucos metros' }

/** Card title of a category page: "Artigos sobre *studios*". */
export const categoryHeadline = (label: string) => ({
  title: 'Artigos sobre',
  accent: label.charAt(0).toLocaleLowerCase('pt-BR') + label.slice(1),
})

type Cover = Pick<Article, 'title' | 'category' | 'image' | 'date' | 'updated'>

/** Changes whenever what the card shows changes (title, category, cover). */
const coverVersion = (a?: Cover) => (a ? [a.title, a.category, a.image, a.updated ?? a.date] : [])

type OgImages = NonNullable<NonNullable<Metadata['openGraph']>['images']>

function image(path: string, version: string, alt: string): OgImages {
  return [{ url: `${path}?v=${version}`, ...OG_SIZE, alt, type: OG_CONTENT_TYPE }]
}

/** /blog: the headline on the newest post's cover. */
export const blogOgImage = (latest?: Cover) =>
  image(blogOgPath.blog, ogVersion('blog', BLOG_LABEL, ...coverVersion(latest)), 'Blog da Beatriz Torres Arquitetura sobre apartamentos pequenos')

/** A category page: its name on the cover of its newest post. */
export const categoryOgImage = (category: { slug: string; label: string }, latest?: Cover) =>
  image(
    blogOgPath.category(category.slug),
    ogVersion('category', BLOG_LABEL, category.slug, category.label, ...coverVersion(latest)),
    `${category.label}: artigos do blog da Beatriz Torres Arquitetura`,
  )

/** A post: its title and category on its cover. */
export const articleOgImage = (slug: string, article: Cover, categoryLabel = '') =>
  image(blogOgPath.article(slug), ogVersion('article', BLOG_LABEL, categoryLabel, ...coverVersion(article)), article.title)
