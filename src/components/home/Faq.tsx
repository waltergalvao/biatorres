import { Plus } from 'lucide-react'
import { waLink } from '@/lib/site'

const faqs = [
  {
    q: 'Funciona mesmo online?',
    a: 'Sim. Você manda a planta, fotos e medidas, fazemos o briefing por chamada de vídeo e recebe tudo em PDF. Por isso a cidade onde você mora não faz diferença. A vistoria é o único serviço presencial.',
  },
  {
    q: 'Posso começar só com a consultoria?',
    a: 'Pode, e é o caminho mais comum para quem está em dúvida. A consultoria resolve um ambiente a partir de R$ 450. Se depois você quiser 3D e detalhamento para obra, contrata o projeto do ambiente ou do apartamento.',
  },
  {
    q: 'O que não está incluso?',
    a: 'Nenhum serviço inclui execução, gerenciamento ou acompanhamento de obra, compras e visitas técnicas. Projetos estruturais e complementares de engenharia também são contratados à parte.',
  },
  {
    q: 'Como é o pagamento?',
    // TODO(owner): confirm payment terms (entrada + parcelas? Pix? cartão?) and state them here.
    a: 'As condições de pagamento vêm por escrito na proposta, junto com o valor fechado, antes de qualquer trabalho começar.',
  },
  {
    q: 'Meu ambiente é maior que a área da tabela. Quanto fica?',
    a: 'O projeto por ambiente custa R$ 250/m², com mínimo de R$ 1.500 por contratação. O valor final depende da complexidade e do escopo, e você recebe o número fechado antes de começar.',
  },
  {
    q: 'E se o apartamento tiver mais de 60 m² ou outra planta?',
    a: 'O pacote de R$ 15.000 cobre até 60 m² com sala e jantar, cozinha, lavanderia, suíte, segundo quarto e banheiro social. Outras configurações e ambientes extras são orçados à parte.',
  },
  {
    q: 'Quantas alterações posso pedir?',
    a: 'No projeto por ambiente há uma rodada consolidada de alterações por etapa. Você junta os comentários e eu ajusto tudo de uma vez.',
  },
]

export function Faq() {
  return (
    <section aria-labelledby="faq-title" className="section-y bg-sand">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <p className="eyebrow">Perguntas frequentes</p>
          <h2 id="faq-title" className="mt-4 font-display text-display text-ink">
            Dúvidas antes de contratar
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-ink-soft">
            Não achou a sua pergunta? Mande pelo WhatsApp.
          </p>
          <a
            href={waLink('Olá, Beatriz! Tenho uma dúvida antes de contratar: ')}
            target="_blank"
            rel="noopener noreferrer"
            className="link-draw mt-3 text-[16px] !text-clay"
          >
            Enviar uma pergunta
          </a>
        </div>

        <div className="lg:col-span-8">
          <ul className="border-t border-ink/20">
            {faqs.map((f) => (
              <li key={f.q} className="border-b border-ink/20">
                <details className="group">
                  <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-[20px] leading-snug text-ink transition-colors hover:text-clay md:text-[22px] [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <Plus
                      size={22}
                      aria-hidden
                      className="shrink-0 text-clay transition-transform duration-300 group-open:rotate-45"
                    />
                  </summary>
                  <p className="max-w-2xl pb-6 text-[16px] leading-relaxed text-ink-soft">{f.a}</p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
