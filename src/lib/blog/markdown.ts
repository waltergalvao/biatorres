// Plain-Markdown version of each article, for AI assistants and agents
// (/blog/<slug>.md, Accept: text/markdown, /llms-full.txt).

import { absoluteUrl } from '@/lib/schema'
import { SITE_URL } from '@/lib/site'
import { articlePath, getArticleBySlug, type ArticleWithSlug } from './articles'
import { getCategory } from './categories'
import { getArticleContent } from './content'
import { formatDate } from './format'
import { AUTHOR, CONTACT_LINE, SITE_NAME } from './site'

export const MARKDOWN_HEADERS = {
  'Content-Type': 'text/markdown; charset=utf-8',
  'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate',
  // /blog/<slug> answers HTML or Markdown depending on Accept (src/middleware.ts).
  Vary: 'Accept',
}

/**
 * YAML front matter with the metadata, the body, the same "Quem escreve" box as the page and a
 * source line at the end, so an excerpt stays attributable when it is quoted elsewhere.
 */
export async function renderArticleMarkdown(article: ArticleWithSlug) {
  const { markdown } = await getArticleContent(article.slug)
  const url = absoluteUrl(articlePath(article.slug))
  const modified = article.updated ?? article.date
  const category = getCategory(article.category)?.label ?? article.category

  const frontMatter = [
    '---',
    `title: ${JSON.stringify(article.title)}`,
    `description: ${JSON.stringify(article.description)}`,
    `url: ${url}`,
    `author: ${JSON.stringify(`${AUTHOR.name}, ${AUTHOR.role.toLowerCase()}`)}`,
    `publisher: ${JSON.stringify(SITE_NAME)}`,
    `date_published: ${article.date}`,
    `date_modified: ${modified}`,
    `category: ${JSON.stringify(category)}`,
    `image: ${absoluteUrl(article.image)}`,
    'language: pt-BR',
    '---',
  ].join('\n')

  const dates =
    modified !== article.date
      ? `Publicado em ${formatDate(article.date)}, atualizado em ${formatDate(modified)}`
      : `Publicado em ${formatDate(article.date)}`

  return `${frontMatter}

# ${article.title}

> ${article.description}

Por ${AUTHOR.name}, ${AUTHOR.role.toLowerCase()}. ${dates}.

${markdown}

## Quem escreve

**${AUTHOR.name}**, ${AUTHOR.role.toLowerCase()}. ${AUTHOR.bio} Perfil: ${absoluteUrl(AUTHOR.path)}

---

Fonte: [${article.title}](${url}), ${SITE_NAME} (${SITE_URL}).
Contato: ${SITE_URL} · ${CONTACT_LINE}.
`
}

/**
 * The article as clean Markdown: YAML front matter, the body without MDX
 * import/export lines (components turned into plain Markdown), and an
 * attribution footer with the canonical URL. Undefined for an unknown slug.
 */
export async function getArticleMarkdown(slug: string): Promise<string | undefined> {
  const article = await getArticleBySlug(slug)
  return article ? renderArticleMarkdown(article) : undefined
}
