import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { audienceHref, audienceOrder, audiences } from '@/data/audiences'
import { unsplash } from '@/lib/site'
import { SectionHeader } from '../sections/SectionHeader'

/** Entry points to the audience landing pages. */
export function Audiences() {
  return (
    <section aria-labelledby="para-title" className="section-y bg-paper">
      <div className="container-site">
        <SectionHeader
          id="para-title"
          eyebrow="Para quem"
          title="Feito para apartamentos de até 60 m²"
          lede="Investidor, primeiro apartamento ou studio: escolha o seu caso e veja por onde começar."
        />

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {audienceOrder.map((slug) => {
            const a = audiences[slug]
            return (
              <li key={slug}>
                <Link
                  href={audienceHref(slug)}
                  className="group flex h-full flex-col transition-transform duration-500 ease-elegant hover:-translate-y-0.5"
                >
                  <div className="photo-zoom relative aspect-[4/5] overflow-hidden rounded-[24px]">
                    <Image
                      src={unsplash(a.hero.image)}
                      alt={a.hero.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-linen/90 px-3 py-1.5 text-[13px] font-semibold text-ink backdrop-blur-sm">
                      {a.card.kicker}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-[26px] leading-tight text-ink group-hover:text-clay">{a.card.title}</h3>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-soft">{a.card.text}</p>
                  <span className="link-draw mt-5 self-start text-[15px]">
                    Ver como funciona <ArrowUpRight size={16} aria-hidden />
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
