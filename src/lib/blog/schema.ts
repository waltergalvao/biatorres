// schema.org JSON-LD for the blog. Everything points at the site-wide entities by @id
// (src/lib/schema.ts): Beatriz is the author, the practice is the publisher. Those entities
// are defined site-wide, not here; the references below only add a name and URL as a fallback.

import { absoluteUrl, SCHEMA_IDS } from '@/lib/schema'
import { articleMarkdownPath, articlePath, type ArticleWithSlug } from './articles'
import { getCategory } from './categories'
import type { FaqItem } from './content'
import { AUTHOR, BLOG_DESCRIPTION, BLOG_ID, BLOG_TITLE, SITE_NAME } from './site'

type Thing = Record<string, unknown>

export const graph = (...nodes: Thing[]) => ({ '@context': 'https://schema.org', '@graph': nodes })

const authorRef = () => ({ '@type': 'Person', '@id': SCHEMA_IDS.person, name: AUTHOR.name, url: absoluteUrl(AUTHOR.path) })
const publisherRef = () => ({ '@id': SCHEMA_IDS.business, name: SITE_NAME })

export function breadcrumbSchema(items: { name: string; path: string }[]): Thing {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function blogSchema(): Thing {
  return {
    '@type': 'Blog',
    '@id': BLOG_ID,
    url: absoluteUrl('/blog'),
    name: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    inLanguage: 'pt-BR',
    isPartOf: { '@id': SCHEMA_IDS.website },
    publisher: publisherRef(),
    author: authorRef(),
  }
}

/** A listing page (the blog index or a category): CollectionPage with an ItemList of posts. */
export function collectionSchema(
  articles: ArticleWithSlug[],
  page: { name: string; description: string; path: string },
): Thing {
  const url = absoluteUrl(page.path)
  return {
    '@type': 'CollectionPage',
    '@id': `${url}#webpage`,
    url,
    name: page.name,
    description: page.description,
    inLanguage: 'pt-BR',
    isPartOf: { '@id': SCHEMA_IDS.website },
    about: { '@id': BLOG_ID },
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
  }
}

export function blogPostingSchema(
  article: ArticleWithSlug,
  extras: { wordCount: number; image?: { width: number; height: number } },
): Thing {
  const url = absoluteUrl(articlePath(article.slug))
  return {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
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
    author: authorRef(),
    publisher: publisherRef(),
    isPartOf: { '@id': BLOG_ID },
    articleSection: getCategory(article.category)?.label,
    wordCount: extras.wordCount,
    isAccessibleForFree: true,
    encoding: {
      '@type': 'MediaObject',
      encodingFormat: 'text/markdown',
      contentUrl: absoluteUrl(articleMarkdownPath(article.slug)),
    },
  }
}

/**
 * FAQPage from the article's "Perguntas frequentes" section. The questions and answers are
 * visible on the page too, which the markup requires.
 */
export function faqSchema(slug: string, faq: FaqItem[]): Thing {
  const url = absoluteUrl(articlePath(slug))
  return {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    url,
    inLanguage: 'pt-BR',
    isPartOf: { '@id': `${url}#article` },
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}
