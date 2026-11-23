import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { services, serviceHref, type ServiceSlug } from '@/data/services'

// The three services as alternatives, by what the visitor is about to do, not as numbered steps:
// people pick the one that matches their situation. The highlighted card is the entry point,
// so the eye lands on the smallest commitment first.
const cases: {
  slug: ServiceSlug
  situation: string
  detail: string
  priceExtra?: string
  featured?: boolean
}[] = [
  { slug: 'consultoria', situation: 'Sem obra', detail: 'Móveis, layout e decoração', featured: true },
  { slug: 'projeto-por-ambiente', situation: 'Vai reformar um cômodo', detail: 'Com obra e marcenaria', priceExtra: 'mínimo R$ 1.500' },
  { slug: 'apartamento-completo', situation: 'Vai reformar o apê inteiro', detail: 'Ou montar do zero, até 60 m²' },
]

/** One card per situation, each with its price and a link to the service page. */
export function ServiceLadder() {
  return (
    <ul className="grid gap-5 lg:grid-cols-3 lg:gap-6">
      {cases.map(({ slug, situation, detail, priceExtra, featured }) => {
        const s = services[slug]
        const soft = featured ? 'text-mist' : 'text-ink-soft'
        return (
          <li key={slug} className="flex">
            <Link
              href={serviceHref(slug)}
              className={`group relative flex w-full flex-col rounded-[28px] p-7 transition-transform duration-500 ease-elegant hover:-translate-y-0.5 md:p-9 ${
                featured ? 'bg-ink text-linen' : 'border border-line bg-paper text-ink'
              }`}
            >
              {featured && (
                <span className="absolute -top-3 left-7 rounded-full bg-ochre px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink md:left-9">
                  Na dúvida, comece aqui
                </span>
              )}
              <p className={`font-display text-[30px] italic leading-[1.1] md:text-[34px] ${featured ? 'text-clay-soft' : 'text-clay'}`}>
                {situation}
              </p>
              <p className={`mt-1 text-[15px] ${soft}`}>{detail}</p>

              <h3 className={`mt-7 border-t pt-6 font-display text-heading group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4 ${featured ? 'border-linen/15' : 'border-line'}`}>
                {s.name}
              </h3>
              <p className={`mt-2 text-[15px] leading-relaxed ${soft}`}>{s.summary}</p>

              <ul className="mt-6 flex-1 space-y-3">
                {s.highlights.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-snug">
                    <Check size={18} aria-hidden className={`mt-px shrink-0 ${featured ? 'text-ochre' : 'text-clay'}`} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-8 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                {s.price.pre && <span className={`text-[14px] ${soft}`}>{s.price.pre}</span>}
                <span className="font-display text-[34px] leading-none tracking-[-0.02em] tabular">{s.price.value}</span>
                <span className={`text-[14px] ${soft}`}>{[s.price.unit, priceExtra].filter(Boolean).join(' · ')}</span>
              </p>
              {s.price.total && <p className={`mt-1.5 text-[13px] ${soft}`}>{s.price.total}</p>}

              <span className={`mt-6 inline-flex items-center gap-2 text-[15px] font-semibold ${featured ? 'text-linen' : 'text-clay'}`}>
                Ver o que está incluso
                <ArrowRight size={16} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
