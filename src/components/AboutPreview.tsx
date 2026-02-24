'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AnimateOnScroll } from './AnimateOnScroll'

export function AboutPreview() {
  return (
    <section className="section-padding section-spacing bg-brand-bg-light overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <AnimateOnScroll variant="fadeLeft" className="lg:col-span-5">
          <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2"
              alt="Beatriz Torres — Arquiteta"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
        </AnimateOnScroll>

        <div className="lg:col-span-7 lg:pl-8">
          <AnimateOnScroll>
            <span className="text-label mb-6 block">Sobre</span>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.15}>
            <blockquote className="font-serif text-display-sm text-brand-text leading-snug mb-8">
              &ldquo;Acredito que a arquitetura deve ser vivida, não apenas admirada.&rdquo;
            </blockquote>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.3}>
            <p className="text-brand-text-muted leading-relaxed mb-4">
              Com mais de uma década de experiência em projetos residenciais e ambientes
              planejados, Beatriz Torres cria espaços que traduzem personalidade em
              arquitetura. Cada projeto nasce de uma escuta atenta e se materializa em
              ambientes que inspiram e acolhem.
            </p>
            <p className="text-brand-text-muted leading-relaxed mb-8">
              Sua abordagem une sensibilidade estética a uma execução rigorosa, buscando
              sempre o equilíbrio entre o belo e o funcional.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.45}>
            <div className="flex items-center gap-6">
              <Link href="/sobre" className="btn-outline">
                Conhecer mais
              </Link>
              <div className="divider-accent" />
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
