import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  articlePath,
  findArticleSlug,
  getRelatedArticles,
  type Article,
  type ArticleWithSlug,
} from '@/lib/blog/articles'
import { categoryPath, getCategory } from '@/lib/blog/categories'
import { getArticleContent } from '@/lib/blog/content'
import { formatDate, readingMinutes } from '@/lib/blog/format'
import { getImageSize } from '@/lib/blog/image'
import { blogPostingSchema, breadcrumbSchema, faqSchema, graph } from '@/lib/blog/schema'
import { AUTHOR, articleMessage } from '@/lib/blog/site'
import { JsonLd } from '@/components/JsonLd'
import { FinalCta } from '@/components/sections/FinalCta'
import { ArticleCard } from './ArticleCard'
import { ArticleCta, AuthorBox, TableOfContents } from './ArticleParts'
import { Breadcrumb } from './Breadcrumb'

const i = (n: number) => ({ '--i': n }) as React.CSSProperties

/**
 * Layout of every blog post: the `export default` of each page.mdx.
 *
 * Runs on the server at build time: finds the post's slug, reads its MDX source for the FAQ,
 * sections and word count, and renders the structured data (BlogPosting, BreadcrumbList and
 * FAQPage) with the page.
 */
export async function ArticleLayout({ article, children }: { article: Article; children: React.ReactNode }) {
  const slug = await findArticleSlug(article)
  if (!slug) notFound()

  const post: ArticleWithSlug = { ...article, slug }
  const [content, related, imageSize] = await Promise.all([
    getArticleContent(slug),
    getRelatedArticles(slug),
    getImageSize(article.image),
  ])

  const category = getCategory(article.category)!
  const updated = article.updated && article.updated !== article.date ? article.updated : undefined
  const message = articleMessage(article.title)

  const crumbs = [
    { name: 'Início', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: category.label, path: categoryPath(category.slug) },
    { name: article.title, path: articlePath(slug) },
  ]

  const structuredData = graph(
    blogPostingSchema(post, { wordCount: content.wordCount, image: imageSize }),
    breadcrumbSchema(crumbs),
    ...(content.faq.length > 0 ? [faqSchema(slug, content.faq)] : []),
  )

  return (
    <div data-service="blog">
      <JsonLd data={structuredData} />

      <article>
        <header className="container-site pt-8 md:pt-12">
          <div className="enter" style={i(0)}>
            {/* The h1 right below names the current page, so the trail stops at the category. */}
            <Breadcrumb items={crumbs.slice(0, -1)} />
          </div>
          <div className="max-w-[54rem]">
            <p className="enter mt-10" style={i(1)}>
              <Link href={categoryPath(category.slug)} className="eyebrow transition-colors hover:text-clay-deep">
                {category.label}
              </Link>
            </p>
            <h1 className="enter mt-4 font-display text-display text-ink" style={i(2)}>
              {article.title}
            </h1>
            <p className="enter lede mt-5 max-w-[44rem] text-pretty" style={i(3)}>
              {article.description}
            </p>

            <div className="enter mt-8 flex items-center gap-4" style={i(4)}>
              <Image
                src={AUTHOR.avatar}
                alt=""
                width={48}
                height={48}
                className="h-12 w-12 shrink-0 rounded-full object-cover"
              />
              <div className="text-[15px] leading-snug">
                <p>
                  <Link href={AUTHOR.path} rel="author" className="font-semibold text-ink transition-colors hover:text-clay">
                    {AUTHOR.name}
                  </Link>
                  <span className="text-ink-soft">, {AUTHOR.role.toLowerCase()}</span>
                </p>
                <p className="mt-0.5 text-ink-soft">
                  Publicado em <time dateTime={article.date}>{formatDate(article.date)}</time>
                  {updated && (
                    <>
                      {' · '}Atualizado em <time dateTime={updated}>{formatDate(updated)}</time>
                    </>
                  )}
                  {' · '}
                  <span className="whitespace-nowrap">{readingMinutes(content.wordCount)} min de leitura</span>
                </p>
              </div>
            </div>
          </div>

          <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-[28px] bg-sand md:mt-12 md:aspect-[16/8]">
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              priority
              sizes="(max-width: 1240px) 100vw, 1240px"
              className="animate-reveal object-cover"
            />
          </div>
        </header>

        <div className="container-site grid gap-12 pb-16 pt-10 md:pt-14 lg:grid-cols-12 lg:gap-10 lg:pb-24">
          <div className="min-w-0 lg:col-span-8 xl:col-span-7">
            <div className="max-w-[42rem] [&>:first-child]:mt-0">{children}</div>
          </div>

          <aside className="hidden lg:col-span-4 lg:col-start-9 lg:block">
            <div className="sticky top-28 space-y-8">
              <TableOfContents sections={content.sections} />
              <ArticleCta message={message} placement="blog-lateral" compact />
            </div>
          </aside>

          <div className="max-w-[42rem] space-y-8 lg:col-span-8 xl:col-span-7">
            <div className="lg:hidden">
              <ArticleCta message={message} placement="blog-fim-do-artigo" />
            </div>
            <AuthorBox />
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="leia-tambem" className="section-y border-t border-line bg-paper">
          <div className="container-site">
            <p className="eyebrow">Blog</p>
            <h2 id="leia-tambem" className="mt-4 font-display text-display text-ink">
              Leia também
            </h2>
            <ul className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((a) => (
                <li key={a.slug}>
                  <ArticleCard article={a} headingLevel="h3" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <FinalCta
        eyebrow="Projeto de interiores"
        title="Conte o que você quer mudar no seu apartamento"
        text="Mande a metragem e o que quer resolver. Eu indico o serviço certo e respondo com o valor fechado."
        ctaLabel="Falar com a Beatriz"
        message={message}
      />
    </div>
  )
}
