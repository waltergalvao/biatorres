import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contato — Beatriz Torres Arquitetura',
  description:
    'Entre em contato para conversar sobre o seu projeto. Arquitetura residencial e ambientes planejados sob medida.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
