'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AnimateOnScroll, StaggerContainer, StaggerItem } from '@/components/AnimateOnScroll'

const philosophy = [
  {
    title: 'Escuta',
    text: 'Todo projeto começa no diálogo. Entender quem você é, como vive e o que sonha é o primeiro passo para criar um espaço autêntico.',
  },
  {
    title: 'Intenção',
    text: 'Cada escolha — do layout ao acabamento — é feita com propósito. Nada é aleatório, tudo é pensado para fazer sentido no conjunto.',
  },
  {
    title: 'Equilíbrio',
    text: 'A verdadeira sofisticação está no equilíbrio entre o belo e o funcional, entre o atemporal e o contemporâneo.',
  },
]

export default function SobrePage() {
  return (
    <>
      <section className="section-padding pt-36 md:pt-44 pb-24 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <AnimateOnScroll>
              <span className="text-label mb-6 block">Sobre</span>
              <h1 className="font-serif text-display-xl text-brand-text mb-10">
                Beatriz Torres
              </h1>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.2}>
              <div className="space-y-6 text-brand-text-muted leading-relaxed">
                <p className="text-lg">
                  Arquiteta e designer de interiores, Beatriz Torres atua há mais de
                  uma década transformando espaços residenciais em reflexos autênticos
                  de quem os habita.
                </p>
                <p>
                  Formada pela Faculdade de Arquitetura e Urbanismo da Universidade de
                  São Paulo (FAU-USP), com especialização em design de interiores, Beatriz
                  construiu sua carreira sobre a convicção de que a arquitetura deve servir
                  à vida — e não o contrário.
                </p>
                <p>
                  Sua abordagem nasce da escuta atenta. Antes de desenhar qualquer linha,
                  ela busca compreender profundamente o estilo de vida, os rituais
                  cotidianos e os sonhos de cada cliente. É dessa imersão que surgem
                  projetos com alma, onde cada ambiente conta uma história e cada detalhe
                  tem um porquê.
                </p>
                <p>
                  Ao longo de sua trajetória, desenvolveu projetos em São Paulo, litoral
                  paulista e interior, sempre com a mesma dedicação: entregar espaços que
                  emocionam pela beleza e surpreendem pela funcionalidade.
                </p>
              </div>
            </AnimateOnScroll>
          </div>

          <AnimateOnScroll
            variant="fadeRight"
            className="lg:col-span-5 order-1 lg:order-2"
          >
            <div className="relative aspect-[3/4] overflow-hidden lg:mt-16">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2"
                alt="Beatriz Torres — Arquiteta e Designer de Interiores"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="divider section-padding" />

      <section className="section-padding section-spacing">
        <AnimateOnScroll className="mb-16 md:mb-24 max-w-2xl">
          <span className="text-label mb-4 block">Filosofia</span>
          <h2 className="font-serif text-display">
            O que orienta cada projeto
          </h2>
        </AnimateOnScroll>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
          {philosophy.map((item) => (
            <StaggerItem key={item.title}>
              <div className="divider-accent mb-6" />
              <h3 className="font-serif text-heading mb-4">{item.title}</h3>
              <p className="text-sm text-brand-text-muted leading-relaxed">
                {item.text}
              </p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      <section className="section-padding pb-32 md:pb-40 bg-brand-bg-light">
        <div className="section-spacing">
          <AnimateOnScroll>
            <blockquote className="font-serif text-display text-center max-w-3xl mx-auto text-balance">
              &ldquo;A arquitetura que me move é aquela que acolhe, que respeita
              quem a vive, e que envelhece com graça.&rdquo;
            </blockquote>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.2}>
            <p className="text-center text-label mt-8">Beatriz Torres</p>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.3} className="flex justify-center mt-12">
            <Link href="/contato" className="btn-primary">
              Iniciar um projeto
            </Link>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  )
}
