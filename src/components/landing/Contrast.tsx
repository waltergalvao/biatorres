import { Check, X } from 'lucide-react'
import { SectionHeader } from '../sections/SectionHeader'

/** "Sem projeto / Com projeto": the problem the visitor recognises, next to the outcome. */
export function Contrast({
  title,
  lede,
  without,
  withProject,
}: {
  title: string
  lede: string
  without: string[]
  withProject: string[]
}) {
  return (
    <section aria-labelledby="contraste-title" className="section-y bg-paper">
      <div className="container-site">
        <SectionHeader id="contraste-title" eyebrow="Por que projetar" title={title} lede={lede} />

        <div className="mt-14 grid gap-5 lg:grid-cols-2 lg:gap-6">
          <div className="rounded-[28px] border border-line bg-linen p-7 md:p-10">
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-ink-soft">Sem projeto</h3>
            <ul className="mt-6 space-y-5">
              {without.map((item) => (
                <li key={item} className="flex gap-4 text-[17px] leading-snug text-ink-soft">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-ink/25 text-ink/50">
                    <X size={14} aria-hidden strokeWidth={2.5} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[28px] bg-ink p-7 text-linen md:p-10">
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-ochre">Com projeto</h3>
            <ul className="mt-6 space-y-5">
              {withProject.map((item) => (
                <li key={item} className="flex gap-4 text-[17px] leading-snug">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-clay text-paper">
                    <Check size={14} aria-hidden strokeWidth={2.5} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
