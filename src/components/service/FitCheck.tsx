import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import type { Service } from '@/data/services'

/** "É para você se…" — qualifies the visitor and routes the wrong fit to the right page. */
export function FitCheck({ service }: { service: Service }) {
  return (
    <section aria-labelledby="fit-title" className="section-y bg-paper">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <p className="eyebrow">Para quem é</p>
          <h2 id="fit-title" className="mt-4 font-display text-display text-ink">
            É para você se…
          </h2>
          <ul className="mt-10 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {service.fit.yes.map((item) => (
              <li key={item} className="flex gap-3 border-t border-line pt-5 text-[17px] leading-snug text-ink">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-clay text-paper">
                  <Check size={15} aria-hidden strokeWidth={2.5} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <aside aria-labelledby="fit-other" className="self-end rounded-[28px] bg-sand p-7 md:p-9 lg:col-span-5">
          <h3 id="fit-other" className="font-display text-[24px] leading-tight text-ink">
            Talvez outro serviço sirva melhor
          </h3>
          <ul className="mt-6 space-y-6">
            {service.fit.no.map((n) => (
              <li key={n.href}>
                <p className="text-[16px] leading-relaxed text-ink-soft">{n.text}</p>
                <Link href={n.href} className="link-draw -mb-2.5 -mt-0.5 bg-origin-content py-2.5 text-[15px]">
                  {n.label} <ArrowRight size={15} aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  )
}
