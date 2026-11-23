import Image from 'next/image'
import { ArrowDown } from 'lucide-react'
import { PRIMARY_CTA, consultoriaPrices, unsplash } from '@/lib/site'

export function Hero() {
  const preview = consultoriaPrices.slice(0, 4)

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="container-site grid items-center gap-10 pb-16 pt-8 md:pt-12 lg:min-h-[calc(100svh-72px)] lg:grid-cols-12 lg:gap-12 lg:py-12">
        {/* Copy */}
        <div className="lg:col-span-6 xl:col-span-6">
          <p className="eyebrow enter" style={{ '--i': 0 } as React.CSSProperties}>
            Arquitetura de interiores · online
          </p>
          <h1
            id="hero-title"
            className="enter mt-5 font-display text-display-xl text-ink"
            style={{ '--i': 1 } as React.CSSProperties}
          >
            Projeto de interiores para apartamentos{' '}
            <em className="font-display italic text-clay">pequenos</em>
          </h1>
          <p
            className="enter lede mt-6 max-w-[34rem] text-pretty"
            style={{ '--i': 2 } as React.CSSProperties}
          >
            Consultoria para um ambiente, projeto completo com imagens 3D ou o apartamento
            inteiro. Você sabe o preço antes de começar.
          </p>

          {/* Price anchor */}
          <div
            className="enter mt-8 flex flex-wrap items-end gap-x-5 gap-y-2 border-y border-line py-5"
            style={{ '--i': 3 } as React.CSSProperties}
          >
            <p className="flex items-baseline gap-2">
              <span className="text-[15px] text-ink-soft">a partir de</span>
              <span className="font-display text-[44px] leading-none tracking-[-0.02em] text-ink tabular md:text-[52px]">
                R$&nbsp;450
              </span>
            </p>
            <p className="pb-1 text-[15px] leading-snug text-ink-soft">
              Consultoria de interiores
              <br className="hidden sm:block" /> por ambiente, 100% online
            </p>
          </div>

          <div
            className="enter mt-8 flex flex-col gap-3 sm:flex-row"
            style={{ '--i': 4 } as React.CSSProperties}
          >
            <a
              href={PRIMARY_CTA.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              {PRIMARY_CTA.label}
            </a>
            <a href="#precos" className="btn-outline">
              Ver preços <ArrowDown size={16} aria-hidden />
            </a>
          </div>

          <ul
            className="enter mt-8 flex flex-wrap gap-x-4 gap-y-1.5 text-[14px] text-ink-soft"
            style={{ '--i': 5 } as React.CSSProperties}
            aria-label="Consultoria por ambiente"
          >
            {preview.map((p) => (
              <li key={p.room} className="tabular">
                {p.room} <span className="font-semibold text-ink">{p.price}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Image */}
        <div className="relative bleed-right lg:col-span-6 lg:h-full">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[28px] sm:aspect-[4/3] lg:aspect-auto lg:h-[min(78svh,760px)] lg:rounded-r-none">
            <Image
              src={unsplash('1618220179428-22790b461013')}
              alt="Sala pequena com poltrona terracota, aparador de madeira, espelho redondo e plantas"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="animate-reveal object-cover"
            />
          </div>
          <div
            className="enter absolute -bottom-6 left-4 right-4 rounded-2xl bg-ink p-5 text-linen shadow-[0_24px_50px_-20px_rgba(43,32,26,0.6)] sm:left-auto sm:right-6 sm:w-[300px] lg:-left-10 lg:bottom-10 lg:right-auto"
            style={{ '--i': 6 } as React.CSSProperties}
          >
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ochre">
              Apartamento completo
            </p>
            <p className="mt-2 font-display text-[28px] leading-none tabular">R$ 15.000</p>
            <p className="mt-2 text-[14px] leading-snug text-mist">
              Projeto de todos os ambientes, até 60 m², com até 10 imagens 3D.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
