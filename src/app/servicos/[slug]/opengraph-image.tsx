import { notFound } from 'next/navigation'
import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard, unsplashPhoto } from '@/lib/og'
import { services, type ServiceSlug } from '@/data/services'

// Share image per service: the hero's photo, label and headline (without `titleAfter`, to keep
// the type big). No price.
export const runtime = 'edge'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'Beatriz Torres Arquitetura: serviço de projeto de interiores'

export default async function Image({ params }: { params: { slug: string } }) {
  const s = Object.hasOwn(services, params.slug) ? services[params.slug as ServiceSlug] : undefined
  if (!s) notFound()
  return renderOgCard({
    label: s.hero.eyebrow,
    title: s.hero.title,
    accent: s.hero.accent,
    photo: { data: await unsplashPhoto(s.hero.image) },
  })
}
