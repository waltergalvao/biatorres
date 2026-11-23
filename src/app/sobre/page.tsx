import Image from 'next/image'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { work } from '@/data/work'
import { PRIMARY_CTA, unsplash, waLink } from '@/lib/site'
import { Deliverables } from '@/components/sections/Deliverables'
import { FinalCta } from '@/components/sections/FinalCta'
import { SectionHeader } from '@/components/sections/SectionHeader'
import { WhatsAppIcon } from '@/components/WhatsAppIcon'

const i = (n: number) => ({ '--i': n }) as React.CSSProperties

// TODO(owner): confirm these facts (kept from the previous site) and add the CAU registration
// number. A real registration number is one of the strongest trust signals on this page.
const credentials = [
  'Arquiteta formada pela FAU-USP',
  'Especialização em design de interiores',
  'Mais de dez anos em projetos residenciais',
]

const principles = [
  {
    title: 'Escuta',
    text: 'Antes de desenhar, entendo a sua rotina, o seu orçamento e o que fica ou sai. O projeto parte de como você vive, não de uma tendência.',
  },
  {
    title: 'Medida',
    text: 'Em poucos metros, cada centímetro conta. Confiro as medidas de cada móvel e cada circulação antes de você comprar ou quebrar.',
  },
  {
    title: 'Clareza',
    text: 'Você sabe o que vai receber e quanto vai pagar antes de começar. As entregas vêm organizadas para comprar, reformar e montar.',
  },
]

const src = (image: string) => (image.startsWith('/') ? image : unsplash(image))

export default function SobrePage() {
  return (
    <>
      <section aria-labelledby="sobre-title" className="relative overflow-hidden" data-placement="hero">
        <div className="container-site grid items-center gap-12 pb-20 pt-8 md:pt-12 lg:grid-cols-12 lg:gap-16 lg:pb-28">
          <div className="lg:col-span-7">
            <p className="eyebrow enter" style={i(0)}>
              Sobre
            </p>
            <h1 id="sobre-title" className="enter mt-5 font-display text-display-xl text-ink" style={i(1)}>
              Sou a Beatriz. Projeto apartamentos <em className="italic text-clay">pequenos</em>.
            </h1>
            <p className="enter lede mt-6 max-w-[38rem] text-pretty" style={i(2)}>
              Arquiteta de interiores dedicada a studios, primeiro imóvel e apartamentos de até 60 m². Eu
              conduzo cada projeto do briefing à entrega, online, para clientes de qualquer cidade.
            </p>

            <ul className="enter mt-8 grid gap-2.5 border-t border-line pt-6 text-[16px] text-ink" style={i(3)}>
              {credentials.map((c) => (
                <li key={c} className="flex items-center gap-3">
                  <Check size={18} aria-hidden className="shrink-0 text-olive" />
                  {c}
                </li>
              ))}
            </ul>

            <div className="enter mt-9 flex flex-col gap-3 sm:flex-row" style={i(4)}>
              <a
                href={waLink('Olá, Beatriz! Li sobre o seu trabalho e quero conversar sobre o meu apartamento.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Conversar com a Beatriz
              </a>
              <Link href="/#servicos" className="btn-outline">
                Ver serviços
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-sand">
              {/* TODO(owner): replace the stock portrait with a real photo of Beatriz. */}
              <Image
                src={unsplash('1573496359142-b8d87734a5a2')}
                alt="Retrato de Beatriz Torres, arquiteta"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="animate-reveal object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="historia-title" className="section-y bg-paper">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow">Por que apartamentos pequenos</p>
            <h2 id="historia-title" className="mt-4 font-display text-display text-ink">
              É onde o projeto mais faz diferença
            </h2>
          </div>
          {/* TODO(owner): personalise this text with Beatriz's own story. */}
          <div className="space-y-5 text-[18px] leading-relaxed text-ink-soft lg:col-span-7">
            <p>
              Em um apartamento grande, um erro de medida passa despercebido. Em 40 m², um sofá fora de
              escala ocupa a sala inteira, e uma tomada no lugar errado vira uma extensão para sempre.
            </p>
            <p>
              Por isso escolhi trabalhar com studios, primeiro imóvel e apartamentos compactos: quem compra
              para morar, quem compra para alugar e quem quer fazer mais com menos metros.
            </p>
            <p>
              Atendo online porque funciona: com a planta, fotos, medidas e uma boa conversa por vídeo, eu
              entrego o projeto pronto para você comprar, reformar e montar, esteja onde estiver.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="como-title" className="section-y">
        <div className="container-site">
          <SectionHeader id="como-title" eyebrow="Como eu trabalho" title="Três coisas que não mudam de projeto para projeto" />
          <ul className="mt-14 grid gap-px overflow-hidden rounded-[28px] border border-line bg-line md:grid-cols-3">
            {principles.map((p, n) => (
              <li key={p.title} className="bg-linen p-7 md:p-9">
                <span aria-hidden className="font-display text-[44px] font-light italic leading-none text-clay">
                  {String(n + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-6 font-display text-[26px] leading-tight text-ink">{p.title}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-ink-soft">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {work.length > 0 ? (
        <section aria-labelledby="trabalhos-title" className="section-y bg-sand">
          <div className="container-site">
            <SectionHeader
              id="trabalhos-title"
              eyebrow="Trabalhos"
              title="Alguns projetos"
              lede="Projetos entregues e estudos em andamento, cada um identificado pelo que mostra."
            />
            <ul className="mt-14 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {work.map((w) => (
                <li key={w.title}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-sand-deep">
                    <Image
                      src={src(w.image)}
                      alt={w.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-linen/90 px-3 py-1.5 text-[13px] font-semibold text-ink backdrop-blur-sm">
                      {w.kind}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-[24px] leading-tight text-ink">{w.title}</h3>
                  <p className="mt-1 text-[14px] font-semibold uppercase tracking-[0.12em] text-olive">{w.facts}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{w.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : (
        <Deliverables className="bg-sand" />
      )}

      <FinalCta
        eyebrow="Vamos conversar"
        title="Conte o que você quer mudar no seu apartamento"
        text="Mande a metragem e o que quer resolver. Eu indico o serviço certo e respondo com o valor fechado."
        ctaLabel={PRIMARY_CTA.label}
      />
    </>
  )
}
