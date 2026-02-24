"use client";

import {
  StaggerContainer,
  StaggerItem,
  AnimateOnScroll,
} from "./AnimateOnScroll";

const steps = [
  {
    number: "01",
    title: "Entendimento",
    description:
      "Conhecemos você, seu estilo de vida, suas necessidades e desejos. O projeto começa na escuta.",
  },
  {
    number: "02",
    title: "Conceito",
    description:
      "Desenvolvemos a identidade visual do seu projeto — materiais, paleta, proporções e atmosfera.",
  },
  {
    number: "03",
    title: "Desenvolvimento",
    description:
      "Detalhamos cada ambiente com precisão técnica, do layout geral ao menor acabamento.",
  },
  {
    number: "04",
    title: "Entrega",
    description:
      "Acompanhamos a execução até o resultado final, garantindo que cada detalhe se concretize.",
  },
];

export function ProcessSection() {
  return (
    <section className="section-padding section-spacing">
      <AnimateOnScroll className="mb-16 md:mb-24">
        <span className="text-label mb-4 block">Metodologia</span>
        <h2 className="font-serif text-display max-w-lg">
          Como transformamos ideias em espaços
        </h2>
      </AnimateOnScroll>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        {steps.map((step, i) => (
          <StaggerItem key={step.number}>
            <div className="relative">
              <div className="hidden lg:block absolute top-0 w-full h-px bg-brand-border-light " />
              <span className="font-serif text-6xl lg:text-7xl text-brand-border-light leading-none">
                {step.number}
              </span>
              <h3 className="font-serif text-heading mt-4 mb-3">
                {step.title}
              </h3>
              <p className="text-brand-text-muted leading-relaxed">
                {step.description}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
