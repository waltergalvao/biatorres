import { Check } from 'lucide-react'
import type { Changes as ChangesData } from '@/data/support'

/**
 * "E se eu quiser mudar algo?": answers the fear of being left alone with the PDF, right after the
 * price, where the doubt comes up.
 */
export function Changes({ changes }: { changes: ChangesData }) {
  return (
    <section aria-labelledby="ajustes-title" className="py-16 md:py-24">
      <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="eyebrow">Ajustes e suporte</p>
          <h2 id="ajustes-title" className="mt-4 font-display text-heading text-ink md:text-[2.4rem] md:leading-[1.1]">
            E se eu quiser mudar algo?
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-ink-soft">{changes.lead}</p>
        </div>
        <ul className="grid gap-4 lg:col-span-7 lg:self-center">
          {changes.points.map((point) => (
            <li key={point} className="flex gap-4 rounded-[20px] border border-line bg-paper p-5 text-[16px] leading-relaxed text-ink">
              <Check size={20} aria-hidden className="mt-0.5 shrink-0 text-clay" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
