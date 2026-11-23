import type { Metadata, Viewport } from 'next'
import { Fraunces, Hanken_Grotesk } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp'
import { Analytics } from '@/components/Analytics'

const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  // WONK is always 0 in globals.css, so it isn't downloaded. opsz stays: it shapes the headlines.
  axes: ['SOFT', 'opsz'],
  variable: '--font-fraunces',
  display: 'swap',
})

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://biatorres.arq.br'),
  title: 'Beatriz Torres Arquitetura — Projeto de interiores para apartamentos pequenos',
  description:
    'Consultoria de interiores online a partir de R$ 450 por ambiente, projeto completo por ambiente com imagens 3D e projeto do apartamento inteiro até 60 m² em 10x de R$ 1.500.',
  keywords: [
    'projeto de interiores',
    'consultoria de interiores online',
    'apartamento pequeno',
    'studio para alugar',
    'primeiro apartamento',
    'arquitetura São Paulo',
  ],
  openGraph: {
    title: 'Beatriz Torres Arquitetura',
    description:
      'Projeto de interiores para apartamentos pequenos. Consultoria online a partir de R$ 450 por ambiente.',
    locale: 'pt_BR',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#F4EDE3',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${hanken.variable}`}>
      <body className="min-h-screen overflow-x-clip">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-linen"
        >
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <Analytics />
      </body>
    </html>
  )
}
