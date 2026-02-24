'use client'

import Link from 'next/link'
import { AnimateOnScroll } from './AnimateOnScroll'

export function CTASection() {
  return (
    <section className="section-padding py-32 md:py-44">
      <div className="max-w-3xl mx-auto text-center">
        <AnimateOnScroll>
          <div className="divider mx-auto max-w-xs mb-16" />
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.15}>
          <h2 className="font-serif text-display-xl text-brand-text mb-8">
            Vamos transformar
            <br />
            seu espaço?
          </h2>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.3}>
          <p className="text-brand-text-muted text-lg leading-relaxed mb-12 max-w-md mx-auto">
            Entre em contato e conte-nos sobre o seu projeto.
            Será um prazer criar algo especial para você.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.45}>
          <Link href="/contato" className="btn-primary">
            Entre em contato
          </Link>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.55}>
          <div className="divider mx-auto max-w-xs mt-16" />
        </AnimateOnScroll>
      </div>
    </section>
  )
}
