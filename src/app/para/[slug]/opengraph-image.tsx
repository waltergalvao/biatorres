import { notFound } from 'next/navigation'
import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard, unsplashPhoto } from '@/lib/og'
import { audiences, type AudienceSlug } from '@/data/audiences'

// Share image per audience landing page (also what WhatsApp shows when the link is shared): the
// hero's photo, label and headline (without `titleAfter`, to keep the type big). No price.
export const runtime = 'edge'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'Beatriz Torres Arquitetura: projeto de interiores para apartamentos pequenos'

export default async function Image({ params }: { params: { slug: string } }) {
  const a = Object.hasOwn(audiences, params.slug) ? audiences[params.slug as AudienceSlug] : undefined
  if (!a) notFound()
  return renderOgCard({
    label: a.hero.eyebrow,
    title: a.hero.title,
    accent: a.hero.accent,
    photo: { data: await unsplashPhoto(a.hero.image) },
  })
}
