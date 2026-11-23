import Image from 'next/image'
import Link from 'next/link'
import { PRIMARY_CTA, unsplash } from '@/lib/site'
import { WhatsAppIcon } from '../WhatsAppIcon'

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="bg-linen py-6 md:py-10">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6">
        <div className="relative isolate overflow-hidden rounded-[32px] bg-clay">
          <div className="grid lg:grid-cols-2">
            <div className="cta-align flex flex-col justify-center p-8 text-paper sm:p-12 lg:p-16">
              <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-paper/90">
                Orçamento pelo WhatsApp
              </p>
              <h2 id="cta-title" className="mt-4 font-display text-display">
                Mande a planta e receba o valor do seu projeto
              </h2>
              <p className="mt-5 max-w-md text-[17px] leading-relaxed text-paper/90">
                Diga qual ambiente quer mudar ou a metragem do apartamento. A resposta vem com o
                serviço indicado e o preço fechado.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href={PRIMARY_CTA.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-light"
                >
                  <WhatsAppIcon className="h-5 w-5 text-[#1F7A4D]" />
                  {PRIMARY_CTA.label}
                </a>
                <Link href="/contato" className="btn-ghost-light">
                  Enviar por e-mail
                </Link>
              </div>
            </div>
            <div className="relative min-h-[320px] lg:min-h-[560px]">
              <Image
                src={unsplash('1616046229478-9901c5536a45')}
                alt="Sala com aparador de madeira, espelho redondo, banqueta e vasos de plantas"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
