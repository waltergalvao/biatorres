// schema.org JSON-LD for the blog, built on the site-wide helpers (src/lib/schema.ts). The
// business, the website and Beatriz are rendered on every page by the root layout; blog nodes
// point at them by @id.

import {
  absoluteUrl,
  breadcrumbSchema,
  faqSchema,
  graph,
  SCHEMA_IDS,
  webPageId,
  webPageSchema,
} from '@/lib/schema'
import { articleMarkdownPath, articlePath, type ArticleWithSlug } from './articles'
import { categoryPath, getCategory } from './categories'
import type { FaqItem } from './content'
import { BLOG_DESCRIPTION, BLOG_ID, BLOG_PATH, BLOG_TITLE } from './site'

type Thing = Record<string, unknown>

const ref = (id: string) => ({ '@id': id })

export function blogSchema(): Thing {
  return {
    '@type': 'Blog',
    '@id': BLOG_ID,
    url: absoluteUrl(BLOG_PATH),
    name: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    inLanguage: 'pt-BR',
    isPartOf: ref(SCHEMA_IDS.website),
    publisher: ref(SCHEMA_IDS.business),
    author: ref(SCHEMA_IDS.person),
  }
}

/** /blog or a category page: Blog + CollectionPage with an ItemList of posts + BreadcrumbList. */
export function listingGraph(
  articles: ArticleWithSlug[],
  page: { name: string; description: string; path: string; crumbs: { name: string; path: string }[] },
) {
  return graph(
    blogSchema(),
    webPageSchema(page.path, {
      type: 'CollectionPage',
      name: page.name,
      description: page.description,
      about: ref(BLOG_ID),
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: articles.length,
        itemListElement: articles.map((article, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: absoluteUrl(articlePath(article.slug)),
          name: article.title,
        })),
      },
    }),
    breadcrumbSchema(page.path, page.crumbs),
  )
}

/**
 * An article page: WebPage, BlogPosting, BreadcrumbList and, when the post has a
 * "Perguntas frequentes" section, FAQPage (the questions are visible on the page).
 */
export function articleGraph(
  article: ArticleWithSlug,
  extras: { wordCount: number; faq: FaqItem[]; image?: { width: number; height: number } },
) {
  const path = articlePath(article.slug)
  const url = absoluteUrl(path)
  const category = getCategory(article.category)
  const hasFaq = extras.faq.length > 0

  return graph(
    webPageSchema(path, {
      name: article.title,
      description: article.description,
      faq: hasFaq,
      mainEntity: ref(`${url}#article`),
    }),
    {
      '@type': 'BlogPosting',
      '@id': `${url}#article`,
      url,
      mainEntityOfPage: ref(webPageId(path)),
      headline: article.title,
      description: article.description,
      image: {
        '@type': 'ImageObject',
        url: absoluteUrl(article.image),
        caption: article.imageAlt,
        ...(extras.image ?? {}),
      },
      datePublished: article.date,
      dateModified: article.updated ?? article.date,
      inLanguage: 'pt-BR',
      author: ref(SCHEMA_IDS.person),
      publisher: ref(SCHEMA_IDS.business),
      isPartOf: ref(BLOG_ID),
      articleSection: category?.label,
      wordCount: extras.wordCount,
      isAccessibleForFree: true,
      encoding: {
        '@type': 'MediaObject',
        encodingFormat: 'text/markdown',
        contentUrl: absoluteUrl(articleMarkdownPath(article.slug)),
      },
    },
    breadcrumbSchema(path, [
      { name: 'Blog', path: BLOG_PATH },
      ...(category ? [{ name: category.label, path: categoryPath(category.slug) }] : []),
      { name: article.title, path },
    ]),
    ...(hasFaq ? [faqSchema(path, extras.faq.map((f) => ({ q: f.question, a: f.answer })))] : []),
  )
}
