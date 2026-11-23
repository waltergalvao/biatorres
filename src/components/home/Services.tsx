import { SectionHeader } from '../sections/SectionHeader'
import { ServiceLadder } from '../sections/ServiceLadder'

/** The services with their price anchor: each card leads to its own page with everything included. */
export function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-title" className="section-y">
      <div className="container-site">
        <SectionHeader
          id="servicos-title"
          eyebrow="Serviços"
          title="Qual é o seu caso?"
          lede="Escolha pelo que você vai fazer no apartamento. Na dúvida, comece pela consultoria. Os valores são públicos e cada serviço tem uma página com tudo o que está incluso."
        />
        <div className="mt-14 lg:mt-20">
          <ServiceLadder />
        </div>
      </div>
    </section>
  )
}
