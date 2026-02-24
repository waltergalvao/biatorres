import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projetos — Beatriz Torres Arquitetura',
  description:
    'Conheça nosso portfólio de projetos residenciais e ambientes planejados. Salas, cozinhas, quartos e muito mais.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
