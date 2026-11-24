import { notFound } from 'next/navigation'
import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard, unsplashPhoto } from '@/lib/og'
import { services, type ServiceSlug } from '@/data/services'

// Share image per service: the hero's photo with copy of its own, short enough to keep the type
// big, that names the service ("projeto de interiores", "consultoria de interiores"). No price.
export const runtime = 'edge'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'Beatriz Torres Arquitetura: serviço de projeto de interiores'

const CARDS: Record<ServiceSlug, { label: string; title: string; accent: string }> = {
  consultoria: {
    label: 'Consultoria de interiores · online',
    title: 'Saiba o que comprar e onde colocar, com uma consultoria',
    accent: 'online',
  },
  'projeto-por-ambiente': {
    label: 'Projeto de interiores por ambiente',
    title: 'Cada ambiente projetado, com',
    accent: 'imagens 3D',
  },
  'apartamento-completo': {
    label: 'Projeto completo de apartamento',
    title: 'Projeto de interiores do apartamento inteiro,',
    accent: 'até 60 m²',
  },
}

export default async function Image({ params }: { params: { slug: string } }) {
  const s = Object.hasOwn(services, params.slug) ? services[params.slug as ServiceSlug] : undefined
  if (!s) notFound()
  return renderOgCard({
    ...CARDS[params.slug as ServiceSlug],
    photo: { data: await unsplashPhoto(s.hero.image) },
  })
}
