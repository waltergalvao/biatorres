'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { consultoriaPrices, projetoPrices, unsplash, waLink } from '@/lib/site'

const tabs = [
  {
    id: 'consultoria',
    label: 'Consultoria',
    rows: consultoriaPrices,
    intro: 'Valor fechado por ambiente. Tudo online: briefing, moodboard, layout e lista de compras.',
    foot: 'Apresentação final em PDF.',
  },
  {
    id: 'projeto',
    label: 'Projeto por ambiente',
    rows: projetoPrices,
    intro: 'R$ 250/m², com imagens 3D, detalhamento e caderno técnico para a obra.',
    foot: 'Mínimo de R$ 1.500 por contratação. O valor final depende da complexidade e do escopo.',
  },
] as const

type TabId = (typeof tabs)[number]['id']

export function RoomPrices() {
  const [active, setActive] = useState<TabId>('consultoria')
  const refs = useRef<Record<string, HTMLButtonElement | null>>({})
  const current = tabs.find((t) => t.id === active)!

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const i = tabs.findIndex((t) => t.id === active)
    let next = i
    if (e.key === 'ArrowRight') next = (i + 1) % tabs.length
    else if (e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = tabs.length - 1
    else return
    e.preventDefault()
    setActive(tabs[next].id)
    refs.current[tabs[next].id]?.focus()
  }

  return (
    <section aria-labelledby="tabela-title" className="section-y bg-sand">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <p className="eyebrow">Tabela por ambiente</p>
          <h2 id="tabela-title" className="mt-4 font-display text-display text-ink">
            Quanto custa o seu ambiente
          </h2>

          <div
            role="tablist"
            aria-label="Tipo de serviço"
            onKeyDown={onKeyDown}
            className="mt-10 inline-flex w-full rounded-full border border-ink/15 bg-linen p-1 sm:w-auto"
          >
            {tabs.map((tab) => {
              const selected = tab.id === active
              return (
                <button
                  key={tab.id}
                  ref={(el) => {
                    refs.current[tab.id] = el
                  }}
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${tab.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(tab.id)}
                  className={`min-h-[44px] flex-1 rounded-full px-5 text-[15px] font-semibold transition-colors duration-300 sm:flex-none ${
                    selected ? 'bg-ink text-linen' : 'text-ink hover:bg-sand'
                  }`}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>

          <div
            role="tabpanel"
            id={`panel-${current.id}`}
            aria-labelledby={`tab-${current.id}`}
            tabIndex={0}
            className="mt-8"
          >
            <p className="max-w-xl text-[16px] leading-relaxed text-ink-soft">{current.intro}</p>
            <table className="mt-6 w-full border-collapse text-left">
              <caption className="sr-only">
                Preços de {current.label.toLowerCase()} por ambiente
              </caption>
              <thead>
                <tr className="border-b border-ink/25 text-[13px] uppercase tracking-[0.12em] text-ink-soft">
                  <th scope="col" className="py-3 font-semibold">
                    Ambiente
                  </th>
                  {current.id === 'projeto' && (
                    <th scope="col" className="py-3 font-semibold">
                      Área de referência
                    </th>
                  )}
                  <th scope="col" className="py-3 text-right font-semibold">
                    Valor
                  </th>
                </tr>
              </thead>
              <tbody>
                {current.rows.map((row) => (
                  <tr key={row.room} className="border-b border-ink/10">
                    <th scope="row" className="py-4 font-display text-[20px] font-normal text-ink md:text-[22px]">
                      {row.room}
                    </th>
                    {current.id === 'projeto' && (
                      <td className="py-4 text-[15px] text-ink-soft">{'area' in row ? row.area : ''}</td>
                    )}
                    <td className="py-4 text-right font-display text-[22px] text-ink tabular md:text-[26px]">
                      {row.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 text-[14px] text-ink-soft">{current.foot}</p>
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-5">
          <div className="photo-zoom relative aspect-[4/5] overflow-hidden rounded-[28px] lg:aspect-auto lg:flex-1">
            <Image
              src={unsplash('1616627561839-074385245ff6')}
              alt="Quarto com roupa de cama terracota, cabeceira de madeira e mesa de cabeceira"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
          <div className="rounded-[24px] bg-ink p-7 text-linen">
            <p className="font-display text-[24px] leading-tight">
              Seu ambiente não está na tabela?
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-mist">
              Mande a planta ou a metragem e eu respondo com o valor fechado.
            </p>
            <a
              href={waLink('Olá, Beatriz! Quero um orçamento para um ambiente que não está na tabela: ')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-light mt-6 w-full sm:w-auto"
            >
              Enviar a planta
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
