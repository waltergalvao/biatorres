// Structured data (schema.org JSON-LD) shared across the site.
//
// Every page refers to the same entities by @id, so search engines and AI
// assistants can join them into one graph: the business, the website and
// Beatriz herself. Keep these IDs stable; changing one breaks that link.
//
// Only mark up what a visitor can see on the page (or, for the site-wide
// entities, what the site states somewhere). No reviews or ratings until the
// testimonials are real (see src/data/testimonials.ts).

import { EMAIL, SITE_URL, WHATSAPP_NUMBER, serviceLinks } from '@/lib/site'
import { aboutSummary } from '@/data/about'
import { services, serviceHref, type Faq, type ServiceSlug } from '@/data/services'

export const SCHEMA_IDS = {
  /** The architecture practice (ProfessionalService / Organization). */
  business: `${SITE_URL}/#business`,
  /** The website itself (WebSite). */
  website: `${SITE_URL}/#website`,
  /** Beatriz Torres (Person). Her profile page is /sobre. */
  person: `${SITE_URL}/sobre#beatriz`,
} as const

/** Absolute URL for a site path ('/blog' -> 'https://beatriztorres.com.br/blog'). */
export const absoluteUrl = (path = '/') => `${SITE_URL}${path === '/' ? '' : path}`

export const BUSINESS_NAME = 'Beatriz Torres Arquitetura'
export const BUSINESS_DESCRIPTION =
  'Projeto de interiores online para apartamentos pequenos, studios e primeiro imóvel, até 60 m²: consultoria por ambiente, projeto por ambiente com imagens 3D e projeto do apartamento completo, para clientes de todo o Brasil.'

/** E.164 phone, the same number as the WhatsApp links. */
export const PHONE = `+${WHATSAPP_NUMBER}`
/** Square PNG logo (src/app/logo.png/route.tsx). */
export const LOGO_PATH = '/logo.png'
export const PORTRAIT_PATH = '/images/beatriz-retrato.jpg'

const KNOWS_ABOUT = [
  'Projeto de interiores',
  'Design de interiores',
  'Apartamentos pequenos',
  'Studios',
  'Primeiro apartamento',
  'Imóveis para aluguel e temporada',
  'Marcenaria sob medida',
  'Consultoria de interiores online',
]

/** Profiles of the business elsewhere (Instagram, Pinterest...). Add only real URLs. */
// TODO(owner): add the Instagram (and any other) profile URL here once it exists.
const SAME_AS: string[] = []

type Thing = Record<string, unknown>

/** Wraps nodes in one JSON-LD document. */
export const graph = (...nodes: Thing[]) => ({ '@context': 'https://schema.org', '@graph': nodes })

/** "R$ 3.750" -> 3750. */
export const brl = (price: string) => Number(price.replace(/[^\d,]/g, '').replace(',', '.'))

export const serviceId = (slug: ServiceSlug) => `${absoluteUrl(serviceHref(slug))}#service`
export const webPageId = (path: string) => `${absoluteUrl(path)}#webpage`

const ref = (id: string) => ({ '@id': id })

// ---------------------------------------------------------------------------
// Site-wide entities (rendered by the root layout on every page)

export function businessSchema(): Thing {
  return {
    '@type': ['ProfessionalService', 'Organization'],
    '@id': SCHEMA_IDS.business,
    name: BUSINESS_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      '@id': `${SITE_URL}/#logo`,
      url: absoluteUrl(LOGO_PATH),
      width: 512,
      height: 512,
      caption: BUSINESS_NAME,
    },
    image: absoluteUrl(PORTRAIT_PATH),
    description: BUSINESS_DESCRIPTION,
    slogan: 'Projeto de interiores para apartamentos pequenos',
    priceRange: 'R$ 450 a R$ 15.000',
    currenciesAccepted: 'BRL',
    telephone: PHONE,
    email: EMAIL,
    // City only, as shown in the footer: projects are online, there is no studio to visit.
    address: { '@type': 'PostalAddress', addressLocality: 'São Paulo', addressRegion: 'SP', addressCountry: 'BR' },
    areaServed: { '@type': 'Country', name: 'Brasil' },
    availableLanguage: 'pt-BR',
    knowsAbout: KNOWS_ABOUT,
    founder: ref(SCHEMA_IDS.person),
    employee: ref(SCHEMA_IDS.person),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: PHONE,
      email: EMAIL,
      url: `https://wa.me/${WHATSAPP_NUMBER}`,
      areaServed: 'BR',
      availableLanguage: 'pt-BR',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Serviços de projeto de interiores',
      itemListElement: serviceLinks.map((link) => {
        const slug = link.href.split('/').pop() as ServiceSlug
        return {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', '@id': serviceId(slug), name: services[slug].name, url: absoluteUrl(link.href) },
        }
      }),
    },
    ...(SAME_AS.length ? { sameAs: SAME_AS } : {}),
  }
}

