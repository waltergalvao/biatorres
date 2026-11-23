import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionHeader } from '../sections/SectionHeader'
import { ServiceLadder } from '../sections/ServiceLadder'

/** The services, without prices: each card leads to its own page, where the prices are. */
export function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-title" className="section-y">
      <div className="container-site">
        <SectionHeader
          id="servicos-title"
          eyebrow="Serviços"
          title="Do primeiro ambiente ao apartamento inteiro"
          lede="Comece pequeno, com a consultoria de um ambiente, ou resolva tudo de uma vez. Cada serviço tem uma página com o que está incluso e quanto custa."
        />
        <div className="mt-14 lg:mt-20">
          <ServiceLadder showPrices={false} />
        </div>
        <p className="mt-8 text-center">
          <Link href="/servicos" className="link-draw text-[15px]">
            Comparar os serviços lado a lado <ArrowRight size={15} aria-hidden />
          </Link>
        </p>
      </div>
    </section>
  )
}
