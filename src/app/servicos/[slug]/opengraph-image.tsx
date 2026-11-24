import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og'
import { services, type ServiceSlug } from '@/data/services'

// Share image per service: name, promise and the price anchor shown in the hero.
export const runtime = 'edge'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'Beatriz Torres Arquitetura: serviço de projeto de interiores'

export default function Image({ params }: { params: { slug: ServiceSlug } }) {
  const s = services[params.slug] ?? services.consultoria
  const { pre, value, unit } = s.price
  return renderOgImage({
    eyebrow: s.name,
    title: s.summary,
    detail: [pre, value, unit].filter(Boolean).join(' '),
  })
}