export function websiteSchema(): Thing {
  return {
    '@type': 'WebSite',
    '@id': SCHEMA_IDS.website,
    url: SITE_URL,
    name: BUSINESS_NAME,
    description: BUSINESS_DESCRIPTION,
    inLanguage: 'pt-BR',
    publisher: ref(SCHEMA_IDS.business),
  }
}

export function personSchema(): Thing {
  return {
    '@type': 'Person',
    '@id': SCHEMA_IDS.person,
    name: 'Beatriz Torres',
    jobTitle: 'Arquiteta de interiores',
    description: aboutSummary,
    url: absoluteUrl('/sobre'),
    image: absoluteUrl(PORTRAIT_PATH),
    worksFor: ref(SCHEMA_IDS.business),
    knowsAbout: KNOWS_ABOUT,
    // TODO(owner): once confirmed, add hasCredential with the CAU registration number.
    ...(SAME_AS.length ? { sameAs: SAME_AS } : {}),
  }
}

// ---------------------------------------------------------------------------
// Page-level nodes

type Crumb = { name: string; path: string }

export function breadcrumbSchema(path: string, items: Crumb[]): Thing {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${absoluteUrl(path)}#breadcrumb`,
    itemListElement: [{ name: 'Início', path: '/' }, ...items].map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

/** FAQPage for the questions shown on the page (pass exactly the items the page renders). */
export function faqSchema(path: string, items: Faq[]): Thing {
  return {
    '@type': 'FAQPage',
    '@id': `${absoluteUrl(path)}#faq`,
    url: absoluteUrl(path),
    inLanguage: 'pt-BR',
    isPartOf: ref(webPageId(path)),
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

/** The page itself, tying it to the website, its breadcrumb and what it is about. */
export function webPageSchema(
  path: string,
  page: { type?: string; name: string; description: string; breadcrumb?: boolean; faq?: boolean } & Thing,
): Thing {
  const { type = 'WebPage', breadcrumb = true, faq = false, ...rest } = page
  return {
    '@type': type,
    '@id': webPageId(path),
    url: absoluteUrl(path),
    inLanguage: 'pt-BR',
    isPartOf: ref(SCHEMA_IDS.website),
    ...(breadcrumb ? { breadcrumb: ref(`${absoluteUrl(path)}#breadcrumb`) } : {}),
    // The FAQ shown on the page is its own FAQPage node (faqSchema), part of this page.
    ...(faq ? { hasPart: ref(`${absoluteUrl(path)}#faq`) } : {}),
    ...rest,
  }
}

/** Service with its public prices (the same table the page shows). */
export function serviceSchema(slug: ServiceSlug): Thing {
  const service = services[slug]
  const url = absoluteUrl(serviceHref(slug))
  const { pricing } = service
  const offer = (name: string, price: number, extra: Thing = {}) => ({
    '@type': 'Offer',
    name,
    price,
    priceCurrency: 'BRL',
    url,
    seller: ref(SCHEMA_IDS.business),
    ...extra,
  })

  let offers: Thing
  if (pricing.kind === 'rooms') {
    const rows = pricing.rows.map((row) =>
      offer(`${service.name}: ${row.room}${pricing.showArea && row.area ? ` (${row.area})` : ''}`, brl(row.price)),
    )
    const prices = pricing.rows.map((row) => brl(row.price))
    const list = pricing.calculator
      ? [
          offer(`${service.name}: valor por m²`, pricing.calculator.perM2, {
            priceSpecification: [
              {
                '@type': 'UnitPriceSpecification',
                price: pricing.calculator.perM2,
                priceCurrency: 'BRL',
                unitCode: 'MTK',
                unitText: 'm²',
              },
              {
                '@type': 'PriceSpecification',
                minPrice: pricing.calculator.minimum,
                priceCurrency: 'BRL',
                description: `Valor mínimo por contratação: R$ ${pricing.calculator.minimum.toLocaleString('pt-BR')}`,
              },
            ],
          }),
          ...rows,
        ]
      : rows
    offers = {
      '@type': 'AggregateOffer',
      priceCurrency: 'BRL',
      lowPrice: Math.min(...prices, ...(pricing.calculator ? [pricing.calculator.minimum] : [])),
      highPrice: Math.max(...prices),
      offerCount: list.length,
      offers: list,
    }
  } else {
    const total = pricing.total ? brl(pricing.total) : brl(pricing.price)
    offers = offer(`${service.name} ${pricing.unit}`, total, {
      description: `${pricing.pre ? `${pricing.pre} ` : ''}${pricing.price}, ${pricing.unit}. Inclui: ${pricing.covers.join(', ')}.`,
    })
  }

  return {
    '@type': 'Service',
    '@id': serviceId(slug),
    name: service.name,
    serviceType: 'Projeto de interiores',
    description: service.seo.description,
    url,
    provider: ref(SCHEMA_IDS.business),
    areaServed: { '@type': 'Country', name: 'Brasil' },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: url,
      servicePhone: PHONE,
      availableLanguage: 'pt-BR',
    },
    offers,
  }
}
