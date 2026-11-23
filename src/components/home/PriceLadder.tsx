import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { waLink } from '@/lib/site'

type Tier = {
  n: string
  step: string
  name: string
  forWhom: string
  pre?: string
  price: string
  unit: string
  note: string
  items: string[]
  cta: { label: string; message: string }
  href: string
  featured?: boolean
}

const tiers: Tier[] = [
  {
    n: '01',
    step: 'Comece com uma consultoria',
    name: 'Consultoria de interiores',
    forWhom: 'Para melhorar um ambiente sem contratar um projeto completo.',
    pre: 'a partir de',
    price: 'R$ 450',
    unit: 'por ambiente',
    note: 'Quarto R$ 450 · Sala + cozinha R$ 750',
    items: [
      'Reunião de briefing online',
      'Análise pela planta, fotos e medidas',
      'Orientação de layout',
      'Moodboard de cores e materiais',
      'Móveis e decoração com links de compra',
      'Apresentação final em PDF',
    ],
    cta: {
      label: 'Pedir consultoria',
      message: 'Olá, Beatriz! Quero uma consultoria de interiores. O ambiente é: ',
    },
    href: '/servicos/consultoria',
  },
  {
    n: '02',
    step: 'Transforme um ambiente',
    name: 'Projeto completo por ambiente',
    forWhom: 'Para reformar um ambiente com 3D e detalhes prontos para a obra.',
    price: 'R$ 250',
    unit: 'por m²',
    note: 'Mínimo de R$ 1.500 por contratação',
    items: [
      'Planta de layout e mobiliário',
      'Imagens 3D realistas',
      'Iluminação, revestimentos e elevações',
      'Marcenaria, bancadas e nichos detalhados',
      'Especificação de materiais e acabamentos',
      'Caderno técnico para execução',
    ],
    cta: {
      label: 'Orçar meu ambiente',
      message: 'Olá, Beatriz! Quero orçar o projeto de um ambiente. O ambiente e a metragem são: ',
    },
    href: '/servicos/projeto-por-ambiente',
  },
  {
    n: '03',
    step: 'Projete o apartamento inteiro',
    name: 'Projeto completo de apartamento',
    forWhom: 'Para o apartamento todo, com um conceito só do começo ao fim.',
    price: 'R$ 15.000',
    unit: 'até 60 m²',
    note: 'Referência de R$ 250/m²',
    items: [
      'Sala e jantar, cozinha, lavanderia, 2 quartos e 2 banheiros',
      'Imagens 3D de todos os ambientes (até 10 vistas)',
      'Plantas técnicas, com pontos elétricos e hidráulicos',
      'Especificação de acabamentos, louças, metais e iluminação',
      'Memorial descritivo e caderno técnico',
    ],
    cta: {
      label: 'Orçar meu apartamento',
      message: 'Olá, Beatriz! Quero orçar o projeto do apartamento completo. A metragem é: ',
    },
    href: '/servicos/apartamento-completo',
    featured: true,
  },
]

export function PriceLadder() {
  return (
    <section id="precos" aria-labelledby="precos-title" className="section-y">
      <div className="container-site">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">Serviços e preços</p>
            <h2 id="precos-title" className="mt-4 font-display text-display text-ink">
              Três serviços, um degrau de cada vez
            </h2>
          </div>
          <p className="lede lg:col-span-5">
            Comece pela consultoria de um quarto. Se fizer sentido, siga para o projeto do ambiente
            ou do apartamento inteiro. O preço está aqui, sem pedir orçamento para descobrir.
          </p>
        </div>

        <ol className="mt-14 grid gap-5 lg:mt-20 lg:grid-cols-3 lg:gap-6">
          {tiers.map((tier, i) => (
            <li key={tier.n} className="relative flex">
              <article
                className={`group flex w-full flex-col rounded-[28px] p-7 transition-transform duration-500 ease-elegant hover:-translate-y-0.5 md:p-9 ${
                  tier.featured
                    ? 'bg-ink text-linen'
                    : 'border border-line bg-paper text-ink'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span
                    aria-hidden
                    className={`font-display text-numeral font-light italic ${
                      tier.featured ? 'text-clay-soft/40' : 'text-clay-soft'
                    }`}
                  >
                    {tier.n}
                  </span>
                  {tier.featured && (
                    <span className="rounded-full bg-ochre px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink">
                      Mais completo
                    </span>
                  )}
                </div>

                <p
                  className={`mt-6 text-[13px] font-semibold uppercase tracking-[0.14em] ${
                    tier.featured ? 'text-ochre' : 'text-clay'
                  }`}
                >
                  {tier.step}
                </p>
                <h3 className="mt-2 font-display text-heading">{tier.name}</h3>
                <p
                  className={`mt-2 text-[15px] leading-relaxed ${
                    tier.featured ? 'text-mist' : 'text-ink-soft'
                  }`}
                >
                  {tier.forWhom}
                </p>

                <div
                  className={`mt-7 border-t pt-6 ${tier.featured ? 'border-linen/15' : 'border-line'}`}
                >
                  {tier.pre && (
                    <span className={`block text-[14px] ${tier.featured ? 'text-mist' : 'text-ink-soft'}`}>
                      {tier.pre}
                    </span>
                  )}
                  <p className="flex flex-wrap items-baseline gap-x-2">
                    <span className="font-display text-[48px] leading-none tracking-[-0.02em] tabular">
                      {tier.price}
                    </span>
                    <span className={`text-[15px] ${tier.featured ? 'text-mist' : 'text-ink-soft'}`}>
                      {tier.unit}
                    </span>
                  </p>
                  <p className={`mt-2 text-[14px] ${tier.featured ? 'text-mist' : 'text-ink-soft'}`}>
                    {tier.note}
                  </p>
                </div>

                <ul className="mt-7 flex-1 space-y-3">
                  {tier.items.map((item) => (
                    <li key={item} className="flex gap-3 text-[15px] leading-snug">
                      <Check
                        size={18}
                        aria-hidden
                        className={`mt-px shrink-0 ${tier.featured ? 'text-ochre' : 'text-clay'}`}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-9 flex flex-col gap-4">
                  <a
                    href={waLink(tier.cta.message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={tier.featured ? 'btn-light' : 'btn-primary'}
                  >
                    {tier.cta.label}
                  </a>
                  <Link
                    href={tier.href}
                    className={`link-draw self-center text-[15px] ${tier.featured ? '!text-linen' : ''}`}
                  >
                    Ver o que inclui <ArrowRight size={15} aria-hidden />
                  </Link>
                </div>
              </article>

              {i < tiers.length - 1 && (
                <span
                  aria-hidden
                  className="absolute -right-[28px] top-[88px] z-10 hidden h-8 w-8 items-center justify-center rounded-full border border-line bg-linen text-clay lg:flex"
                >
                  <ArrowRight size={16} />
                </span>
              )}
            </li>
          ))}
        </ol>

        <p className="mt-8 text-center text-[14px] text-ink-soft">
          Nenhum serviço inclui execução, gestão de obra ou compras. Projetos de engenharia são
          contratados à parte.
        </p>
      </div>
    </section>
  )
}
