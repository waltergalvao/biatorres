// Blog categories. The key is the slug used in an article's `category` field and in the URL
// /blog/categoria/<slug>. The description is the category page's meta description, so write
// it for someone reading a Google result (140 to 160 characters).
//
// A category page only exists once at least one article uses it (unused ones are 404).

import { getAllArticles } from './articles'

export interface Category {
  slug: string
  label: string
  description: string
}

const CATEGORY_LIST = [
  {
    slug: 'como-funciona',
    label: 'Como funciona o projeto',
    description:
      'O que cada serviço de interiores inclui, como funciona o projeto online e como escolher entre consultoria, projeto por ambiente e apartamento completo.',
  },
  {
    slug: 'apartamento-pequeno',
    label: 'Apartamento pequeno',
    description:
      'Layout, móveis na escala certa, circulação e armazenamento para apartamentos de até 60 m², explicados por uma arquiteta que só projeta espaços compactos.',
  },
  {
    slug: 'studios',
    label: 'Studios',
    description:
      'Como dormir, trabalhar, cozinhar e receber no mesmo ambiente: marcenaria sob medida, divisões e escolhas que fazem um studio de 25 ou 30 m² funcionar.',
  },
  {
    slug: 'imovel-para-alugar',
    label: 'Imóvel para alugar',
    description:
      'Projeto de interiores para quem compra para alugar: acabamentos que aguentam a troca de inquilinos, layout para temporada ou contrato longo e fotos do anúncio.',
  },
  {
    slug: 'reforma-e-obra',
    label: 'Reforma e obra',
    description:
      'Marcenaria, bancadas, elétrica e caderno técnico: o que decidir antes de reformar um apartamento pequeno para a obra seguir o projeto e não o improviso.',
  },
] as const satisfies readonly Category[]

export type CategorySlug = (typeof CATEGORY_LIST)[number]['slug']

/** Every category defined above, used or not. */
export const CATEGORIES: readonly Category[] = CATEGORY_LIST

export const categoryPath = (slug: string) => `/blog/categoria/${slug}`

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug)
}

export const isCategory = (slug: string): slug is CategorySlug => CATEGORIES.some((c) => c.slug === slug)

/**
 * Categories that have at least one published article, in the order defined above. These are
 * the category pages that exist (for the sitemap, the blog navigation and static params).
 */
export async function getCategories(): Promise<(Category & { path: string })[]> {
  const used = new Set((await getAllArticles()).map((a) => a.category))
  return CATEGORIES.filter((c) => used.has(c.slug)).map((c) => ({ ...c, path: categoryPath(c.slug) }))
}
