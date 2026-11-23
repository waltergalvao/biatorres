import Image from 'next/image'
import { ArrowUpRight, Check, Minus } from 'lucide-react'
import type { Service } from '@/data/services'
import { unsplash, waLink } from '@/lib/site'
import { WhatsAppIcon } from '../WhatsAppIcon'
import { AreaCalculator } from './AreaCalculator'

/** Prices for one service, plus what is not included, so nothing is a surprise later. */
export function Pricing({ service }: { service: Service }) {
  const { pricing, cta } = service

  return (
    <section id="valores" aria-labelledby="valores-title" className="section-y bg-sand" data-placement="valores">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <p className="eyebrow">Valores</p>
          <h2 id="valores-title" className="mt-4 font-display text-display text-ink">
            {pricing.title}
          </h2>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink-soft">{pricing.intro}</p>
          <p className="mt-5 max-w-xl border-l-2 border-clay pl-4 text-[16px] leading-relaxed text-ink">
            {pricing.framing}
          </p>

          {pricing.kind === 'rooms' && (
            <table className="mt-8 w-full border-collapse text-left">
              <caption className="sr-only">Preços de {service.name.toLowerCase()} por ambiente</caption>
              <thead>
                <tr className="border-b border-ink/25 text-[13px] uppercase tracking-[0.12em] text-ink-soft">
                  <th scope="col" className="py-3 font-semibold">
                    Ambiente
                  </th>
                  {pricing.showArea && (
                    <th scope="col" className="hidden py-3 font-semibold sm:table-cell">
                      Área
                    </th>
                  )}
                  <th scope="col" className="py-3 text-right font-semibold">
                    Valor
                  </th>
                  <th scope="col" className="py-3">
                    <span className="sr-only">Pedir</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {pricing.rows.map((row) => (
                  <tr key={row.room} className="group border-b border-ink/10">
                    <th scope="row" className="py-4 font-normal">
                      <span className="block font-display text-[20px] text-ink md:text-[22px]">{row.room}</span>
                      {pricing.showArea && row.area && (
                        <span className="block text-[14px] text-ink-soft sm:hidden">{row.area}</span>
                      )}
                    </th>
                    {pricing.showArea && (
                      <td className="hidden py-4 text-[15px] text-ink-soft sm:table-cell">{row.area}</td>
                    )}
                    <td className="py-4 text-right font-display text-[22px] text-ink tabular md:text-[26px]">
                      {row.price}
                    </td>
                    <td className="py-4 pl-3 text-right">
                      <a
                        href={waLink(
                          `Olá, Beatriz! Vim pela página ${service.source} e quero ${pricing.rowItem} ${row.room.toLowerCase()}${row.area ? ` (${row.area})` : ''}, ${row.price}. Como seguimos?`,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Quero ${pricing.rowItem} ${row.room.toLowerCase()}, pelo WhatsApp`}
                        className="inline-flex h-11 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-ink/20 px-4 text-[14px] font-semibold text-ink transition-colors duration-200 hover:border-clay hover:bg-clay hover:text-paper"
                        data-placement="valores-tabela"
                      >
                        Quero este
                        <ArrowUpRight size={16} aria-hidden className="hidden sm:block" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {pricing.kind === 'package' && (
            <div className="mt-8 rounded-[28px] bg-ink p-7 text-linen md:p-10">
              <div className="flex flex-wrap items-baseline gap-x-3">
                <span className="font-display text-[56px] leading-none tracking-[-0.02em] tabular md:text-[72px]">
                  {pricing.price}
                </span>
                <span className="text-[17px] text-mist">{pricing.unit}</span>
              </div>
              {pricing.installments && (
                <p className="mt-3 text-[18px] font-semibold text-ochre">{pricing.installments}</p>
              )}
              <p className="mt-8 text-[13px] font-semibold uppercase tracking-[0.14em] text-ochre">Ambientes inclusos</p>
              <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {pricing.covers.map((c) => (
                  <li key={c} className="flex gap-3 text-[16px] leading-snug">
                    <Check size={18} aria-hidden className="mt-px shrink-0 text-ochre" />
                    {c}
                  </li>
                ))}
              </ul>
              <a href={waLink(cta.message)} target="_blank" rel="noopener noreferrer" className="btn-light mt-9 w-full sm:w-auto">
                <WhatsAppIcon className="h-5 w-5 text-[#1F7A4D]" />
                {cta.label}
              </a>
            </div>
          )}

          <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">{pricing.foot}</p>

          {/* On mobile the calculator sits right under the table, so "#valores" lands next to it. */}
          {pricing.kind === 'rooms' && pricing.calculator && (
            <div className="mt-8 lg:hidden">
              <AreaCalculator perM2={pricing.calculator.perM2} minimum={pricing.calculator.minimum} />
            </div>
          )}

          <div className="mt-10 rounded-[24px] border border-ink/15 p-6 md:p-7">
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-soft">Não está incluso</h3>
            <ul className="mt-4 space-y-2.5">
              {service.notIncluded.map((n) => (
                <li key={n} className="flex gap-3 text-[15px] leading-snug text-ink">
                  <Minus size={18} aria-hidden className="mt-px shrink-0 text-ink/40" />
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-5">
          {pricing.kind === 'rooms' && pricing.calculator ? (
            <div className="hidden lg:block">
              <AreaCalculator perM2={pricing.calculator.perM2} minimum={pricing.calculator.minimum} />
            </div>
          ) : (
            <div className="photo-zoom relative hidden overflow-hidden rounded-[28px] lg:block lg:min-h-[420px] lg:flex-1">
              <Image
                src={unsplash(service.sideImage.id)}
                alt={service.sideImage.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          )}
          <div className="rounded-[24px] bg-paper p-7">
            <p className="font-display text-[24px] leading-tight text-ink">
              Valor fechado antes de começar
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
              Mande a planta ou as medidas. Eu mando a proposta por escrito, com valor, prazo e condições.
            </p>
            <a href={waLink(cta.message)} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6 w-full sm:w-auto">
              <WhatsAppIcon className="h-5 w-5" />
              {cta.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
