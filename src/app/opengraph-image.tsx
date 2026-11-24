import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard, unsplashPhoto } from '@/lib/og'
import { homeHero } from '@/data/home'

// Home share image, and the fallback for every route without its own: the hero's photo and
// headline (src/components/home/Hero.tsx).
export const alt = 'Beatriz Torres Arquitetura: projeto de interiores para apartamentos pequenos'
export const runtime = 'edge'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default async function Image() {
  return renderOgCard({
    label: homeHero.eyebrow,
    title: homeHero.title,
    accent: homeHero.accent,
    photo: { data: await unsplashPhoto(homeHero.image) },
  })
}
