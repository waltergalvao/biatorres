import Image from 'next/image'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { work } from '@/data/work'
import { aboutLede, aboutStory, aboutSummary, principles } from '@/data/about'
import { PRIMARY_CTA, waLink } from '@/lib/site'
import { JsonLd } from '@/components/JsonLd'
import { SCHEMA_IDS, breadcrumbSchema, graph, webPageSchema } from '@/lib/schema'
import { Work } from '@/components/sections/Work'
import { FinalCta } from '@/components/sections/FinalCta'
import { SectionHeader } from '@/components/sections/SectionHeader'
import { WhatsAppIcon } from '@/components/WhatsAppIcon'

const i = (n: number) => ({ '--i': n }) as React.CSSProperties

// TODO(owner): confirm these facts (kept from the previous site) and add the CAU registration
// number. A real registration number is one of the strongest trust signals on this page.
const credentials = [
  'Arquiteta e urbanista',
  'Especialização em design de interiores',
  'Mais de dez anos em projetos residenciais',
]

// Profile page: its main entity is Beatriz (the Person node in the root layout).
const jsonLd = graph(
  webPageSchema('/sobre', {
    type: 'ProfilePage',
    name: 'Sobre Beatriz Torres',
    description: aboutSummary,
    mainEntity: { '@id': SCHEMA_IDS.person },
  }),
  breadcrumbSchema('/sobre', [{ name: 'Sobre', path: '/sobre' }]),
)

export default function SobrePage() {
  return (
    <>
      <JsonLd data={jsonLd} />
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
              {aboutLede}
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
              <Image
                src="/images/beatriz-retrato.jpg"
                alt="Beatriz Torres, arquiteta, em um apartamento com uma planta e amostras de materiais sobre a mesa"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="animate-reveal object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <Work items={work} />

      <section aria-labelledby="historia-title" className="section-y bg-paper">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow">Por que apartamentos pequenos</p>
            <h2 id="historia-title" className="mt-4 font-display text-display text-ink">
              É onde o projeto mais faz diferença
            </h2>
            {/* A real visit, shown as experience, not as a service: no service includes site visits. */}
            <figure className="mt-10 max-w-sm">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-sand">
                <Image
                  src="/images/beatriz-obra.jpg"
                  alt="Beatriz conferindo o puxador de uma porta de marcenaria em um apartamento em obra"
                  fill
                  sizes="(max-width: 1024px) 90vw, 384px"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-[14px] leading-snug text-ink-soft">
                Conferindo a marcenaria de um projeto. Conhecer a obra é o que deixa o caderno técnico completo.
              </figcaption>
            </figure>
          </div>
          <div className="space-y-5 text-[18px] leading-relaxed text-ink-soft lg:col-span-7">
            {aboutStory.map((p) => (
              <p key={p}>{p}</p>
            ))}
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


      <FinalCta
        eyebrow="Vamos conversar"
        title="Conte o que você quer mudar no seu apartamento"
        text="Mande a metragem e o que quer resolver. Eu indico o serviço certo e respondo com o valor fechado."
        ctaLabel={PRIMARY_CTA.label}
      />
    </>
  )
}
