// Shared site data: contact, navigation and the public price list.
// Prices come from the owner's strategy document — change them here only.

import { audienceHref, audienceOrder, audiences } from '@/data/audiences'

export const WHATSAPP_NUMBER = '5511999999999'
export const WHATSAPP_DISPLAY = '+55 (11) 99999-9999'
export const EMAIL = 'contato@beatriztorres.arq.br'

export function waLink(message = 'Olá, Beatriz! Vi o site e quero pedir um orçamento.') {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export const PRIMARY_CTA = {
  label: 'Pedir orçamento',
  href: waLink(),
}

export const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`

export type NavLink = { href: string; label: string; description?: string; meta?: string }

export const serviceLinks: NavLink[] = [
  {
    href: '/servicos/consultoria',
    label: 'Consultoria de interiores',
    description: 'Um ambiente resolvido online, com moodboard e lista de compras.',
    meta: 'a partir de R$ 450',
  },
  {
    href: '/servicos/projeto-por-ambiente',
    label: 'Projeto por ambiente',
    description: 'Imagens 3D, marcenaria e caderno técnico para a obra.',
    meta: 'R$ 250/m²',
  },
  {
    href: '/servicos/apartamento-completo',
    label: 'Apartamento completo',
    description: 'O apartamento inteiro em um projeto só, até 60 m².',
    meta: 'R$ 15.000',
  },
]

export const audienceLinks: NavLink[] = audienceOrder.map((slug) => ({
  href: audienceHref(slug),
  label: audiences[slug].card.kicker,
  description: audiences[slug].card.menu,
}))

export const pageLinks: NavLink[] = [
  { href: '/projetos', label: 'Projetos' },
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
