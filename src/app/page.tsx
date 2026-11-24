import { Hero } from '@/components/home/Hero'
import { About } from '@/components/home/About'
import { Services } from '@/components/home/Services'
import { Interlude } from '@/components/home/Interlude'
import { Deliverables } from '@/components/sections/Deliverables'
import { Audiences } from '@/components/home/Audiences'
import { Process } from '@/components/sections/Process'
import { Testimonials } from '@/components/sections/Testimonials'
import { Faq } from '@/components/sections/Faq'
import { FinalCta } from '@/components/sections/FinalCta'
import { WhatsAppIcon } from '@/components/WhatsAppIcon'
import { generalFaq, generalProcess } from '@/data/general'
import { testimonials } from '@/data/testimonials'
import { PRIMARY_CTA, waLink } from '@/lib/site'
import type { Metadata } from 'next'
import { JsonLd } from '@/components/JsonLd'
import { BUSINESS_DESCRIPTION, SCHEMA_IDS, faqSchema, graph, webPageSchema } from '@/lib/schema'
import { HOME_DESCRIPTION, HOME_TITLE, pageMetadata } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata({
  title: HOME_TITLE,
  absoluteTitle: true,
  description: HOME_DESCRIPTION,
  path: '/',
})

// The home presents the studio, shows each service with its price anchor and sends visitors
// to a service page (also the Google Ads landing pages) for the full scope and price table.
const homeQuotes = [testimonials[0], testimonials[2], testimonials[4]]

export default function Home() {
  const jsonLd = graph(
    webPageSchema('/', {
      name: 'Projeto de interiores para apartamento pequeno',
      description: BUSINESS_DESCRIPTION,
      breadcrumb: false,
      faq: true,
      about: { '@id': SCHEMA_IDS.business },
    }),
    faqSchema('/', generalFaq),
  )

  return (
    <>
      <JsonLd data={jsonLd} />
      <Hero />
      <Services />
      <Audiences />
      <About />
      <Interlude />
      <Deliverables />
      <Process title="Do WhatsApp ao projeto, em quatro etapas online" steps={generalProcess}>
        <a
          href={waLink('Olá, Beatriz! Quero começar meu projeto. O ambiente (ou a metragem do apê) é:')}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full sm:w-auto"
          data-placement="processo"
        >
          <WhatsAppIcon className="h-5 w-5" />
          Começar pela conversa
        </a>
        <p className="text-[15px] text-ink-soft">O primeiro passo é uma mensagem. Sem compromisso.</p>
      </Process>
      <Testimonials items={homeQuotes} />
      <Faq items={generalFaq} />
      <FinalCta
        eyebrow="Vamos conversar"
        title="Conte o que você quer mudar na sua casa"
        text="Mande uma mensagem com o ambiente ou a metragem do apartamento. Eu indico o serviço certo e respondo com o valor fechado."
        ctaLabel={PRIMARY_CTA.label}
        message="Olá, Beatriz! Vim pelo site e quero ajuda com o meu apartamento. O que eu quero mudar é:"
      />
    </>
  )
}
