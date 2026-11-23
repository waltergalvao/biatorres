import type { Metadata } from 'next'
import { ServiceLadder } from '@/components/sections/ServiceLadder'
import { CompareTable } from '@/components/sections/CompareTable'
import { Process } from '@/components/sections/Process'
import { Faq } from '@/components/sections/Faq'
import { FinalCta } from '@/components/sections/FinalCta'
import { PRIMARY_CTA } from '@/lib/site'
import { generalFaq, generalProcess } from '@/data/general'

export const metadata: Metadata = {
  title: 'Serviços e valores | Beatriz Torres Arquitetura',
  description:
    'Consultoria de interiores a partir de R$ 450 por ambiente, projeto por ambiente com 3D a R$ 250/m² e apartamento completo até 60 m² por R$ 15.000.',
  alternates: { canonical: '/servicos' },
}

export default function ServicosPage() {
  return (
    <>
      <section aria-labelledby="servicos-title" className="pb-16 pt-12 md:pb-24 md:pt-20" data-placement="servicos">
        <div className="container-site">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow">Serviços e valores</p>
              <h1 id="servicos-title" className="mt-4 font-display text-display-xl text-ink">
                Um degrau de cada vez
              </h1>
            </div>
            <p className="lede lg:col-span-5">
              Comece pela consultoria de um ambiente. Se fizer sentido, siga para o projeto do ambiente
              ou do apartamento inteiro. Os valores estão aqui, sem precisar pedir orçamento para descobrir.
            </p>
          </div>

          <div className="mt-14 lg:mt-20">
            <ServiceLadder />
          </div>
          <p className="mt-8 text-center text-[14px] text-ink-soft">
            Nenhum serviço inclui execução, gestão de obra ou compras. Projetos de engenharia são contratados à parte.
          </p>
        </div>
      </section>

      <section aria-labelledby="compare-title" className="pb-20 md:pb-28">
        <div className="container-site">
          <CompareTable />
        </div>
      </section>

      <Process title="Do WhatsApp ao projeto, em quatro etapas online" steps={generalProcess} />
      <Faq items={generalFaq} />
      <FinalCta
        title="Ainda em dúvida sobre qual escolher?"
        text="Conte o que quer mudar e a metragem. Eu indico o serviço certo e mando o valor fechado."
        ctaLabel={PRIMARY_CTA.label}
      />
    </>
  )
}
