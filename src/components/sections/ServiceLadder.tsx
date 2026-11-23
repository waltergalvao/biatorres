import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { services, serviceHref, type ServiceSlug } from '@/data/services'

const steps: { slug: ServiceSlug; n: string; step: string; featured?: boolean }[] = [
  { slug: 'consultoria', n: '01', step: 'Comece com uma consultoria' },
  { slug: 'projeto-por-ambiente', n: '02', step: 'Transforme um ambiente' },
  { slug: 'apartamento-completo', n: '03', step: 'Projete o apartamento inteiro', featured: true },
]

/**
 * The three design services as a progression. `showPrices` is on for /servicos and off on the
 * home page, where the cards only send visitors to each service page.
 */
export function ServiceLadder({ showPrices = true }: { showPrices?: boolean }) {
  return (
    <ol className="grid gap-5 lg:grid-cols-3 lg:gap-6">
      {steps.map(({ slug, n, step, featured }, i) => {
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

              <p
                className={`mt-6 text-[13px] font-semibold uppercase tracking-[0.14em] ${featured ? 'text-ochre' : 'text-clay'}`}
              >
                {step}
              </p>
              <h3 className="mt-2 font-display text-heading group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
                {s.name}
              </h3>
              <p className={`mt-2 text-[15px] leading-relaxed ${featured ? 'text-mist' : 'text-ink-soft'}`}>
                {s.summary}
              </p>

              {showPrices && (
                <div className={`mt-7 border-t pt-6 ${featured ? 'border-linen/15' : 'border-line'}`}>
                  {s.price.pre && (
                    <span className={`block text-[14px] ${featured ? 'text-mist' : 'text-ink-soft'}`}>{s.price.pre}</span>
                  )}
                  <p className="flex flex-wrap items-baseline gap-x-2">
                    <span className="font-display text-[48px] leading-none tracking-[-0.02em] tabular">{s.price.value}</span>
                    <span className={`text-[15px] ${featured ? 'text-mist' : 'text-ink-soft'}`}>{s.price.unit}</span>
                  </p>
                  <p className={`mt-2 text-[14px] ${featured ? 'text-mist' : 'text-ink-soft'}`}>{s.price.note}</p>
                </div>
              )}

              <ul className={`mt-7 flex-1 space-y-3 ${showPrices ? '' : `border-t pt-6 ${featured ? 'border-linen/15' : 'border-line'}`}`}>
                {s.highlights.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-snug">
                    <Check size={18} aria-hidden className={`mt-px shrink-0 ${featured ? 'text-ochre' : 'text-clay'}`} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <span
                className={`mt-9 inline-flex items-center gap-2 text-[15px] font-semibold ${featured ? 'text-linen' : 'text-clay'}`}
              >
                {showPrices ? 'Ver o que inclui e pedir' : 'Ver detalhes e valores'}
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

/** Vistoria, shown as a smaller fourth service next to the ladder. */
export function VistoriaStrip() {
  const v = services.vistoria
  return (
    <Link
      href={serviceHref('vistoria')}
      className="group mt-6 flex flex-col justify-between gap-4 rounded-[28px] border border-line bg-sand p-7 transition-colors duration-300 hover:bg-sand-deep md:flex-row md:items-center md:p-9"
    >
      <div>
        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-olive">Também faço</p>
        <h3 className="mt-2 font-display text-heading text-ink">{v.name}</h3>
        <p className="mt-1 max-w-xl text-[15px] leading-relaxed text-ink-soft">{v.summary}</p>
      </div>
      <span className="inline-flex shrink-0 items-center gap-2 text-[15px] font-semibold text-ink">
        Ver como funciona
        <ArrowRight size={16} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  )
}
