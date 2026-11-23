import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { serviceOrder, services, serviceHref, type ServiceSlug } from '@/data/services'
import { testimonials } from '@/data/testimonials'
import { waLink } from '@/lib/site'
import { LandingHero } from '@/components/landing/LandingHero'
import { FitCheck } from '@/components/service/FitCheck'
import { Includes } from '@/components/service/Includes'
import { Pricing } from '@/components/service/Pricing'
import { CrossSell } from '@/components/service/CrossSell'
import { StickyCta } from '@/components/landing/StickyCta'
import { Deliverables } from '@/components/sections/Deliverables'
import { Process } from '@/components/sections/Process'
import { Testimonials } from '@/components/sections/Testimonials'
import { Faq } from '@/components/sections/Faq'
import { FinalCta } from '@/components/sections/FinalCta'
import { WhatsAppIcon } from '@/components/WhatsAppIcon'

type Props = { params: { slug: string } }

const isSlug = (s: string): s is ServiceSlug => s in services

export const dynamicParams = false

export function generateStaticParams() {
  return serviceOrder.map((slug) => ({ slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  if (!isSlug(params.slug)) return {}
  const { seo } = services[params.slug]
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: serviceHref(params.slug) },
    openGraph: { title: seo.title, description: seo.description, locale: 'pt_BR', type: 'website' },
  }
}

export default function ServicePage({ params }: Props) {
  if (!isSlug(params.slug)) notFound()
  const service = services[params.slug]
  const quotes = testimonials.filter((t) => t.service === service.slug)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.seo.description,
    serviceType: service.name,
    areaServed: 'BR',
    provider: { '@type': 'ProfessionalService', name: 'Beatriz Torres Arquitetura' },
  }

  return (
    <div data-service={service.slug}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LandingHero
        hero={service.hero}
        price={service.price}
        cta={service.cta}
        trust={service.trust}
        secondary={service.heroSecondary}
      />
      <Pricing service={service} />
      <FitCheck service={service} />
      <Includes service={service} />
      <Deliverables className="bg-paper" only={service.deliverables} />
      <Process
        title="Como funciona, passo a passo"
        lede="Tudo online: mensagem, chamada de vídeo e arquivos. Você não precisa estar em São Paulo."
        steps={service.process}
      >
        <a
          href={waLink(service.cta.message)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full sm:w-auto"
          data-placement="processo"
        >
          <WhatsAppIcon className="h-5 w-5" />
          {service.cta.label}
        </a>
        <p className="text-[15px] text-ink-soft">O primeiro passo é uma mensagem. Sem compromisso.</p>
      </Process>
      <Testimonials items={quotes} />
      <CrossSell service={service} />
      <Faq items={service.faq} message={`Olá, Beatriz! Vim pela página ${service.source} e tenho uma dúvida: `} />
      <FinalCta
        eyebrow={service.name}
        title={service.final.title}
        text={service.final.text}
        ctaLabel={service.cta.label}
        message={service.cta.message}
      />
      <StickyCta
        pre={service.price.pre}
        value={service.price.value}
        unit={service.price.installments ?? service.price.unit}
        label={service.cta.label}
        message={service.cta.message}
      />
    </div>
  )
}
