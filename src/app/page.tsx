import { Hero } from '@/components/home/Hero'
import { About } from '@/components/home/About'
import { Services } from '@/components/home/Services'
import { Interlude } from '@/components/home/Interlude'
import { Deliverables } from '@/components/home/Deliverables'
import { Audiences } from '@/components/home/Audiences'
import { Process } from '@/components/sections/Process'
import { Gallery } from '@/components/sections/Gallery'
import { Testimonials } from '@/components/sections/Testimonials'
import { Faq } from '@/components/sections/Faq'
import { FinalCta } from '@/components/sections/FinalCta'
import { generalFaq, generalProcess } from '@/data/general'
import { testimonials } from '@/data/testimonials'
import { PRIMARY_CTA } from '@/lib/site'

// The home presents the studio and sends visitors to a service page. Prices live on the
// service pages (and /servicos), which are also the Google Ads landing pages.
const homeQuotes = [testimonials[0], testimonials[2], testimonials[4]]

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Interlude />
      <Deliverables />
      <Audiences />
      <Process title="Do WhatsApp ao projeto, em quatro etapas online" steps={generalProcess} />
      <Gallery />
      <Testimonials items={homeQuotes} />
      <Faq items={generalFaq} />
      <FinalCta
        eyebrow="Vamos conversar"
        title="Conte o que você quer mudar na sua casa"
        text="Mande uma mensagem com o ambiente ou a metragem do apartamento. Eu indico o serviço certo e respondo com o valor fechado."
        ctaLabel={PRIMARY_CTA.label}
        secondary={{ href: '/servicos', label: 'Ver serviços e valores' }}
      />
    </>
  )
}
