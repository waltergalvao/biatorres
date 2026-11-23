import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { serviceOrder, services, serviceHref, type ServiceSlug } from '@/data/services'
import { testimonials } from '@/data/testimonials'
import { waLink } from '@/lib/site'
import { ServiceHero } from '@/components/service/ServiceHero'
import { FitCheck } from '@/components/service/FitCheck'
import { Includes } from '@/components/service/Includes'
import { Pricing } from '@/components/service/Pricing'
import { CrossSell } from '@/components/service/CrossSell'
import { StickyCta } from '@/components/service/StickyCta'
import { Gallery } from '@/components/sections/Gallery'
import { Process } from '@/components/sections/Process'
import { Testimonials } from '@/components/sections/Testimonials'
import { Faq } from '@/components/sections/Faq'
import { FinalCta } from '@/components/sections/FinalCta'
import { WhatsAppIcon } from '@/components/WhatsAppIcon'

type Props = { params: { slug: string } }

const isSlug = (s: string): s is ServiceSlug => s in services

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
    areaServed: service.slug === 'vistoria' ? 'São Paulo, SP' : 'BR',
    provider: { '@type': 'ProfessionalService', name: 'Beatriz Torres Arquitetura' },
  }

  return (
    <div data-service={service.slug}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ServiceHero service={service} />
      <FitCheck service={service} />
      <Includes service={service} />
      {service.slug !== 'vistoria' && <Gallery />}
      <Pricing service={service} />
      <Process
        title="Como funciona, passo a passo"
        lede={
          service.slug === 'vistoria'
            ? 'Do primeiro contato ao laudo, sem complicação.'
            : 'Tudo online: mensagem, chamada de vídeo e arquivos. Você não precisa estar em São Paulo.'
        }
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
      <Faq items={service.faq} message={`Olá, Beatriz! Tenho uma dúvida sobre ${service.name.toLowerCase()}: `} />
      <CrossSell service={service} />
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
        unit={service.price.unit}
        label="Pedir orçamento"
        message={service.cta.message}
      />
    </div>
  )
}
