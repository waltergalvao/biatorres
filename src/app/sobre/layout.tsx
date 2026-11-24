import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata({
  title: 'Sobre Beatriz Torres, arquiteta de apartamentos pequenos',
  absoluteTitle: true,
  description:
    'Beatriz Torres é arquiteta de interiores para studios, primeiro imóvel e apartamentos de até 60 m². Projetos online para todo o Brasil, do briefing à entrega.',
  path: '/sobre',
  type: 'profile',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
