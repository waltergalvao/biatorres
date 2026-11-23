import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ImageIcon } from 'lucide-react'
import type { WorkImage, WorkItem } from '@/data/work'
import { services, serviceHref } from '@/data/services'
import { unsplash } from '@/lib/site'
import { SectionHeader } from './SectionHeader'

const src = (s: string) => (s.startsWith('/') ? s : unsplash(s))

/** One frame: the photo when there is one, otherwise a labelled placeholder box. */
function Frame({ image, className, sizes }: { image: WorkImage; className: string; sizes: string }) {
  return (
    <div className={`photo-zoom relative overflow-hidden rounded-[22px] bg-sand-deep ${className}`}>
      {image.src ? (
        <Image src={src(image.src)} alt={image.alt} fill sizes={sizes} className="object-cover" />
      ) : (
        <div
          role="img"
          aria-label={`Espaço reservado: ${image.alt}`}
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-ink/20 text-ink-soft"
        >
          <ImageIcon size={28} aria-hidden strokeWidth={1.5} />
          <span className="text-[13px] font-semibold">{image.alt}</span>
        </div>
      )}
      <span className="absolute left-3 top-3 rounded-full bg-linen/90 px-3 py-1 text-[12px] font-semibold text-ink backdrop-blur-sm">
        {image.kind}
      </span>
    </div>
  )
}

/**
 * Real projects, one per row: a large image and up to three smaller ones next to the story
 * (problem, solution, quote). Rows alternate sides.
 */
export function Work({ items }: { items: WorkItem[] }) {
  if (items.length === 0) return null

  return (
    <section aria-labelledby="trabalhos-title" className="section-y bg-sand">
      <div className="container-site">
        <SectionHeader
          id="trabalhos-title"
          eyebrow="Trabalhos"
          title="Alguns projetos"
          lede="Cada imagem diz o que mostra: projeto entregue, imagem 3D, moodboard ou planta."
        />

        <ol className="mt-14 space-y-20 lg:mt-20 lg:space-y-28">
          {items.map((w, n) => {
            const [main, ...rest] = w.images
            const flip = n % 2 === 1
            const service = services[w.service]
            return (
              <li key={`${w.title}-${n}`} className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-14">
                <div className={`grid gap-3 sm:gap-4 lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}>
                  {main && <Frame image={main} className="aspect-[4/3]" sizes="(max-width: 1024px) 100vw, 58vw" />}
                  {rest.length > 0 && (
                    <div className={`grid gap-3 sm:gap-4 ${rest.length >= 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                      {rest.slice(0, 3).map((img, k) => (
                        <Frame key={k} image={img} className="aspect-[4/3]" sizes="(max-width: 1024px) 50vw, 28vw" />
                      ))}
                    </div>
                  )}
                </div>

                <div className={`lg:col-span-5 ${flip ? 'lg:order-1' : ''}`}>
                  <span aria-hidden className="font-display text-[56px] font-light italic leading-none text-clay">
                    {String(n + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-4 font-display text-display-sm text-ink">{w.title}</h3>
                  <p className="mt-2 text-[14px] font-semibold uppercase tracking-[0.12em] text-olive">{w.facts}</p>

                  <dl className="mt-7 space-y-5 border-t border-ink/15 pt-6">
                    <div>
                      <dt className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-soft">O desafio</dt>
                      <dd className="mt-1.5 text-[17px] leading-relaxed text-ink">{w.problem}</dd>
                    </div>
                    <div>
                      <dt className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-soft">O projeto</dt>
                      <dd className="mt-1.5 text-[17px] leading-relaxed text-ink">{w.solution}</dd>
                    </div>
                  </dl>

                  {w.quote && (
                    <figure className="mt-7 rounded-[20px] bg-paper p-6">
                      <blockquote className="font-display text-[19px] leading-snug text-ink">“{w.quote.text}”</blockquote>
                      <figcaption className="mt-3 text-[14px] text-ink-soft">{w.quote.name}</figcaption>
                    </figure>
                  )}

                  <Link href={serviceHref(w.service)} className="link-draw mt-7 text-[15px]">
                    Serviço: {service.name} <ArrowRight size={15} aria-hidden />
                  </Link>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
