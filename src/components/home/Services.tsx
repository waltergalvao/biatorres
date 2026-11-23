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
          <ServiceLadder />
        </div>
      </div>
    </section>
  )
}
