import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { services, serviceHref, type ServiceSlug } from '@/data/services'

const steps: { slug: ServiceSlug; n: string; step: string; priceExtra?: string; featured?: boolean }[] = [
  { slug: 'consultoria', n: '01', step: 'Comece com uma consultoria' },
  { slug: 'projeto-por-ambiente', n: '02', step: 'Transforme um ambiente', priceExtra: 'mínimo R$ 1.500' },
  { slug: 'apartamento-completo', n: '03', step: 'Projete o apartamento inteiro', featured: true },
]

/** The three services as a progression, with their price anchor: each card leads to its own page. */
export function ServiceLadder() {
  return (
    <ol className="grid gap-5 lg:grid-cols-3 lg:gap-6">
      {steps.map(({ slug, n, step, priceExtra, featured }, i) => {
        const s = services[slug]
        return (
          <li key={slug} className="relative flex">
            <Link
              href={serviceHref(slug)}
              className={`group flex w-full flex-col rounded-[28px] p-7 transition-transform duration-500 ease-elegant hover:-translate-y-0.5 md:p-9 ${
                featured ? 'bg-ink text-linen' : 'border border-line bg-paper text-ink'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <span
                  aria-hidden
                  className={`font-display text-numeral font-light italic ${featured ? 'text-clay-soft/40' : 'text-clay-soft'}`}
                >
                  {n}
                </span>
                {featured && (
                  <span className="rounded-full bg-ochre px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink">
                    Mais completo
                  </span>
                )}
              </div>

              <p className={`mt-6 text-[13px] font-semibold uppercase tracking-[0.14em] ${featured ? 'text-ochre' : 'text-clay'}`}>
                {step}
              </p>
              <h3 className="mt-2 font-display text-heading group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
                {s.name}
              </h3>
              <p className={`mt-2 text-[15px] leading-relaxed ${featured ? 'text-mist' : 'text-ink-soft'}`}>{s.summary}</p>

              <ul className={`mt-7 flex-1 space-y-3 border-t pt-6 ${featured ? 'border-linen/15' : 'border-line'}`}>
                {s.highlights.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-snug">
                    <Check size={18} aria-hidden className={`mt-px shrink-0 ${featured ? 'text-ochre' : 'text-clay'}`} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-8 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                {s.price.pre && (
                  <span className={`text-[14px] ${featured ? 'text-mist' : 'text-ink-soft'}`}>{s.price.pre}</span>
                )}
                <span className="font-display text-[34px] leading-none tracking-[-0.02em] tabular">{s.price.value}</span>
                <span className={`text-[14px] ${featured ? 'text-mist' : 'text-ink-soft'}`}>
                  {[s.price.unit, priceExtra].filter(Boolean).join(' · ')}
                </span>
              </p>

              <span className={`mt-6 inline-flex items-center gap-2 text-[15px] font-semibold ${featured ? 'text-linen' : 'text-clay'}`}>
                Ver o que está incluso
                <ArrowRight size={16} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>

            {i < steps.length - 1 && (
              <span
                aria-hidden
                className="absolute -right-[28px] top-[88px] z-10 hidden h-8 w-8 items-center justify-center rounded-full border border-line bg-linen text-clay lg:flex"
              >
                <ArrowRight size={16} />
              </span>
            )}
          </li>
        )
      })}
    </ol>
  )
}
