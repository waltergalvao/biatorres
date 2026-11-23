'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimateOnScroll } from '@/components/AnimateOnScroll'
import { projects, categories } from '@/data/projects'

export default function ProjetosPage() {
  const [active, setActive] = useState('todos')

  const filtered =
    active === 'todos'
      ? projects
      : projects.filter((p) => p.category === active)

  return (
    <>
      <section className="container-site pt-12 md:pt-20 pb-16 md:pb-20">
        <AnimateOnScroll>
          <span className="eyebrow mb-4 block">Portfólio</span>
          <h1 className="font-display text-display-xl text-ink">Projetos</h1>
          <p className="mt-6 text-ink-soft text-lg max-w-lg leading-relaxed">
            Uma seleção dos nossos trabalhos mais recentes em arquitetura
            residencial e ambientes planejados.
          </p>
        </AnimateOnScroll>
      </section>

      <section className="container-site pb-8">
        <AnimateOnScroll delay={0.2}>
          <div className="flex flex-wrap gap-3 md:gap-4">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActive(cat.value)}
                className={`min-h-[40px] rounded-full px-5 py-2 text-[12px] tracking-[0.1em] uppercase font-sans transition-all duration-300 ${
                  active === cat.value
                    ? 'bg-ink text-linen'
                    : 'bg-transparent text-ink-soft border border-line hover:border-ink hover:text-ink'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </AnimateOnScroll>
      </section>

      <section className="container-site pb-32 md:pb-40">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="group cursor-pointer">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-elegant group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/15 transition-colors duration-700" />
                  </div>

                  <div className="mt-4 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-lg text-ink leading-tight">
                        {project.title}
                      </h3>
                      <span className="text-[11px] tracking-[0.1em] text-ink-soft mt-1 block">
                        {project.categoryLabel}
                      </span>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-[11px] tracking-[0.1em] text-ink-soft block">
                        {project.year}
                      </span>
                      <span className="text-[11px] tracking-[0.05em] text-ink-soft block mt-0.5">
                        {project.location}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </>
  )
}
