// Instagram posts, one per service, rendered at /social/[slug] and exported to PNG with
// `npm run social:export`. Prices come from the service data so the posts never disagree with
// the site.
//
// Format: 1080×1350 (4:5), the tallest feed post. The profile grid shows a 3:4 crop of it
// (about 34 px cut on each side), so keep content at least 64 px from the left and right edges.

import { services, type ServiceSlug } from './services'
import { support } from './support'
import { SITE_DOMAIN } from '@/lib/site'

export const POST_SIZE = { width: 1080, height: 1350 } as const

export type SocialPost = {
  slug: ServiceSlug
  /** Title in two lines; the second line is set in italic terracotta. */
  title: [string, string]
  /** Chip on the photo. */
  tag: string
  /** Unsplash photo id (the service's hero photo). */
  image: string
  imageAlt: string
  /** `note` is a small line under the price; `highlight` replaces it with a large figure. */
  price: { pre?: string; value: string; unit: string; note?: string; highlight?: { label: string; value: string } }
  features: string[]
  cta: string
}

const s = services

export const socialPosts: SocialPost[] = [
  {
    slug: 'consultoria',
    title: ['Consultoria de', 'interiores'],
    tag: 'Online · por ambiente',
    image: s.consultoria.hero.image,
    imageAlt: s.consultoria.hero.imageAlt,
    price: { pre: 'A partir de', value: s.consultoria.price.value, unit: 'por ambiente', note: 'Quarto R$ 450 · Cozinha R$ 600' },
    features: ['Briefing por vídeo', 'Moodboard, cores e materiais', 'Planta com a posição dos móveis', 'Lista de compras com links'],
    cta: 'Chame no WhatsApp e comece pelo seu ambiente',
  },
  {
    slug: 'projeto-por-ambiente',
    title: ['Projeto por', 'ambiente'],
    tag: 'Com imagens 3D',
    image: s['projeto-por-ambiente'].hero.image,
    imageAlt: s['projeto-por-ambiente'].hero.imageAlt,
    price: { value: s['projeto-por-ambiente'].price.value, unit: 'por m²', note: 'Mínimo de R$ 1.500 por projeto' },
    features: ['Imagens 3D realistas', 'Marcenaria e bancadas detalhadas', 'Iluminação e revestimentos', `Suporte à obra por ${support.questionsDays} dias`],
    cta: 'Chame no WhatsApp e mande a planta do cômodo',
  },
  {
    slug: 'apartamento-completo',
    title: ['Apartamento', 'completo'],
    tag: 'Todos os ambientes',
    image: s['apartamento-completo'].hero.image,
    imageAlt: s['apartamento-completo'].hero.imageAlt,
    price: {
      pre: '10x de',
      value: s['apartamento-completo'].price.value,
      unit: 'pelo apartamento inteiro',
      highlight: { label: 'Para apês de até', value: '60 m²' },
    },
    features: ['Um conceito só, do início ao fim', 'Até 10 imagens 3D', 'Pronto antes das chaves', 'Memorial e caderno técnico'],
    cta: 'Chame no WhatsApp e mande a planta do apê',
  },
]

export const SOCIAL_HANDLE = SITE_DOMAIN

export const findPost = (slug: string) => socialPosts.find((p) => p.slug === slug)
