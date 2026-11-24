import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og'

// Default share image. Routes that set their own openGraph (via pageMetadata) re-export it in
// their own opengraph-image.tsx, because Next.js would drop it otherwise (see /sobre, /contato).
export const alt = 'Beatriz Torres Arquitetura: projeto de interiores para apartamentos pequenos'
export const runtime = 'edge'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return renderOgImage({
    eyebrow: 'Arquitetura de interiores · online',
    title: 'Projeto de interiores para apartamentos pequenos',
    detail: 'Consultoria online a partir de R$ 450',
  })
}
