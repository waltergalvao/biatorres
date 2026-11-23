import Image from 'next/image'
import { unsplash, waLink } from '@/lib/site'
import { Check } from 'lucide-react'
import { WhatsAppIcon } from '../WhatsAppIcon'

// What a project made for small spaces does differently, one line each: the section is a pause
// between denser ones, so the photo carries it and the text stays short.
// TODO(owner): confirm the last point (knowing the plantas de lançamento) is true for your practice.
const points = [
  'Móvel escolhido pela medida, não pelo catálogo',
  'Marcenaria que guarda, esconde e se transforma',
  'Luz que separa ambientes sem levantar parede',
  'Olho treinado nas plantas de lançamento',
]

/**
 * Full-bleed editorial image before the deliverables: the reason to plan a small home, what a
 * project made for small spaces does differently, and one quiet action. Text on the dark left,
 * the photo open on the right.
 */
export function Interlude() {
  return (
    <section aria-labelledby="interlude-title" className="relative isolate overflow-hidden bg-ink">
      <Image
        src={unsplash('1615874959474-d609969a20ed')}
        alt="Quarto com cama de linho, almofadas laranja, quadros e plantas junto à janela"
        fill
        sizes="100vw"
        className="-z-10 object-cover opacity-80"
      />
      <div className="absolute inset-0 -z-10 bg-ink/65 md:bg-transparent md:bg-gradient-to-r md:from-ink/85 md:via-ink/50 md:to-transparent" />
      <div className="container-site flex py-16 md:min-h-[680px] md:items-center md:py-24">
        <div className="max-w-xl text-linen">
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-ochre">Por que projetar</p>
          <h2 id="interlude-title" className="mt-4 font-display text-display">
            Casa pequena não perdoa <em className="italic text-clay-soft">improviso</em>
          </h2>
          <p className="mt-5 max-w-md text-[17px] leading-relaxed text-linen/90">
            O móvel que não passa na porta, a tomada atrás do armário, o tapete que some na sala. Um
            projeto decide isso no papel, antes de você gastar.
          </p>
          <ul className="mt-8 max-w-md divide-y divide-linen/15 border-y border-linen/15">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 py-3 text-[16px] font-semibold leading-snug">
                <Check size={18} aria-hidden className="mt-0.5 shrink-0 text-ochre" />
                {p}
              </li>
            ))}
          </ul>
          <a
            href={waLink('Olá, Beatriz! Vim pelo site e quero decidir meu apartamento no papel antes de gastar. O que eu quero resolver é:')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-light mt-8 w-full sm:w-auto"
            data-placement="interlude"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Quero decidir antes de gastar
          </a>
        </div>
      </div>
    </section>
  )
}
