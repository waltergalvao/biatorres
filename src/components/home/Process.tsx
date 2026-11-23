import { PRIMARY_CTA } from '@/lib/site'

const steps = [
  {
    title: 'Conversa e orçamento',
    text: 'Você conta pelo WhatsApp o que quer mudar. Eu indico o serviço e mando o valor fechado.',
  },
  {
    title: 'Planta, fotos e medidas',
    text: 'Serve a planta da construtora e fotos feitas no celular. Com isso eu analiso o espaço.',
  },
  {
    title: 'Briefing online',
    text: 'Uma reunião por vídeo sobre sua rotina, seu estilo, seu orçamento e o que fica ou sai.',
  },
  {
    title: 'Entrega do projeto',
    text: 'Consultoria em PDF. No projeto, imagens 3D e caderno técnico, com uma rodada de ajustes por etapa.',
  },
]

export function Process() {
  return (
    <section aria-labelledby="processo-title" className="section-y">
      <div className="container-site">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">Como funciona</p>
            <h2 id="processo-title" className="mt-4 font-display text-display text-ink">
              Do WhatsApp ao projeto, em quatro etapas online
            </h2>
          </div>
          <p className="lede lg:col-span-5">
            Você não precisa estar em São Paulo nem marcar visita. Tudo acontece por mensagem,
            chamada de vídeo e arquivos.
          </p>
        </div>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-[28px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="flex flex-col bg-linen p-7 md:p-8">
              <span aria-hidden className="font-display text-[64px] font-light italic leading-none text-clay">
                {i + 1}
              </span>
              <h3 className="mt-8 font-display text-[22px] leading-tight text-ink">{s.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{s.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <a href={PRIMARY_CTA.href} target="_blank" rel="noopener noreferrer" className="btn-primary w-full sm:w-auto">
            {PRIMARY_CTA.label}
          </a>
          <p className="text-[15px] text-ink-soft">A primeira conversa serve para entender o seu caso.</p>
        </div>
      </div>
    </section>
  )
}
