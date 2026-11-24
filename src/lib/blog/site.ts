// Blog-wide constants: names, paths and the author. Shared by pages, JSON-LD, RSS and the
// Markdown versions, so every surface describes the blog and its author the same way.

import { aboutSummary } from '@/data/about'
import { SITE_URL, WHATSAPP_DISPLAY } from '@/lib/site'

export const BLOG_PATH = '/blog'
export const RSS_PATH = '/blog/rss.xml'
export const BLOG_TITLE = 'Blog da Beatriz Torres Arquitetura'
/** 140 to 160 characters: meta description of /blog and the RSS channel description. */
export const BLOG_DESCRIPTION =
  'Artigos da arquiteta Beatriz Torres sobre apartamentos pequenos e studios: layout, móveis na escala certa, marcenaria e o que decidir antes de comprar.'

/** @id of the Blog entity (JSON-LD). Articles point at it with isPartOf. */
export const BLOG_ID = `${SITE_URL}/blog#blog`

/** The author of every post. The Person entity itself is site-wide (src/lib/schema.ts). */
export const AUTHOR = {
  name: 'Beatriz Torres',
  /** Same as the Person's jobTitle in src/lib/schema.ts. */
  role: 'Arquiteta de interiores',
  /** Profile page. Article bylines link here with rel="author". */
  path: '/sobre',
  avatar: '/images/beatriz-avatar.jpg',
  /** "Quem escreve" box at the end of each article (and in the Markdown version). */
  bio: aboutSummary,
} as const

export const CONTACT_LINE = `WhatsApp ${WHATSAPP_DISPLAY}`

/** Prefilled WhatsApp message for the CTAs on an article page. */
export const articleMessage = (title: string) =>
  `Olá, Beatriz! Li o artigo "${title}" no blog e quero conversar sobre o meu apartamento. Ele tem (m²):`

export const BLOG_MESSAGE = 'Olá, Beatriz! Vim pelo blog e quero saber qual serviço faz sentido para o meu apartamento. Ele tem (m²):'
