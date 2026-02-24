"use client";

import {
  AnimateOnScroll,
  StaggerContainer,
  StaggerItem,
} from "./AnimateOnScroll";

const values = [
  {
    number: "01",
    title: "Design Personalizado",
    description:
      "Cada projeto é único, pensado para refletir a essência de quem habita o espaço. Ouvimos, interpretamos e criamos.",
  },
  {
    number: "02",
    title: "Beleza Funcional",
    description:
      "Unimos estética e praticidade em ambientes que fazem sentido para o seu dia a dia, sem abrir mão da sofisticação.",
  },
  {
    number: "03",
    title: "Sofisticação Natural",
    description:
      "Materiais nobres, paleta harmoniosa e atenção a cada detalhe construtivo. O luxo está na simplicidade bem executada.",
  },
];

export function ValueProposition() {
  return (
    <section className="section-padding section-spacing">
      <AnimateOnScroll className="mb-20">
        <span className="text-label">O que nos guia</span>
      </AnimateOnScroll>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
        {values.map((item) => (
          <StaggerItem key={item.number}>
            <div className="group">
              <span className="font-serif text-5xl md:text-6xl text-brand-border group-hover:text-brand-text-muted transition-colors duration-700">
                {item.number}
              </span>
              <div className="divider-accent mt-6 mb-6 group-hover:w-20 transition-all duration-700" />
              <h3 className="font-serif text-display-sm mb-4">{item.title}</h3>
              <p className="text-brand-text-muted leading-relaxed">
                {item.description}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
