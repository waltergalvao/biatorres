'use client'

import { useState, type FormEvent } from 'react'
import { AnimateOnScroll } from '@/components/AnimateOnScroll'
import { motion } from 'framer-motion'

export default function ContatoPage() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <section className="section-padding pt-36 md:pt-44 pb-24 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-5">
            <AnimateOnScroll>
              <span className="text-label mb-6 block">Contato</span>
              <h1 className="font-serif text-display-xl text-brand-text mb-8">
                Vamos conversar
              </h1>
              <p className="text-brand-text-muted leading-relaxed mb-12">
                Conte-nos sobre o seu projeto. Teremos prazer em entender suas
                necessidades e propor soluções que traduzam seu estilo de vida
                em arquitetura.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.2}>
              <div className="space-y-8">
                <div>
                  <h3 className="text-label mb-3">E-mail</h3>
                  <a
                    href="mailto:contato@beatriztorres.arq.br"
                    className="text-brand-text hover:text-brand-text-light transition-colors duration-300"
                  >
                    contato@beatriztorres.arq.br
                  </a>
                </div>

                <div>
                  <h3 className="text-label mb-3">WhatsApp</h3>
                  <a
                    href="https://wa.me/5511999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-text hover:text-brand-text-light transition-colors duration-300"
                  >
                    +55 (11) 99999-9999
                  </a>
                </div>

                <div>
                  <h3 className="text-label mb-3">Endereço</h3>
                  <p className="text-brand-text-muted text-sm leading-relaxed">
                    São Paulo, SP — Brasil
                  </p>
                </div>

                <div>
                  <h3 className="text-label mb-3">Redes</h3>
                  <div className="flex gap-6">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-brand-text-muted hover:text-brand-text transition-colors duration-300"
                    >
                      Instagram
                    </a>
                    <a
                      href="https://pinterest.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-brand-text-muted hover:text-brand-text transition-colors duration-300"
                    >
                      Pinterest
                    </a>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>

          <div className="lg:col-span-7">
            <AnimateOnScroll variant="fadeRight" delay={0.15}>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full min-h-[400px] text-center"
                >
                  <h3 className="font-serif text-display-sm text-brand-text mb-4">
                    Mensagem enviada
                  </h3>
                  <p className="text-brand-text-muted leading-relaxed max-w-md">
                    Obrigada pelo contato. Retornaremos em breve com toda a atenção
                    que o seu projeto merece.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div>
                    <label
                      htmlFor="name"
                      className="text-label mb-3 block"
                    >
                      Nome
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full bg-transparent border-b border-brand-border px-0 py-3 text-brand-text placeholder:text-brand-text-muted/50 focus:border-brand-accent focus:outline-none transition-colors duration-300"
                      placeholder="Seu nome completo"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="text-label mb-3 block"
                    >
                      E-mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full bg-transparent border-b border-brand-border px-0 py-3 text-brand-text placeholder:text-brand-text-muted/50 focus:border-brand-accent focus:outline-none transition-colors duration-300"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="whatsapp"
                      className="text-label mb-3 block"
                    >
                      WhatsApp
                    </label>
                    <input
                      type="tel"
                      id="whatsapp"
                      name="whatsapp"
                      className="w-full bg-transparent border-b border-brand-border px-0 py-3 text-brand-text placeholder:text-brand-text-muted/50 focus:border-brand-accent focus:outline-none transition-colors duration-300"
                      placeholder="(11) 99999-9999"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="text-label mb-3 block"
                    >
                      Mensagem
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="w-full bg-transparent border-b border-brand-border px-0 py-3 text-brand-text placeholder:text-brand-text-muted/50 focus:border-brand-accent focus:outline-none transition-colors duration-300 resize-none"
                      placeholder="Conte-nos sobre o seu projeto, suas necessidades e expectativas..."
                    />
                  </div>

                  <div className="pt-4">
                    <button type="submit" className="btn-primary">
                      Enviar mensagem
                    </button>
                  </div>
                </form>
              )}
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </>
  )
}
