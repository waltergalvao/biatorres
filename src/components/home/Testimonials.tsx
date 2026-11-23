import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { unsplash } from '@/lib/site'

// TODO(owner): PLACEHOLDER testimonials — replace with real client quotes (and permission to
// publish name + neighbourhood) before going live. Do not ship these as real reviews.
const testimonials = [
  {
    quote:
      'Comprei o studio na planta e não sabia por onde começar. A consultoria resolveu o layout e a lista de compras sem eu sair de casa.',
    name: 'Cliente de consultoria',
    detail: 'Studio de 32 m²',
  },
  {
    quote:
      'As imagens 3D tiraram minha insegurança. O marceneiro trabalhou direto pelo caderno técnico, sem ligar para tirar dúvida.',
    name: 'Cliente de projeto por ambiente',
    detail: 'Cozinha de 10 m²',
  },
  {
    quote:
      'Fiz a consultoria do quarto primeiro. Gostei tanto que contratei o projeto do apartamento inteiro.',
    name: 'Cliente de apartamento completo',
    detail: 'Apartamento de 54 m²',
  },
]

export function Testimonials() {
  return (
    <section aria-labelledby="depoimentos-title" className="section-y">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-16">
        {/* About the architect */}
        <div className="lg:col-span-4">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-sand">
            <Image
              src={unsplash('1573496359142-b8d87734a5a2')}
              alt="Retrato de Beatriz Torres, arquiteta"
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
          <p className="mt-6 font-display text-[24px] leading-tight text-ink">Beatriz Torres</p>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
            Arquiteta formada pela FAU-USP, com especialização em design de interiores e mais de
            dez anos em projetos residenciais. É ela quem conduz cada projeto, do briefing à entrega.
          </p>
          <Link href="/sobre" className="link-draw mt-4 text-[15px]">
            Ler sobre a Beatriz <ArrowRight size={15} aria-hidden />
          </Link>
        </div>

        {/* Testimonials */}
        <div className="lg:col-span-8">
          <p className="eyebrow">Depoimentos</p>
          <h2 id="depoimentos-title" className="mt-4 font-display text-display text-ink">
            O que dizem os clientes
          </h2>

          <figure className="mt-12 border-t border-line pt-10">
            <blockquote className="font-display text-[clamp(1.6rem,2.6vw,2.4rem)] font-light leading-[1.2] text-ink">
              <span aria-hidden className="text-clay">“</span>
              {testimonials[0].quote}
              <span aria-hidden className="text-clay">”</span>
            </blockquote>
            <figcaption className="mt-6 text-[15px] text-ink-soft">
              <span className="font-semibold text-ink">{testimonials[0].name}</span> ·{' '}
              {testimonials[0].detail}
            </figcaption>
          </figure>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {testimonials.slice(1).map((t) => (
              <figure key={t.quote} className="rounded-[24px] border border-line bg-paper p-7">
                <blockquote className="text-[17px] leading-relaxed text-ink">“{t.quote}”</blockquote>
                <figcaption className="mt-5 text-[14px] text-ink-soft">
                  <span className="font-semibold text-ink">{t.name}</span> · {t.detail}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
