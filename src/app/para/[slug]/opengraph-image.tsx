import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og'
import { audiences, type AudienceSlug } from '@/data/audiences'

// Share image per audience landing page (also what WhatsApp shows when the link is shared).
export const runtime = 'edge'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'Beatriz Torres Arquitetura: projeto de interiores para apartamentos pequenos'

export default function Image({ params }: { params: { slug: AudienceSlug } }) {
  const a = audiences[params.slug] ?? audiences.studios
  const { pre, value, unit } = a.price
  return renderOgImage({
    eyebrow: a.card.kicker,
    title: a.card.title,
    detail: [pre, value, unit].filter(Boolean).join(' '),
  })
}
