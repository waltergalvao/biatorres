import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { audienceHref, audienceOrder, audiences, type AudienceSlug } from '@/data/audiences'
import { generalProcess } from '@/data/general'
import { testimonials } from '@/data/testimonials'
import { EMAIL, waLink } from '@/lib/site'
import { pageMetadata } from '@/lib/metadata'
import { breadcrumbSchema, faqSchema, graph, serviceId, webPageSchema } from '@/lib/schema'
import { JsonLd } from '@/components/JsonLd'
import { LandingHero } from '@/components/landing/LandingHero'
import { Contrast } from '@/components/landing/Contrast'
import { Packages } from '@/components/landing/Packages'
import { StickyCta } from '@/components/landing/StickyCta'
import { Deliverables } from '@/components/sections/Deliverables'
import { Process } from '@/components/sections/Process'
import { Testimonials } from '@/components/sections/Testimonials'
import { Faq } from '@/components/sections/Faq'
import { FinalCta } from '@/components/sections/FinalCta'
import { WhatsAppIcon } from '@/components/WhatsAppIcon'

// Google Ads landing pages. The header drops the site navigation on /para/* (see Header),
// and the footer to contact links (see Footer), so the only ways forward are WhatsApp and e-mail.
//
// They are indexed: each one answers a different search (investidores, primeiro apartamento,
// studios) with its own problems, packages and FAQ, and the home page links to them. They don't
// duplicate the service pages, which describe one service each.

type Props = { params: { slug: string } }

const isSlug = (s: string): s is AudienceSlug => s in audiences

export const dynamicParams = false

export function generateStaticParams() {
  return audienceOrder.map((slug) => ({ slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  if (!isSlug(params.slug)) return {}
  const { seo } = audiences[params.slug]
  return pageMetadata({ ...seo, path: audienceHref(params.slug) })
}

export default function AudiencePage({ params }: Props) {
  if (!isSlug(params.slug)) notFound()
  const a = audiences[params.slug]
  const quotes = testimonials.filter((t) => t.audiences?.includes(a.slug))
  const path = audienceHref(a.slug)
  const jsonLd = graph(
    webPageSchema(path, {
      name: a.seo.title,
      description: a.seo.description,
      faq: true,
      audience: { '@type': 'Audience', audienceType: a.card.kicker },
      // The packages on the page are the site's services, each with its price.
      mentions: a.packages.items.map((p) => ({ '@id': serviceId(p.service) })),
    }),
    breadcrumbSchema(path, [{ name: a.card.kicker, path }]),
    faqSchema(path, a.faq),
  )

  return (
    <div data-service={`para-${a.slug}`}>
      <JsonLd data={jsonLd} />
      <LandingHero
        hero={a.hero}
        price={a.price}
        cta={a.cta}
        trust={a.trust}
        secondary={{ href: '#pacotes', label: 'Ver pacotes e valores' }}
      />
      <Contrast title={a.contrast.title} lede={a.contrast.lede} without={a.contrast.without} withProject={a.contrast.with} />
      <Packages title={a.packages.title} lede={a.packages.lede} items={a.packages.items} />
      <Deliverables className="bg-paper" />
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
      <Faq items={a.faq} message={`Olá, Beatriz! Vim pela ${a.source} e tenho uma dúvida:`} />
      <FinalCta
        eyebrow={a.card.kicker}
        title={a.final.title}
        text={a.final.text}
        ctaLabel={a.cta.label}
        message={a.cta.message}
        secondary={{ href: `mailto:${EMAIL}`, label: 'Prefiro e-mail' }}
      />
      <StickyCta pre={a.price.pre} value={a.price.value} unit={a.price.unit} label={a.cta.label} message={a.cta.message} />
    </div>
  )
}
