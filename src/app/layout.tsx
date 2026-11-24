import type { Metadata, Viewport } from 'next'
import { Fraunces, Hanken_Grotesk } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp'
import { Analytics } from '@/components/Analytics'
import { hex } from '@/design/tokens'
import { SITE_URL } from '@/lib/site'
import { JsonLd } from '@/components/JsonLd'
import { TITLE_SUFFIX } from '@/lib/metadata'
import { BUSINESS_NAME, businessSchema, graph, personSchema, websiteSchema } from '@/lib/schema'

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

const DEFAULT_TITLE = 'Projeto de interiores para apartamento pequeno | Beatriz Torres'
const DEFAULT_DESCRIPTION =
  'Projeto de interiores online para apartamento pequeno e studio: consultoria desde R$ 450 por ambiente, projeto com 3D a R$ 250/m² e apê até 60 m² em 10x.'

// Defaults for every page. Each page sets its own title, description and canonical with
// pageMetadata() (src/lib/metadata.ts); there is no default canonical on purpose, because a
// canonical set here would point every page at the home page.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: DEFAULT_TITLE, template: `%s${TITLE_SUFFIX}` },
  description: DEFAULT_DESCRIPTION,
  applicationName: BUSINESS_NAME,
  authors: [{ name: 'Beatriz Torres', url: '/sobre' }],
  creator: 'Beatriz Torres',
  publisher: BUSINESS_NAME,
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    siteName: BUSINESS_NAME,
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  // Phone numbers and e-mails are already links where they appear; no automatic detection.
  formatDetection: { telephone: false, email: false, address: false },
}

export const viewport: Viewport = {
  themeColor: hex.linen,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${hanken.variable}`}>
      <body className="min-h-screen overflow-x-clip">
        {/* The business, the website and Beatriz, on every page; pages refer to them by @id. */}
        <JsonLd data={graph(businessSchema(), websiteSchema(), personSchema())} />
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
