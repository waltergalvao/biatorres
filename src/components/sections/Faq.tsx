import { Plus } from 'lucide-react'
import type { Faq as FaqItem } from '@/data/services'
import { waLink } from '@/lib/site'

export function Faq({
  items,
  title = 'Dúvidas antes de contratar',
  message = 'Olá, Beatriz! Tenho uma dúvida antes de contratar: ',
}: {
  items: FaqItem[]
  title?: string
  message?: string
}) {
  // The FAQPage structured data is part of each page's JSON-LD graph (faqSchema in src/lib/schema.ts).
  return (
    <section aria-labelledby="faq-title" className="section-y bg-sand" data-placement="faq">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <p className="eyebrow">Perguntas frequentes</p>
          <h2 id="faq-title" className="mt-4 font-display text-display text-ink">
            {title}
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-ink-soft">
            Não achou a sua pergunta? Mande pelo WhatsApp.
          </p>
          <a
            href={waLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="link-draw -mb-2.5 mt-0.5 bg-origin-content py-2.5 text-[16px] !text-clay"
          >
            Enviar uma pergunta
          </a>
        </div>

        <div className="lg:col-span-8">
          <ul className="border-t border-ink/20">
            {items.map((f) => (
              <li key={f.q} className="border-b border-ink/20">
                <details className="group">
                  <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-[20px] leading-snug text-ink transition-colors hover:text-clay md:text-[22px] [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <Plus
                      size={22}
                      aria-hidden
                      className="shrink-0 text-clay transition-transform duration-300 group-open:rotate-45"
                    />
                  </summary>
                  <p className="max-w-2xl pb-6 text-[16px] leading-relaxed text-ink-soft">{f.a}</p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
