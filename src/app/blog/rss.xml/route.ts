import { stat } from 'node:fs/promises'
import path from 'node:path'
import { absoluteUrl } from '@/lib/schema'
import { articlePath, getAllArticles, lastModified } from '@/lib/blog/articles'
import { getCategory } from '@/lib/blog/categories'
import { AUTHOR, BLOG_DESCRIPTION, BLOG_PATH, BLOG_TITLE, RSS_PATH } from '@/lib/blog/site'

/** RSS 2.0 feed of the blog, at /blog/rss.xml. */
export const dynamic = 'force-static'

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

const rfc822 = (date: string) => new Date(`${date}T12:00:00Z`).toUTCString()

async function fileSize(publicPath: string) {
  try {
    return (await stat(path.join(process.cwd(), 'public', publicPath))).size
  } catch {
    return 0
  }
}

export async function GET() {
  const articles = await getAllArticles()
  // The latest change to any article (an old post may have been revised after the newest one).
  const lastChange = articles.map(lastModified).sort().pop()

  const items = await Promise.all(
    articles.map(async (article) => {
      const url = absoluteUrl(articlePath(article.slug))
      const type = /\.png$/i.test(article.image) ? 'image/png' : 'image/jpeg'
      const category = getCategory(article.category)?.label ?? article.category
      return [
        '    <item>',
        `      <title>${escapeXml(article.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <description>${escapeXml(article.description)}</description>`,
        `      <pubDate>${rfc822(article.date)}</pubDate>`,
        `      <dc:creator>${escapeXml(AUTHOR.name)}</dc:creator>`,
        `      <category>${escapeXml(category)}</category>`,
        `      <enclosure url="${escapeXml(absoluteUrl(article.image))}" type="${type}" length="${await fileSize(article.image)}" />`,
        '    </item>',
      ].join('\n')
    }),
  )

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">',
    '  <channel>',
    `    <title>${escapeXml(BLOG_TITLE)}</title>`,
    `    <link>${absoluteUrl(BLOG_PATH)}</link>`,
    `    <description>${escapeXml(BLOG_DESCRIPTION)}</description>`,
    '    <language>pt-BR</language>',
    ...(lastChange ? [`    <lastBuildDate>${rfc822(lastChange)}</lastBuildDate>`] : []),
    `    <atom:link href="${absoluteUrl(RSS_PATH)}" rel="self" type="application/rss+xml" />`,
    ...items,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n')

  return new Response(body, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate',
    },
  })
}
