import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sobre — Beatriz Torres Arquitetura',
  description:
    'Conheça a trajetória e a filosofia de Beatriz Torres. Arquitetura residencial com escuta, intenção e equilíbrio.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
