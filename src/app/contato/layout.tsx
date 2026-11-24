import type { Metadata } from 'next'
import { JsonLd } from '@/components/JsonLd'
import { pageMetadata } from '@/lib/metadata'
import { SCHEMA_IDS, breadcrumbSchema, graph, webPageSchema } from '@/lib/schema'

const description =
  'Fale com a Beatriz pelo WhatsApp ou por e-mail. Mande o ambiente ou a metragem do apartamento e receba o serviço indicado e o valor fechado antes de começar.'

export const metadata: Metadata = pageMetadata({
  title: 'Contato e orçamento pelo WhatsApp',
  description,
  path: '/contato',
})

// The page is a client component, so its structured data lives here.
const jsonLd = graph(
  webPageSchema('/contato', {
    type: 'ContactPage',
    name: 'Contato',
    description,
    about: { '@id': SCHEMA_IDS.business },
  }),
  breadcrumbSchema('/contato', [{ name: 'Contato', path: '/contato' }]),
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={jsonLd} />
      {children}
    </>
  )
}
