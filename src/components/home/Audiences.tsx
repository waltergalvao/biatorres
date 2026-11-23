import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { audienceHref, audienceOrder, audiences } from '@/data/audiences'
import { unsplash } from '@/lib/site'
import { SectionHeader } from '../sections/SectionHeader'

/**
 * Entry points to the audience landing pages. Compact rows (small thumbnail) on phones,
 * tall photo cards from md up.
 */
export function Audiences() {
  return (
    <section aria-labelledby="para-title" className="section-y bg-paper">
      <div className="container-site">
        <SectionHeader
          id="para-title"
          eyebrow="Para quem"
          title="Feito para apartamentos de até 60 m²"
          lede="Escolha o que descreve você e veja por onde começar."
        />

        <ul className="mt-10 divide-y divide-line border-y border-line md:mt-14 md:grid md:grid-cols-3 md:gap-6 md:divide-y-0 md:border-0">
          {audienceOrder.map((slug) => {
            const a = audiences[slug]
            return (
              <li key={slug}>
                <Link
                  href={audienceHref(slug)}
                  className="group flex items-center gap-4 py-4 transition-transform duration-500 ease-elegant md:h-full md:flex-col md:items-stretch md:gap-0 md:py-0 md:hover:-translate-y-0.5"
                >
                  <div className="photo-zoom relative aspect-square w-20 shrink-0 overflow-hidden rounded-2xl md:aspect-[4/5] md:w-auto md:rounded-[24px]">
                    <Image
                      src={unsplash(a.hero.image)}
                      alt={a.hero.imageAlt}
                      fill
                      sizes="(max-width: 768px) 80px, 33vw"
                      className="object-cover"
                    />
                    <div aria-hidden className="absolute inset-x-0 bottom-0 hidden h-3/5 bg-gradient-to-t from-ink/85 via-ink/50 to-transparent md:block" />
                    <p className="absolute inset-x-6 bottom-6 hidden items-end justify-between gap-3 font-display text-[30px] leading-[1.05] text-linen [text-shadow:0_1px_12px_rgb(var(--color-ink)/0.45)] md:flex lg:text-[34px]">
                      <span>{a.card.who}</span>
                      <ArrowUpRight size={26} aria-hidden className="mb-1 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </p>
                  </div>
                  <div className="min-w-0 flex-1 md:flex md:flex-col">
                    <p className="font-display text-[21px] leading-tight text-clay md:hidden">{a.card.who}</p>
                    <h3 className="mt-1 text-[15px] leading-snug text-ink-soft group-hover:text-clay md:mt-6 md:font-display md:text-[26px] md:leading-tight md:text-ink">
                      {a.card.title}
                    </h3>
                    <p className="mt-2 hidden flex-1 text-[15px] leading-relaxed text-ink-soft md:block">{a.card.text}</p>
                    <span className="link-draw mt-5 hidden self-start text-[15px] md:inline-flex">
                      Ver como funciona <ArrowUpRight size={16} aria-hidden />
                    </span>
                  </div>
                  <ArrowUpRight size={20} aria-hidden className="shrink-0 text-clay md:hidden" />
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
