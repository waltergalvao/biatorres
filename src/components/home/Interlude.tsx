import Image from 'next/image'
import { unsplash } from '@/lib/site'

/** Full-bleed editorial image moment between the prices and the deliverables. */
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
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-ochre">
            Por onde começar
          </p>
          <h2 id="interlude-title" className="mt-4 font-display text-display">
            Um quarto bem resolvido custa <em className="italic text-clay-soft">R$ 450</em>
          </h2>
          <p className="mt-5 max-w-md text-[17px] leading-relaxed text-linen/90">
            A consultoria cabe no orçamento de quem acabou de mudar. Gostou do resultado? Siga
            para o projeto do ambiente ou do apartamento inteiro.
          </p>
        </div>
      </div>
    </section>
  )
}
