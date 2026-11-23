import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sobre a Beatriz Torres | Arquitetura de interiores para apartamentos pequenos',
  description:
    'Beatriz Torres é arquiteta de interiores dedicada a studios, primeiro imóvel e apartamentos de até 60 m². Projetos online, do briefing à entrega.',
  alternates: { canonical: '/sobre' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
