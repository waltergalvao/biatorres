import { Check, ChevronDown } from 'lucide-react'
import type { Package } from '@/data/audiences'
import { services } from '@/data/services'
import { waLink } from '@/lib/site'
import { SectionHeader } from '../sections/SectionHeader'
import { WhatsAppIcon } from '../WhatsAppIcon'

/**
 * The packages that fit one audience, with prices; the first card is highlighted.
 * The full list of what each package includes opens inside the card, so the ad page keeps
 * the visitor instead of sending them to the service page.
 */
export function Packages({ title, lede, items }: { title: string; lede: string; items: Package[] }) {
  return (
    <section id="pacotes" aria-labelledby="pacotes-title" className="section-y bg-sand" data-placement="pacotes">
      <div className="container-site">
        <SectionHeader id="pacotes-title" eyebrow="Pacotes e valores" title={title} lede={lede} />

        <ul className={`mt-14 grid gap-5 lg:gap-6 ${items.length === 3 ? 'lg:grid-cols-3' : 'md:grid-cols-2'}`}>
          {items.map((p, n) => {
            const featured = n === 0
            const s = services[p.service]
            const soft = featured ? 'text-mist' : 'text-ink-soft'
            return (
              <li key={p.service} className="flex">
                <article
                  data-placement={`pacote-${p.service}`}
                  className={`flex w-full flex-col rounded-[28px] p-7 md:p-9 ${
                    featured ? 'bg-ink text-linen' : 'border border-line bg-paper text-ink'
                  }`}
                >
                  <div className="flex min-h-[28px] items-start justify-between gap-4">
                    {p.badge && (
                      <span
                        className={`rounded-full px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.12em] ${
                          featured ? 'bg-ochre text-ink' : 'bg-sand text-ink'
                        }`}
                      >
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-5 font-display text-heading">{p.title ?? s.name}</h3>
                  <p className={`mt-2 text-[15px] leading-relaxed ${soft}`}>{p.why}</p>

                  <div className={`mt-7 border-t pt-6 ${featured ? 'border-linen/15' : 'border-line'}`}>
                    {p.price.pre && <span className={`block text-[14px] ${soft}`}>{p.price.pre}</span>}
                    <p className="flex flex-wrap items-baseline gap-x-2">
                      <span className="font-display text-[44px] leading-none tracking-[-0.02em] tabular">{p.price.value}</span>
                      {p.price.unit && <span className={`text-[15px] ${soft}`}>{p.price.unit}</span>}
                    </p>
                    {p.price.note && <p className={`mt-2 text-[14px] ${soft}`}>{p.price.note}</p>}
                  </div>

                  <div className="mt-7 flex-1">
                    <ul className="space-y-3">
                      {p.bullets.map((b) => (
                        <li key={b} className="flex gap-3 text-[15px] leading-snug">
                          <Check size={18} aria-hidden className={`mt-px shrink-0 ${featured ? 'text-ochre' : 'text-clay'}`} />
                          {b}
                        </li>
                      ))}
                    </ul>

                    <details className="group mt-4">
                      <summary
                        className={`flex min-h-[44px] cursor-pointer list-none items-center gap-1.5 text-[15px] font-semibold transition-colors [&::-webkit-details-marker]:hidden ${
                          featured ? 'text-linen hover:text-ochre' : 'text-ink hover:text-clay'
                        }`}
                      >
                        Ver tudo o que inclui
                        <ChevronDown
                          size={16}
                          aria-hidden
                          className="shrink-0 transition-transform duration-300 group-open:rotate-180"
                        />
                      </summary>
                      <div className={`mt-2 space-y-5 border-t pt-5 ${featured ? 'border-linen/15' : 'border-line'}`}>
                        {s.includes.groups.map((g, gi) => (
                          <div key={g.title ?? gi}>
                            {g.title && (
                              <p
                                className={`text-[12px] font-semibold uppercase tracking-[0.14em] ${
                                  featured ? 'text-ochre' : 'text-olive'
                                }`}
                              >
                                {g.title}
                              </p>
                            )}
                            <ul className={`space-y-2 ${g.title ? 'mt-2.5' : ''}`}>
                              {g.items.map((item) => (
                                <li key={item.title} className={`flex gap-2.5 text-[14px] leading-snug ${soft}`}>
                                  <span
                                    aria-hidden
                                    className={`mt-[7px] h-1 w-1 shrink-0 rounded-full ${featured ? 'bg-mist' : 'bg-ink-soft'}`}
                                  />
                                  {item.title}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </details>
                  </div>

                  <a
                    href={waLink(p.message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-8 ${featured ? 'btn-light' : 'btn-primary'}`}
                  >
                    <WhatsAppIcon className={`h-5 w-5 ${featured ? 'text-whatsapp' : ''}`} />
                    Pedir pelo WhatsApp
                  </a>
                </article>
              </li>
            )
          })}
        </ul>

        <p className="mt-8 text-center text-[14px] text-ink-soft">
          Valor fechado antes de começar. Execução, gestão de obra e compras não estão inclusas.
        </p>
      </div>
    </section>
  )
}
