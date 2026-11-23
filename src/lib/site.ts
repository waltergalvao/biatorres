// Shared site data: contact, navigation and the public price list.
// Prices come from the owner's strategy document — change them here only.

import { audienceHref, audienceOrder, audiences } from '@/data/audiences'

/** The site's domain: metadata, sitemap, robots, e-mail and the Instagram posts read it from here. */
export const SITE_DOMAIN = 'beatriztorres.com.br'
export const SITE_URL = `https://${SITE_DOMAIN}`

export const WHATSAPP_NUMBER = '5511999999999'
export const WHATSAPP_DISPLAY = '+55 (11) 99999-9999'
// TODO(owner): confirm this mailbox exists on the domain.
export const EMAIL = `contato@${SITE_DOMAIN}`

export const DEFAULT_MESSAGE =
  'Olá, Beatriz! Vim pelo site e quero saber qual serviço faz sentido para o meu apartamento. Ele tem (m²):'

export function waLink(message = DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export const PRIMARY_CTA = {
  // The price is public, so the generic action is a conversation, not a quote request.
  label: 'Falar com a Beatriz',
  href: waLink(),
}

/** Internal routes that render artwork (Instagram posts) without the site's header and footer. */
export const isArtboardRoute = (pathname: string) => pathname === '/social' || pathname.startsWith('/social/')

export const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`

export type NavLink = { href: string; label: string; description?: string; meta?: string }

export const serviceLinks: NavLink[] = [
  {
    href: '/servicos/consultoria',
    label: 'Consultoria de interiores',
    description: 'Um ambiente resolvido online, com moodboard e lista de compras.',
    meta: 'Online',
  },
  {
    href: '/servicos/projeto-por-ambiente',
    label: 'Projeto por ambiente',
    description: 'Imagens 3D, marcenaria e caderno técnico para a obra.',
    meta: 'Com 3D',
  },
  {
    href: '/servicos/apartamento-completo',
    label: 'Apartamento completo',
    description: 'O apartamento inteiro em um projeto só, até 60 m².',
    meta: 'Até 60 m²',
  },
]

export const audienceLinks: NavLink[] = audienceOrder.map((slug) => ({
  href: audienceHref(slug),
  label: audiences[slug].card.kicker,
  description: audiences[slug].card.menu,
}))

export const pageLinks: NavLink[] = [
  { href: '/sobre', label: 'Sobre' },
  { href: '/contato', label: 'Contato' },
]

export type RoomPrice = { room: string; area?: string; price: string }

export const consultoriaPrices: RoomPrice[] = [
  { room: 'Quarto', price: 'R$ 450' },
  { room: 'Sala de estar', price: 'R$ 500' },
  { room: 'Banheiro', price: 'R$ 550' },
  { room: 'Cozinha', price: 'R$ 600' },
  { room: 'Sala integrada', price: 'R$ 650' },
  { room: 'Sala + cozinha', price: 'R$ 750' },
]

export const projetoPrices: RoomPrice[] = [
  { room: 'Quarto', area: 'até 15 m²', price: 'R$ 3.750' },
  { room: 'Sala de estar', area: 'até 20 m²', price: 'R$ 5.000' },
  { room: 'Banheiro', area: 'até 6 m²', price: 'R$ 1.500' },
  { room: 'Cozinha', area: 'até 12 m²', price: 'R$ 3.000' },
  { room: 'Sala integrada', area: 'até 25 m²', price: 'R$ 6.250' },
  { room: 'Sala + cozinha', area: 'até 30 m²', price: 'R$ 7.500' },
]
