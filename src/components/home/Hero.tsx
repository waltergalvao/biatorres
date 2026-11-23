import Image from 'next/image'
import { ArrowDown, Check } from 'lucide-react'
import { unsplash, waLink } from '@/lib/site'

const i = (n: number) => ({ '--i': n }) as React.CSSProperties

const trust = ['Atendimento online para todo o Brasil', 'Arquiteta do briefing à entrega', 'Valor fechado antes de começar']

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden" data-placement="hero">
      <div className="container-site grid items-center gap-10 pb-16 pt-8 md:pt-12 lg:min-h-[calc(100svh-72px)] lg:grid-cols-12 lg:gap-12 lg:py-12">
        <div className="lg:col-span-6">
          <p className="eyebrow enter" style={i(0)}>
            Arquitetura de interiores · online
          </p>
          <h1 id="hero-title" className="enter mt-5 font-display text-display-xl text-ink" style={i(1)}>
            Projeto de interiores para apartamentos <em className="font-display italic text-clay">pequenos</em>
          </h1>
          <p className="enter lede mt-6 max-w-[34rem] text-pretty" style={i(2)}>
            Ajudo quem tem um apartamento compacto a usar bem cada metro: do primeiro móvel à reforma
            completa, sem sair de casa.
          </p>

          <div className="enter mt-9 flex flex-col gap-3 sm:flex-row" style={i(3)}>
            <a href="#servicos" className="btn-primary">
              Conhecer os serviços <ArrowDown size={16} aria-hidden />
            </a>
            <a
              href={waLink('Olá, Beatriz! Vi o site e quero entender qual serviço faz sentido para mim.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              Conversar pelo WhatsApp
            </a>
          </div>

          <ul className="enter mt-9 grid gap-2 border-t border-line pt-6 text-[15px] text-ink" style={i(4)}>
            {trust.map((t) => (
              <li key={t} className="flex items-center gap-2.5">
                <Check size={17} aria-hidden className="shrink-0 text-olive" />
                {t}
              </li>
            ))}
          </ul>
        </div>

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
            style={i(5)}
          >
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ochre">Do primeiro móvel à obra</p>
            <p className="mt-2 font-display text-[22px] leading-tight">
              Consultoria, projeto por ambiente e apartamento completo.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
