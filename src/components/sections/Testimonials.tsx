import type { Testimonial } from '@/data/testimonials'

export function Testimonials({
  items,
  title = 'O que dizem os clientes',
}: {
  items: Testimonial[]
  title?: string
}) {
  if (items.length === 0) return null
  const [lead, ...rest] = items

  return (
    <section aria-labelledby="depoimentos-title" className="section-y bg-paper">
      <div className="container-site">
        <p className="eyebrow">Depoimentos</p>
        <h2 id="depoimentos-title" className="mt-4 max-w-3xl font-display text-display text-ink">
          {title}
        </h2>

        <div className="mt-12 grid gap-10 border-t border-line pt-10 lg:grid-cols-12 lg:gap-16">
          <figure className="lg:col-span-7">
            <blockquote className="font-display text-[clamp(1.6rem,2.6vw,2.4rem)] font-light leading-[1.2] text-ink">
              <span aria-hidden className="text-clay">“</span>
              {lead.quote}
              <span aria-hidden className="text-clay">”</span>
            </blockquote>
            <figcaption className="mt-6 text-[15px] text-ink-soft">
              <span className="font-semibold text-ink">{lead.name}</span> · {lead.detail}
            </figcaption>
          </figure>

          {rest.length > 0 && (
            <div className="grid gap-6 lg:col-span-5">
              {rest.slice(0, 2).map((t) => (
                <figure key={t.quote} className="rounded-[24px] border border-line bg-linen p-7">
                  <blockquote className="text-[17px] leading-relaxed text-ink">“{t.quote}”</blockquote>
                  <figcaption className="mt-5 text-[14px] text-ink-soft">
                    <span className="font-semibold text-ink">{t.name}</span> · {t.detail}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
