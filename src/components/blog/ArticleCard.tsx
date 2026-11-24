import Image from 'next/image'
import Link from 'next/link'
import { articlePath, type ArticleWithSlug } from '@/lib/blog/articles'
import { getCategory } from '@/lib/blog/categories'
import { formatShortDate } from '@/lib/blog/format'

function Meta({ article }: { article: ArticleWithSlug }) {
  return (
    <p className="flex flex-wrap items-center gap-x-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-clay">
      <span>{getCategory(article.category)?.label}</span>
      <span aria-hidden className="text-ink/30">
        ·
      </span>
      <time dateTime={article.date} className="text-ink-soft">
        {formatShortDate(article.date)}
      </time>
    </p>
  )
}

/** Card for listings and "Leia também". `featured` is the wide card at the top of /blog. */
export function ArticleCard({
  article,
  featured = false,
  headingLevel: H = 'h2',
}: {
  article: ArticleWithSlug
  featured?: boolean
  headingLevel?: 'h2' | 'h3'
}) {
  if (featured) {
    return (
      <article className="group relative grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="photo-zoom relative aspect-[4/3] overflow-hidden rounded-[28px] bg-sand lg:col-span-7 lg:aspect-[16/11]">
          <Image
            src={article.image}
            alt={article.imageAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
          />
        </div>
        <div className="lg:col-span-5">
          <Meta article={article} />
          <H className="mt-4 font-display text-display-sm text-ink transition-colors group-hover:text-clay">
            <Link href={articlePath(article.slug)} className="after:absolute after:inset-0">
              {article.title}
            </Link>
          </H>
          <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">{article.description}</p>
          <span aria-hidden className="link-draw mt-6 text-[16px] !text-clay">
            Ler o artigo
          </span>
        </div>
      </article>
    )
  }

  return (
    <article className="group relative flex flex-col">
      <div className="photo-zoom relative aspect-[4/3] overflow-hidden rounded-[24px] bg-sand">
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="mt-5">
        <Meta article={article} />
        <H className="mt-3 font-display text-[22px] leading-tight text-ink transition-colors group-hover:text-clay md:text-[24px]">
          <Link href={articlePath(article.slug)} className="after:absolute after:inset-0">
            {article.title}
          </Link>
        </H>
        <p className="mt-3 line-clamp-3 text-[16px] leading-relaxed text-ink-soft">{article.description}</p>
      </div>
    </article>
  )
}
