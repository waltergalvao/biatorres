'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="section-padding w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 pt-32 pb-20 lg:pt-0 lg:pb-0">
        <div className="lg:col-span-5 flex flex-col justify-center lg:py-32 z-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-label mb-8"
          >
            Arquitetura &amp; Design de Interiores
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-serif text-display-xl text-brand-text text-balance"
          >
            Arquitetura pensada para viver bem.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-8 text-brand-text-muted text-base md:text-lg leading-relaxed max-w-md"
          >
            Projetos residenciais e ambientes planejados com sofisticação,
            personalidade e atenção a cada detalhe.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-12"
          >
            <Link href="/projetos" className="btn-primary">
              Conhecer Projetos
            </Link>
          </motion.div>
        </div>

        <div className="lg:col-span-1 hidden lg:flex items-center justify-center">
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-px h-64 bg-brand-border origin-top"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.0, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="lg:col-span-6 relative"
        >
          <div className="relative aspect-[4/5] lg:aspect-auto lg:h-screen lg:-mr-20 xl:-mr-28 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
              alt="Interior elegante projetado por Beatriz Torres Arquitetura"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
            <div className="absolute inset-0 bg-brand-bg/10" />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-brand-text-muted">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-px h-8 bg-brand-border"
        />
      </motion.div>
    </section>
  )
}
