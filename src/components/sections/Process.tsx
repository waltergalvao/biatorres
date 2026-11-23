import type { Step } from '@/data/services'
import { SectionHeader } from './SectionHeader'

export function Process({
  title,
  lede = 'Você não precisa estar em São Paulo nem marcar visita. Tudo acontece por mensagem, chamada de vídeo e arquivos.',
  steps,
  children,
}: {
  title: string
  lede?: string
  steps: Step[]
  /** Optional action row under the steps. */
  children?: React.ReactNode
}) {
  const cols = steps.length >= 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-4'
  return (
    <section aria-labelledby="processo-title" className="section-y">
      <div className="container-site">
        <SectionHeader id="processo-title" eyebrow="Como funciona" title={title} lede={lede} />

        <ol
          className={`mt-14 grid gap-px overflow-hidden rounded-[28px] border border-line bg-line sm:grid-cols-2 ${cols}`}
        >
          {steps.map((s, i) => (
            <li key={s.title} className="flex flex-col bg-linen p-7 md:p-8">
              <span aria-hidden className="font-display text-[64px] font-light italic leading-none text-clay">
                {i + 1}
              </span>
              <h3 className="mt-8 font-display text-[22px] leading-tight text-ink">{s.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{s.text}</p>
            </li>
          ))}
        </ol>

        {children && (
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">{children}</div>
        )}
      </div>
    </section>
  )
}
