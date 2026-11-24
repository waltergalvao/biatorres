import { notFound } from 'next/navigation'
import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard, unsplashPhoto } from '@/lib/og'
import { audiences, type AudienceSlug } from '@/data/audiences'

// Share image per audience landing page (also what WhatsApp shows when the link is shared): the
// hero's photo with copy of its own. The hero's headline alone ("Imóvel de renda que se destaca
// no anúncio") reads like a property for sale once it's out of the page, so the card always says
// it's an interior design service. No price.
export const runtime = 'edge'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'Beatriz Torres Arquitetura: projeto de interiores para apartamentos pequenos'

const CARDS: Record<AudienceSlug, { label: string; title: string; accent: string }> = {
  investidores: {
    label: 'Arquitetura de interiores · investidores',
    title: 'Projeto de interiores para',
    accent: 'imóvel de renda',
  },
  'primeiro-apartamento': {
    label: 'Arquitetura de interiores · primeiro apê',
    title: 'Projeto de interiores para o',
    accent: 'primeiro apartamento',
  },
  studios: {
    label: 'Arquitetura de interiores · studios',
    title: 'Projeto de interiores para',
    accent: 'studios',
  },
}

export default async function Image({ params }: { params: { slug: string } }) {
  const a = Object.hasOwn(audiences, params.slug) ? audiences[params.slug as AudienceSlug] : undefined
  if (!a) notFound()
  return renderOgCard({
    ...CARDS[params.slug as AudienceSlug],
    photo: { data: await unsplashPhoto(a.hero.image) },
  })
}
