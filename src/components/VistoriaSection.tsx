"use client";

import Link from "next/link";
import {
  AnimateOnScroll,
  StaggerContainer,
  StaggerItem,
} from "./AnimateOnScroll";

const audiences = [
  {
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 3L3 14H7V27H13V20H19V27H25V14H29L16 3Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M13 20H19" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: "Novos Proprietários",
    description:
      "Vai se mudar para um imóvel novo ou recém-adquirido? A vistoria técnica identifica pendências, vícios construtivos e itens fora de conformidade antes mesmo da sua mudança — protegendo seu investimento desde o primeiro dia.",
  },
  {
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="4"
          y="6"
          width="24"
          height="20"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path d="M4 12H28" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M10 6V3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M22 6V3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M12 18L15 21L21 15"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Imóveis de Aluguel",
    description:
      "Para proprietários que desejam documentar o estado do imóvel na entrada e saída de inquilinos. Um laudo técnico detalhado que traz segurança jurídica e evita conflitos sobre o estado de conservação.",
  },
];

const benefits = [
  "Laudo técnico com registro fotográfico completo",
  "Avaliação de instalações elétricas e hidráulicas",
  "Identificação de vícios aparentes e ocultos",
  "Verificação de acabamentos e revestimentos",
  "Relatório entregue em até 48 horas",
];

export function VistoriaSection() {
  return (
    <section className="section-padding section-spacing relative">
      <div className="absolute inset-x-0 top-0 h-px bg-brand-border" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
        <div className="lg:col-span-5">
          <AnimateOnScroll>
            <span className="text-label mb-4 block">Serviço Especializado</span>
            <h2 className="font-serif text-display mb-6">
              Vistoria de Imóveis
            </h2>
            <p className="text-lg text-brand-text-muted leading-relaxed mb-8">
              Além dos projetos de arquitetura e interiores, oferecemos um
              serviço completo de vistoria técnica — um olhar profissional e
              minucioso sobre cada detalhe do seu imóvel.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.2}>
            <div className="space-y-3 mb-10">
              {benefits.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-accent flex-shrink-0" />
                  <span className="text-md text-brand-text-muted leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.35}>
            <Link href="/contato" className="btn-outline">
              Solicitar vistoria
            </Link>
          </AnimateOnScroll>
        </div>

        <div className="lg:col-span-7">
          <StaggerContainer className="space-y-8" staggerDelay={0.15}>
            {audiences.map((item) => (
              <StaggerItem key={item.title}>
                <div className="group border border-brand-border-light p-8 md:p-10 transition-colors duration-500 hover:border-brand-border hover:bg-brand-bg-light">
                  <div className="flex items-start gap-6">
                    <div className="text-brand-text-muted group-hover:text-brand-accent transition-colors duration-500 flex-shrink-0 mt-1">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-serif text-heading mb-3">
                        {item.title}
                      </h3>
                      <p className="text-md text-brand-text-muted leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-brand-border" />
    </section>
  );
}
