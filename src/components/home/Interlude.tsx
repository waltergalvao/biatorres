import Image from 'next/image'
import { unsplash, waLink } from '@/lib/site'
import { WhatsAppIcon } from '../WhatsAppIcon'

/**
 * Full-bleed editorial image moment before the deliverables: the reason to plan, with one
 * quiet action so the pause on mobile still leads somewhere.
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
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/95 via-ink/60 to-ink/20 md:bg-gradient-to-r md:from-ink/80 md:via-ink/35 md:to-transparent" />
      <div className="container-site flex min-h-[560px] items-end py-16 md:min-h-[680px] md:items-center md:py-24">
        <div className="max-w-xl text-linen">
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-ochre">Por que projetar</p>
          <h2 id="interlude-title" className="mt-4 font-display text-display">
            Casa pequena não perdoa <em className="italic text-clay-soft">improviso</em>
          </h2>
          <p className="mt-5 max-w-md text-[17px] leading-relaxed text-linen/90">
            O móvel que não passa na porta, a tomada atrás do armário, o tapete que some na sala. Um
            projeto decide isso no papel, antes de você gastar.
          </p>
          <a
            href={waLink('Olá, Beatriz! Vim pelo site e quero decidir meu apartamento no papel antes de gastar. O que eu quero resolver é:')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-light mt-8"
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
