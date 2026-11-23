import { Check } from 'lucide-react'
import type { Service } from '@/data/services'
import { waLink } from '@/lib/site'
import { SectionHeader } from '../sections/SectionHeader'
import { WhatsAppIcon } from '../WhatsAppIcon'

/**
 * What the client receives. A single group renders as numbered steps (each with its own
 * deliverable); several groups render as checklists side by side.
 */
export function Includes({ service }: { service: Service }) {
  const { title, intro, groups } = service.includes
  const single = groups.length === 1

  return (
    <section id="incluso" aria-labelledby="incluso-title" className="section-y">
      <div className="container-site">
        <SectionHeader id="incluso-title" eyebrow="O que está incluso" title={title} lede={intro} />

        {single ? (
          <ol className="mt-14 grid gap-px overflow-hidden rounded-[28px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {groups[0].items.map((item, n) => (
              <li key={item.title} className="flex flex-col bg-linen p-7 md:p-8">
                <span aria-hidden className="font-display text-[44px] font-light italic leading-none text-clay">
                  {String(n + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-6 font-display text-[22px] leading-tight text-ink">{item.title}</h3>
                {item.text && <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-soft">{item.text}</p>}
                {item.delivers && (
                  <p className="mt-5 border-t border-line pt-4 text-[14px] text-ink">
                    <span className="font-semibold uppercase tracking-[0.12em] text-olive">Entrega </span>
                    {item.delivers}
                  </p>
                )}
              </li>
            ))}
            {groups[0].items.length % 3 !== 0 && (
              <li className="flex flex-col justify-between gap-6 bg-ink p-7 text-linen md:p-8" data-placement="incluso">
                <p className="font-display text-[24px] leading-tight">Quer saber o valor para o seu caso?</p>
                <a
                  href={waLink(service.cta.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-light self-start"
                >
                  <WhatsAppIcon className="h-5 w-5 text-[#1F7A4D]" />
                  {service.cta.label}
                </a>
              </li>
            )}
          </ol>
        ) : (
          <div
            className={`mt-14 grid gap-5 md:grid-cols-2 ${groups.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'}`}
          >
            {groups.map((g, n) => (
              <div key={g.title} className="flex flex-col rounded-[28px] border border-line bg-paper p-7 md:p-8">
                <span aria-hidden className="font-display text-[40px] font-light italic leading-none text-clay">
                  {String(n + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-5 font-display text-[24px] leading-tight text-ink">{g.title}</h3>
                <ul className="mt-6 space-y-3.5">
                  {g.items.map((item) => (
                    <li key={item.title} className="flex gap-3 text-[15px] leading-snug text-ink">
                      <Check size={18} aria-hidden className="mt-px shrink-0 text-clay" />
                      <span>
                        {item.title}
                        {item.text && <span className="mt-1 block text-[14px] text-ink-soft">{item.text}</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
