import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { audienceHref, audienceOrder, audiences, type AudienceSlug } from '@/data/audiences'
import { generalProcess } from '@/data/general'
import { testimonials } from '@/data/testimonials'
import { waLink } from '@/lib/site'
import { LandingHero } from '@/components/landing/LandingHero'
import { Contrast } from '@/components/landing/Contrast'
import { Packages } from '@/components/landing/Packages'
import { StickyCta } from '@/components/landing/StickyCta'
import { Deliverables } from '@/components/sections/Deliverables'
import { Gallery } from '@/components/sections/Gallery'
import { Process } from '@/components/sections/Process'
import { Testimonials } from '@/components/sections/Testimonials'
import { Faq } from '@/components/sections/Faq'
import { FinalCta } from '@/components/sections/FinalCta'
import { WhatsAppIcon } from '@/components/WhatsAppIcon'

// Google Ads landing pages. The header drops the site navigation on /para/* (see Header),
// so the only ways forward are the WhatsApp buttons and the package pages.

type Props = { params: { slug: string } }

const isSlug = (s: string): s is AudienceSlug => s in audiences

export const dynamicParams = false

export function generateStaticParams() {
  return audienceOrder.map((slug) => ({ slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  if (!isSlug(params.slug)) return {}
  const { seo } = audiences[params.slug]
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: audienceHref(params.slug) },
    openGraph: { title: seo.title, description: seo.description, locale: 'pt_BR', type: 'website' },
  }
}

export default function AudiencePage({ params }: Props) {
  if (!isSlug(params.slug)) notFound()
  const a = audiences[params.slug]
  const quotes = testimonials.filter((t) => t.audiences?.includes(a.slug))

  return (
    <div data-service={`para-${a.slug}`}>
      <LandingHero
        hero={a.hero}
        price={a.price}
        cta={a.cta}
        trust={a.trust}
        secondary={{ href: '#pacotes', label: 'Ver pacotes e valores' }}
      />
      <Contrast title={a.contrast.title} lede={a.contrast.lede} without={a.contrast.without} withProject={a.contrast.with} />
      <Packages title={a.packages.title} lede={a.packages.lede} items={a.packages.items} />
      <Deliverables />
      <Gallery />
      <Process title="Do WhatsApp ao projeto, em quatro etapas online" steps={generalProcess}>
        <a
          href={waLink(a.cta.message)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full sm:w-auto"
          data-placement="processo"
        >
          <WhatsAppIcon className="h-5 w-5" />
          {a.cta.label}
        </a>
        <p className="text-[15px] text-ink-soft">O primeiro passo é uma mensagem. Sem compromisso.</p>
      </Process>
      <Testimonials items={quotes} />
      <Faq items={a.faq} message={`Olá, Beatriz! Vim pela página de ${a.card.kicker.toLowerCase()} e tenho uma dúvida: `} />
      <FinalCta
        eyebrow={a.card.kicker}
        title={a.final.title}
        text={a.final.text}
        ctaLabel={a.cta.label}
        message={a.cta.message}
      />
      <StickyCta pre={a.price.pre} value={a.price.value} unit={a.price.unit} label="Pedir orçamento" message={a.cta.message} />
    </div>
  )
}
