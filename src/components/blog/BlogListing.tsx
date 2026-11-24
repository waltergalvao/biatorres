import Link from 'next/link'
import type { ArticleWithSlug } from '@/lib/blog/articles'
import type { Category } from '@/lib/blog/categories'
import { BLOG_MESSAGE } from '@/lib/blog/site'
import { PRIMARY_CTA } from '@/lib/site'
import { FinalCta } from '@/components/sections/FinalCta'
import { ArticleCard } from './ArticleCard'
import { Breadcrumb, type Crumb } from './Breadcrumb'

const i = (n: number) => ({ '--i': n }) as React.CSSProperties

/** /blog and /blog/categoria/<slug>: header, category links and the article cards. */
export function BlogListing({
  eyebrow,
  title,
  lede,
  breadcrumb,
  articles,
  categories,
  activeCategory,
}: {
  eyebrow: string
  title: string
  lede: string
  breadcrumb: Crumb[]
  articles: ArticleWithSlug[]
  categories: (Category & { path: string })[]
  activeCategory?: string
}) {
  // The newest post gets the wide card on the blog index only.
  const featured = activeCategory ? undefined : articles[0]
  const rest = featured ? articles.slice(1) : articles

  return (
    <div data-service="blog">
      <section aria-labelledby="blog-title" className="pb-14 pt-8 md:pb-20 md:pt-12">
        <div className="container-site">
          <div className="enter" style={i(0)}>
            <Breadcrumb items={breadcrumb} />
          </div>
          <p className="eyebrow enter mt-10" style={i(1)}>
            {eyebrow}
          </p>
          <h1 id="blog-title" className="enter mt-4 max-w-[52rem] font-display text-display text-ink" style={i(2)}>
            {title}
          </h1>
          <p className="enter lede mt-5 max-w-[40rem] text-pretty" style={i(3)}>
            {lede}
          </p>

          {categories.length > 1 && (
            <nav aria-label="Categorias do blog" className="enter mt-8" style={i(4)}>
              <ul className="flex flex-wrap gap-2">
                {[{ slug: '', label: 'Todos', path: '/blog' }, ...categories].map((c) => {
                  const active = (activeCategory ?? '') === c.slug
                  return (
                    <li key={c.path}>
                      <Link
                        href={c.path}
                        aria-current={active ? 'page' : undefined}
                        className={`inline-flex min-h-[40px] items-center rounded-full border px-4 text-[14px] font-semibold transition-colors ${
                          active ? 'border-ink bg-ink text-linen' : 'border-ink/20 text-ink hover:border-ink hover:bg-sand'
                        }`}
                      >
                        {c.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          )}
        </div>
      </section>

      <section aria-label="Artigos" className="pb-20 md:pb-28">
        <div className="container-site">
          {featured && (
            <div className="border-t border-line pt-10 md:pt-14">
              <ArticleCard article={featured} featured />
            </div>
          )}
          {rest.length > 0 && (
            <ul
              className={`grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 ${
                featured ? 'mt-16 border-t border-line pt-14 md:mt-20' : 'border-t border-line pt-10 md:pt-14'
              }`}
            >
              {rest.map((article) => (
                <li key={article.slug}>
                  <ArticleCard article={article} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <FinalCta
        eyebrow="Projeto de interiores"
        title="Tem um apartamento pequeno para resolver?"
        text="Mande a metragem e o que quer mudar. Eu indico o serviço certo e respondo com o valor fechado."
        ctaLabel={PRIMARY_CTA.label}
        message={BLOG_MESSAGE}
      />
    </div>
  )
}
